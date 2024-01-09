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
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';

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
  documentStyle = getComputedStyle(document.documentElement);

  data: any;

  options: any;

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
    this.initializeForm();

    effect(() => {
      if (plateDetailsSignal()) {
        this.plaqueInfos = { ...plateDetailsSignal() };
        this.hasPlateDetailsChanged = this.checkIfPlateHasChanged();
        this.initializeForm();
      }
    });
  }

  buildChart() {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = this.documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder =
      this.documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.getChartLabels(),
      datasets: [
        {
          label: 'Resultats analyses',
          type: 'bubble',
          data: this.getChartLabelsValue(),
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
          radius: function (context: any) {
            const size = context?.raw.radius * 10;
            return size;
          },
        },
        ...this.getChartThresholds(),
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        title: {
          display: true,
          text: "Graphe du resultat de l'analyse de la plaque",
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx: TooltipItem<any>) => {
              console.log('ctx', ctx);
              if (ctx.datasetIndex === 0) {
                return `Test result `;
              }
              return undefined;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
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

  // initChartConfig() {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   const primaryColor = documentStyle.getPropertyValue('--primary-color');
  //   const textColorSecondary = documentStyle.getPropertyValue(
  //     '--text-color-secondary'
  //   );
  //   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  //   this.basicData = {
  //     labels: this.getChartLabels(),
  //     datasets: [
  //       {
  //         label: 'Resultat par élément',
  //         data: this.getChartLabelsValue(),
  //         type: 'bubble',
  //         radius: function (context: any) {
  //           const size = context?.raw.radius * 10;
  //           return size;
  //         },
  //         borderColor: [primaryColor],
  //       },
  //     //   {
  //     //     label: 'First Dataset',
  //     //     data: [65, 59, 80, 81, 56, 55, 40],
  //     //     fill: false,
  //     //     type: 'line',
  //     //     borderColor: documentStyle.getPropertyValue('--blue-500'),
  //     //     tension: 0.4
  //     // },
  //       {
  //         type: 'line',
  //         data: [
  //           1, 1, 1, 1, 1, 1, 1
  //         ],
  //         borderWidth: 5,
  //         label: 'Controls Seuils',
  //         borderColor: 'red',
  //         tension: 0.3
  //       }
  //     ],
  //   };

  //   this.basicOptions = {
  //     maintainAspectRatio: true,
  //     plugins: {
  //       title: {
  //         display: true,
  //         text: "Graphe du resultat de l'analyse de la plaque",
  //       },
  //       tooltip: {
  //         callbacks: {
  //           label: (ctx: any) => {
  //             return `Test result ${ctx?.raw?.radius}`;
  //           },
  //         },
  //       },
  //       legend: {
  //         labels: {
  //           color: textColor,
  //         },
  //       },
  //     },
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //         ticks: {
  //           color: textColorSecondary,
  //           stepSize: 0.1,
  //         },
  //         grid: {
  //           color: surfaceBorder,
  //         },
  //       },
  //       x: {
  //         beginAtZero: true,
  //         display: true,
  //         ticks: {
  //           color: textColorSecondary,
  //           stepSize: 1,
  //           callback: (_, index) => {
  //             if (index === 0) return '';
  //             return this.inputDataChart[index - 1]['control_name']
  //               ? this.inputDataChart[index - 1]['control_name']
  //               : this.inputDataChart[index - 1]['anon_name'];
  //           },
  //         },
  //         grid: {
  //           display: true,
  //           color: surfaceBorder,
  //         },
  //       },
  //     },
  //   };
  // }

  getChartThresholds() {
    return this.inputDataChart
      .filter((elt) => elt['control_name'])
      .map((elt) => {
        return {
          label: `${elt['control_name']} Threshold`,
          type: 'line',
          data: Array(this.inputDataChart.length).fill(elt['test_result']),
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        };
      });
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
              'Initialisation',
              'Infos de la plaque initalisés avec succés'
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
              'Mise à jour',
              'Infos de la  plaque mises à jour avec succés'
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
                  'Téléchargement',
                  'Terminé'
                );
              },
              error: () => {
                this.notificationService.displayNotification(
                  NotificationSeverity.ERROR,
                  'Error',
                  "Une erreur s'est produite, veuillez réessayer"
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
                this.buildChart();
                setTimeout(() => {
                  this.plateDiagramDiv?.nativeElement.scrollIntoView({
                    behavior: 'smooth',
                  });
                });
              },
              error: () => {
                this.displayingGraphic = false;
                this.notificationService.displayNotification(
                  NotificationSeverity.ERROR,
                  'Erreur',
                  "Une erreur s'est produite, veuillez réessayer"
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
