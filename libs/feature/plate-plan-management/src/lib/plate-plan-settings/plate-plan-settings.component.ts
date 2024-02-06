import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import {
  CONTROLS,
  FORMAT,
  NotificationSeverity,
  Plate_Settings_Step,
} from '@ddsi-labs-apps/enums';
import { PlateModel, PlateRequestModel, PlateTypeModel, PlateTypeTestModel, plateDetailsSignal } from '@ddsi-labs-apps/models';
import { ActivatedRoute } from '@angular/router';
import { PlatePlanPreviewBlockComponent } from '@ddsi-labs-apps/common-util';
import {
  NotificationService,
  PlatePlanService,
  ApplicationRoutingService,
  PlateTypeService,
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
import { DropdownModule } from 'primeng/dropdown';
import { PlateTypeByIdPipe } from '@ddsi-labs-apps/pipes';

enum PLATE_FILLING_COLOR {
  defaultColor = 'yellow',
  fillMaleColor = 'blue',
  fillFemaleColor = 'pink',
  fillPOSColor = 'green',
  fillWHITEColor = 'gray',
  fillNEGColor = 'red',
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
    FormsModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    ChartModule,
    DropdownModule,
    PlateTypeByIdPipe
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
  isSubmittingPlatePlan = false;
  hasPlateDetailsChanged = false;
  displayedGraphic = false;
  displayingGraphic = false;
  basicData?: ChartData;
  basicOptions?: ChartOptions;
  themeConfig?: any;
  inputDataChart: any[] = [];
  documentStyle = getComputedStyle(document.documentElement);
  data: any;

  options: any;
  listPlateTests: PlateTypeTestModel[] = [];
  typePlateList: PlateTypeModel[] = [];
  selectedPlateType?: PlateTypeModel;
  closePlateUpdate = false;
  @ViewChild('plateDiagram') plateDiagramDiv!: ElementRef<HTMLDivElement>;
  errorMsgValidatingPlate?: string;
  errorInitPlate?:  Record<string, string[]>;
  errorProcessingPlate?: string;
  constructor(
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private plateService: PlatePlanService,
    private route: ActivatedRoute,
    private appRouting: ApplicationRoutingService,
    private plateType: PlateTypeService
  ) {
    this.route.data.subscribe(({ plateDetails }) => {
      this.initializePlateData(plateDetails);
      if (this.plaqueInfos) {
        this.goToStep(Plate_Settings_Step.FILL_PLATE);
        if (
          this.plaqueInfos.patients?.length &&
          this.plaqueInfos.controls?.length
        ) {
          this.goToStep(Plate_Settings_Step.IMPORT_RESULT);
          if (this.plaqueInfos.excel_spectro_file) {
            this.getRobotAnalysisResultByType(FORMAT.JSON);
          }
        }
        plateDetailsSignal.set(this.plaqueInfos);
      }
    });
    this.fetchPlateSettingsData();
    this.initializeForm();

    effect(() => {
      if (plateDetailsSignal()) {
        this.plaqueInfos = { ...plateDetailsSignal() };
        this.hasPlateDetailsChanged = this.checkIfPlateHasChanged();
      }
    });
  }



  getControlColor(controlName: CONTROLS) {
    switch (controlName) {
      case CONTROLS.WHITE:
        return PLATE_FILLING_COLOR.fillWHITEColor;
      case CONTROLS.POS:
        return PLATE_FILLING_COLOR.fillPOSColor;
      case CONTROLS.NEG:
        return PLATE_FILLING_COLOR.fillNEGColor;
      default:
        return 'blue';
    }
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
      id: [this.plaqueInfos?.id || undefined],
      description: [this.plaqueInfos?.description, [Validators.required]],
      test: [this.plaqueInfos?.test, [Validators.required]],
      plate_type: [{ value: this.plaqueInfos?.plate_type, disabled: this.plaqueInfos?.plate_type}, [Validators.required]]
    });
  }

  fetchPlateSettingsData() {
    this.getPlateType();
    this.getListPlatesTest();
  }


  getPlateType() {
    this.plateType.getListPlateType().subscribe({
      next:(data: PlateTypeModel[]) => {
        this.typePlateList = data;
      }
    })
  }
  getListPlatesTest() {
    this.plateService.getPlatesTestList().subscribe({
      next:(res) => {
        this.listPlateTests = res;
      }
    })
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
      const value: PlateModel = this.plateFormGroup.getRawValue();
      this.errorInitPlate = undefined;
      if (!value.id) {
        const payload: PlateRequestModel = {...value, test: value.test?.id}
        this.plateService.createPlate(payload).subscribe({
          next: () => {
            this.isSubmittingInitalization = false;
            console.log('value', value);
            
            this.resetPlateValue(value);
            this.notificationService.displayNotification(
              NotificationSeverity.SUCCESS,
              'Initialisation',
              'Infos de la plaque initalisés avec succés'
            );
            this.goToStep(Plate_Settings_Step.FILL_PLATE);
          },
          error: (err: any) => {
            this.isSubmittingInitalization = false;
            this.notificationService.displayNotification(
              NotificationSeverity.ERROR,
              'Erreur',
              'Une erreur est survenue'
            );
            this.errorInitPlate = err?.error;
          },
        });
      } else {
        console.log('this.plateFormGroup.value', this.plateFormGroup);
        
        const payload: PlateRequestModel = {...value, test: value.test?.id}
        this.plateService.updatePlate(payload).subscribe({
          next: (resp: PlateModel) => {
            this.currentStepIndex = 1;
            this.isSubmittingInitalization = false;
            console.log('value', value);
            
            this.resetPlateValue(value);
            this.notificationService.displayNotification(
              NotificationSeverity.SUCCESS,
              'Mise à jour',
              'Infos de la  plaque mises à jour avec succés'
            );
          },
          error: (err: any) => {
            this.isSubmittingInitalization = false;
            this.notificationService.displayNotification(
              NotificationSeverity.ERROR,
              'Erreur',
              'Une erreur est survenue'
            );
            this.errorInitPlate = err?.error;
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
      const isPlatePlanValid = this.plateService.checkPlatePlanValidity(this.plaqueInfos);      
      if(isPlatePlanValid) {
        this.errorMsgValidatingPlate = undefined;
        this.isSubmittingPlatePlan = true;
        this.plateService
          .fillPlateWithItems(this.plaqueInfos?.id, this.plaqueInfos)
          .subscribe({
            next: () => {
              this.isSubmittingPlatePlan = false;
              this.notificationService.displayNotification(
                NotificationSeverity.SUCCESS,
                'Success',
                'Plan de plaque mis à jour avec succés'
              );
              if (this.plaqueInfos) this.resetPlateValue(this.plaqueInfos);
              this.goToStep(Plate_Settings_Step.IMPORT_RESULT);
            },
            error: () => {
              this.isSubmittingPlatePlan = false;
              this.notificationService.displayNotification(
                NotificationSeverity.ERROR,
                'Erreur',
                'Une erreur est survenue, veuillez réessayer'
              );
            },
          });

      } else {
        this.errorMsgValidatingPlate = 'Le plan de plaque soumis ne respecte pas les régles de validation du type de test choisi: ' + this.plaqueInfos.test?.name + '. Veullez corriger afin de pouvoir sauvegarder le plan de plaque';
        this.notificationService.displayNotification(NotificationSeverity.ERROR, 'Validation du plan de plaque', 'Echec validation du plan de plaque')
      }
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
      header: `Import d'un plan de plaque`,
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
            `Plan de plaque`,
            'Plan de plaque mis à jour avec succés'
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
      header: `Import du fichier résultat de l'analyses`,
      autoZIndex: true,
      width: '445px',
    });

    ref.onClose.subscribe({
      next: (res: { success: boolean; data: PlateModel }) => {
        if (res?.success) {
          this.resetPlateValue(res.data);
          this.notificationService.displayNotification(
            NotificationSeverity.INFO,
            "Import du fichier résultat d'analyse",
            'Upload effectué avec succés '
          );
          this.getRobotAnalysisResultByType(FORMAT.JSON);
        }
      },
    });
  }

  getRobotAnalysisResultByType(type: FORMAT) {
    if (this.plaqueInfos?.id) {
      this.errorProcessingPlate = undefined;
      switch (type) {
        case FORMAT.ZIP:
        case FORMAT.PNG:
        case FORMAT.EXCEL:
          this.displayingGraphic = true;
          this.plateService
            .getRobotProcessResult(this.plaqueInfos?.id, type)
            .subscribe({
              next: () => {
                this.displayingGraphic = false;
                this.notificationService.displayNotification(
                  NotificationSeverity.SUCCESS,
                  'Téléchargement',
                  'Terminé'
                );
              },
              error: (err) => {
                this.displayingGraphic = false;
                this.notificationService.displayNotification(
                  NotificationSeverity.ERROR,
                  'Error',
                  "Une erreur s'est produite, veuillez réessayer"
                );
                this.errorProcessingPlate = err?.error;
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
                this.closePlateUpdate = true;
                this.inputDataChart = [
                  ...(this.plaqueInfos?.controls ?? []),
                  ...(this.plaqueInfos?.patients ?? []),
                ];
                this.buildChartData();
                setTimeout(() => {
                  this.plateDiagramDiv?.nativeElement.scrollIntoView({
                    behavior: 'smooth',
                  });
                });
              },
              error: (err) => {
                this.displayingGraphic = false;
                this.notificationService.displayNotification(
                  NotificationSeverity.ERROR,
                  'Erreur',
                  "Une erreur s'est produite, veuillez réessayer"
                );
                this.errorProcessingPlate = err?.error?.detail;
              },
            });
          break;

        default:
          break;
      }
    }
  }

  buildChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.getChartLabels(),
      datasets: [
        {
          label: 'Resultats analyses',
          type: 'bubble',
          data: this.getChartLabelsValue(),
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
          radius: function (context: any) {
            const size = Math.round(context?.raw.radius * 15);
            return size;
          },
        },
        ...this.getChartThresholds(),
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              if (ctx.datasetIndex === 0) {
                return `Test result ${ctx.raw['radius']}`;
              }
              return '';
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  getChartThresholds() {
    const result = this.inputDataChart
      .filter((elt) => elt['control_name'])
      .map((elt) => {
        return {
          label: `${elt['control_name']} Threshold`,
          type: 'line',
          data: Array(this.inputDataChart.length).fill(elt['test_result']),
          fill: false,
          borderColor: this.documentStyle.getPropertyValue(`--${this.getControlColor(elt['control_name'])}-500`),
          tension: 0.4,
          elements: {
            point: {
              radius: 0,
            },
          }
        };
      });
    return result;
  }
}
