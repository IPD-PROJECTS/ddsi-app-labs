import { Component, ElementRef, OnDestroy, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import {
  FORMAT,
  NotificationSeverity,
  Plate_Settings_Step,
} from '@ddsi-labs-apps/enums';
import { PlateModel, plateDetailsSignal } from '@ddsi-labs-apps/models';
import { ActivatedRoute } from '@angular/router';
import { PlatePlanPreviewBlockComponent } from '@ddsi-labs-apps/common-util';
import {
  NotificationService,
  PlatePlanService,
  ApplicationRoutingService,
} from '@ddsi-labs-apps/services';
import * as _ from 'lodash';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ImportPlatePlanComponent } from '../import-plate-plan/import-plate-plan.component';
import { ImportPlateAnalysisResultComponent } from '../import-plate-analysis-result/import-plate-analysis-result.component';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';

enum PLATE_FILLING_COLOR {
  defaultColor = 'yellow',
  fillMaleColor = 'orange',
  fillFemaleColor = 'pink'
}
@Component({
  selector: 'ddsi-labs-apps-plate-plan-settings',
  standalone: true,
  imports: [
    CommonModule,
    SplitterModule,
    TooltipModule,
    AccordionModule,
    MenuModule,
    PlatePlanPreviewBlockComponent,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    ChartModule,
  ],
  providers: [MessageService, DialogService, NotificationService],
  templateUrl: './plate-plan-settings.component.html',
  styleUrls: ['./plate-plan-settings.component.scss'],
})
export class PlatePlanSettingsComponent implements OnDestroy {
  PLATE_ITEMS_COLOR = PLATE_FILLING_COLOR;
  items: MenuItem[] | undefined = [
    {
      label: 'Graph',
      icon: PrimeIcons.FORWARD,
      items: [
        {
          label: 'Display Diagram',
          icon: PrimeIcons.CHART_BAR,
          command: () => {
            this.getRobotAnalysisResultByType(FORMAT.JSON);
          },
        },
      ],
    },
    {
      label: 'Downloads',
      icon: PrimeIcons.DOWNLOAD,
      items: [
        {
          label: 'Result in ZIP Format',
          icon: PrimeIcons.FILE,
          command: () => {
            this.getRobotAnalysisResultByType(FORMAT.ZIP);
          },
        },
        {
          label: 'Result in PNG Format',
          icon: PrimeIcons.IMAGE,
          command: () => {
            this.getRobotAnalysisResultByType(FORMAT.PNG);
          },
        },
        {
          label: 'Result in EXCEL Format',
          icon: PrimeIcons.FILE_EXCEL,
          command: () => {
            this.getRobotAnalysisResultByType(FORMAT.EXCEL);
          },
        },
      ],
    },
  ];
  plateFormGroup: FormGroup = new FormGroup({});
  isSubmittingInitalization = false;
  currentStepIndex = 0;
  plaqueInfos?: PlateModel;
  plaqueInitializedInfos?: PlateModel;
  idPlate?: number;
  isSubmittingPlatePlan = false;
  hasPlateDetailsChanged = false;
  displayedGraphic = false;
  displayingGraphic = false;
  basicData?: ChartData;
  basicOptions?: ChartOptions;
  themeConfig?: any;
  inputDataChart: any[] = [];
  @ViewChild('plateDiagram') plateDiagramDiv!: ElementRef<HTMLDivElement>;
  constructor(
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private plateService: PlatePlanService,
    private route: ActivatedRoute,
    private appRouting: ApplicationRoutingService
  ) {
    this.route.data.subscribe(({ plateDetails }) => {
      this.initializePlateData(plateDetails);
      if (this.plaqueInfos) {
        this.goToStep(Plate_Settings_Step.FILL_PLATE);
        if (this.plaqueInfos.patients?.length && this.plaqueInfos.controls?.length) {
          this.goToStep(Plate_Settings_Step.IMPORT_RESULT);
          if(this.plaqueInfos.excel_spectro_file) {
            this.getRobotAnalysisResultByType(FORMAT.JSON);
          }
        }
        plateDetailsSignal.set(this.plaqueInfos);
      }
    });
    this.initializeForm();

    effect(() => {
      if (plateDetailsSignal()) {
        this.plaqueInfos = { ...plateDetailsSignal() };
        this.hasPlateDetailsChanged = this.checkIfPlateHasChanged();
        this.initializeForm();
      }
    });
  }

  initChartConfig() {
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const primaryColor = documentStyle.getPropertyValue('--primary-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicData = {
      labels: this.getChartLabels(),
      datasets: [
        {
          label: 'Result by Item',
          data: this.getChartLabelsValue(),
          // backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          type: 'bubble',
          radius: function (context: any) {
            const size = context?.raw.radius * 10;
            return size;
          },
          // backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: [primaryColor],
          // borderWidth: 1
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Graph of plate analysis result',
        },
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              return `Test result ${ctx?.raw?.radius}`;
            },
          },
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            stepSize: 0.1,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        x: {
          beginAtZero: true,
          display: true,
          ticks: {
            color: textColorSecondary,
            stepSize: 1,
          //   callback: (value, index, ticks) => {


          //     return '$'+_+value;
          // }
            callback: (value, index, ticks) => {
              if(index === 0) return '';
              return this.inputDataChart[index-1]['control_name'] ? this.inputDataChart[index-1]['control_name'] : this.inputDataChart[index-1]['anon_name'];
          }
          },
          grid: {
            display: false,
            color: surfaceBorder,
          },
        },
      },
    };
  }

  getChartLabels() {
    return this.inputDataChart.map((elt) => {
      return elt['control_name']
        ? elt['control_name']
        : elt['anon_name']
        ? elt['anon_name']
        : 'No Label';
    });
  }

  getChartLabelsValue() {
    return this.inputDataChart.map((elt, index) => {
      return { x: index + 1, y: elt.test_result, radius: elt.test_result };
    });
  }
  ngOnDestroy(): void {
    plateDetailsSignal.set(undefined);
  }

  initializePlateData(data: any) {
    this.plaqueInfos = data;
    this.plaqueInitializedInfos = this.plaqueInfos;
  }

  initializeForm() {
    this.plateFormGroup = this.fb.group({
      id: [this.plaqueInfos?.id],
      description: [this.plaqueInfos?.description, [Validators.required]],
      // created_by: [this.plaqueInfos?.created_by,[Validators.required]]
    });
  }

  resetPlateValue(data: PlateModel) {
    this.plaqueInfos = data;
    this.plateFormGroup.reset(data);
    this.plaqueInitializedInfos = this.plaqueInfos;
    plateDetailsSignal.set(data);
    this.hasPlateDetailsChanged = this.checkIfPlateHasChanged();
  }
  initializePlate() {
    this.plateFormGroup.markAllAsTouched();
    if (this.plateFormGroup.valid) {
      this.isSubmittingInitalization = true;
      const value: PlateModel = this.plateFormGroup.value;
      if (!value.id) {
        this.plateService.createPlate(value).subscribe({
          next: (resp: PlateModel) => {
            this.isSubmittingInitalization = false;
            this.resetPlateValue(resp);
            this.notificationService.displayNotification(
              NotificationSeverity.SUCCESS,
              'Initialization',
              'Plate infos initialized successfully'
            );
            this.goToStep(Plate_Settings_Step.FILL_PLATE);
          },
          error: (err: any) => {
            this.isSubmittingInitalization = false;
          },
        });
      } else {
        this.plateService.updatePlate(value).subscribe({
          next: (resp: PlateModel) => {
            this.currentStepIndex = 1;
            this.isSubmittingInitalization = false;
            this.resetPlateValue(resp);
            this.notificationService.displayNotification(
              NotificationSeverity.SUCCESS,
              'Update',
              'Plate infos updated successfully'
            );
          },
          error: (err: any) => {
            this.isSubmittingInitalization = false;
            console.log('err', err);
          },
        });
      }
    }
  }

  goBack() {
    this.appRouting.goToListPlatePlanPage();
  }

  savePlatePlan() {
    if (this.plaqueInfos?.id) {
      this.isSubmittingPlatePlan = true;
      this.plateService
        .fillPlateWithItems(this.plaqueInfos?.id, this.plaqueInfos)
        .subscribe({
          next: () => {
            this.isSubmittingPlatePlan = false;
            this.notificationService.displayNotification(
              NotificationSeverity.SUCCESS,
              'Success',
              'Plate plan updated successfully'
            );
            if (this.plaqueInfos) this.resetPlateValue(this.plaqueInfos);
            this.goToStep(Plate_Settings_Step.IMPORT_RESULT);
          },
          error: () => {
            this.isSubmittingPlatePlan = false;
            this.notificationService.displayNotification(
              NotificationSeverity.ERROR,
              'Success',
              'Plate plan updated successfully'
            );
          },
        });
    }
  }

  goToStep(step: Plate_Settings_Step) {
    switch (step) {
      case Plate_Settings_Step.INIT:
        this.currentStepIndex = 0;
        break;
      case Plate_Settings_Step.FILL_PLATE:
        this.currentStepIndex = 1;
        break;
      case Plate_Settings_Step.IMPORT_RESULT:
        this.currentStepIndex = 2;
        break;
      default:
        break;
    }
  }

  checkIfPlateHasChanged() {
    return !_.isEqual(this.plaqueInitializedInfos, this.plaqueInfos);
  }

  opentModalImportPlatePlan() {
    const ref = this.dialogService.open(ImportPlatePlanComponent, {
      data: {
        plaqueInfos: this.plaqueInfos,
      },
      header: `Import Plate plan`,
      autoZIndex: true,
      width: '445px',
    });
    ref.onClose.subscribe({
      next: (resp: { success: boolean; data: PlateModel }) => {
        if (resp?.success) {
          this.resetPlateValue(resp.data);
          this.goToStep(Plate_Settings_Step.IMPORT_RESULT);
          this.notificationService.displayNotification(
            NotificationSeverity.SUCCESS,
            `Plate Plan`,
            'Plate plan updated successfully'
          );
        }
      },
    });
  }

  openModalImportAnalysisResult() {
    const ref = this.dialogService.open(ImportPlateAnalysisResultComponent, {
      data: {
        plaqueInfos: this.plaqueInfos,
      },
      header: `Import Analysis Result`,
      autoZIndex: true,
      width: '445px',
    });

    ref.onClose.subscribe({
      next: (res: { success: boolean; data: PlateModel }) => {
        if (res?.success) {
          this.resetPlateValue(res.data);
          this.notificationService.displayNotification(
            NotificationSeverity.INFO,
            'Result analysis file',
            "Upload successed. Please wait we're processing the results "
            );
          this.getRobotAnalysisResultByType(FORMAT.JSON);
        }
      },
    });
  }

  getRobotAnalysisResultByType(type: FORMAT) {
    if (this.plaqueInfos?.id) {
      switch (type) {
        case FORMAT.ZIP:
        case FORMAT.PNG:
        case FORMAT.EXCEL:
          this.plateService
            .getRobotProcessResult(this.plaqueInfos?.id, type)
            .subscribe({
              next: () => {
                this.notificationService.displayNotification(
                  NotificationSeverity.SUCCESS,
                  'Success',
                  'Download succeded'
                );
              },
              error: () => {
                this.notificationService.displayNotification(
                  NotificationSeverity.ERROR,
                  'Error',
                  'Cannot process your request, please try again'
                );
              },
            });
          break;
        case FORMAT.JSON:
          this.displayingGraphic = true;
          this.plateService
            .getRobotProcessResult(this.plaqueInfos?.id, type)
            .subscribe({
              next: (res: PlateModel) => {
                this.resetPlateValue(res);
                this.displayedGraphic = true;
                this.displayingGraphic = false;


                this.inputDataChart = [
                  ...(this.plaqueInfos?.controls ?? []),
                  ...(this.plaqueInfos?.patients ?? []),
                ];
                this.initChartConfig();
                setTimeout(() => {
                  this.plateDiagramDiv?.nativeElement.scrollIntoView({behavior: 'smooth'});
                });
              },
              error: () => {
                this.displayingGraphic = false;
                this.notificationService.displayNotification(
                  NotificationSeverity.ERROR,
                  'Error',
                  'Cannot process your request, please try again'
                );
              },
            });
          break;

        default:
          break;
      }
    }
  }
}
