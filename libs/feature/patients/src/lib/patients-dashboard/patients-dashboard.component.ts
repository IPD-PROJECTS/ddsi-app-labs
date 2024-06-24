import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStatesModel } from '@ddsi-labs-apps/models';
import { LayoutService, PlateStatsService } from '@ddsi-labs-apps/services';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'ddsi-labs-apps-patients-dashboard',
  standalone: true,
  imports: [CommonModule, KnobModule, FormsModule, ChartModule,DropdownModule, ProgressSpinnerModule],
  templateUrl: './patients-dashboard.component.html',
  styleUrl: './patients-dashboard.component.scss',
})
export class PatientsDashboardComponent implements OnInit, OnDestroy {
  knobValue = 0;
  selectedWeek: any;

  weeks: any[] = [];

  barData: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;


  subscription: Subscription;

  cols: any[] = [];

  dashboardStats?: DashboardStatesModel;
  loadingStats = false;
  constructor(private layoutService: LayoutService, private appStats: PlateStatsService) {
    this.weeks = [{
      label: 'Semaine Passée',
      value: 0,
      data: [[4, 8, 1, 6, 10, 11, 0], [28, 48, 40, 19, 86, 27, 90]]
  },
  {
      label: 'Cette Semaine',
      value: 1,
      data: [[0, 3, 11, 21, 10, 9, 0], [48, 78, 10, 29, 76, 77, 10]]
  }];

  this.selectedWeek = this.weeks[0];
      this.subscription = this.layoutService.configUpdate$.subscribe(config => {
          this.initCharts();
      });
  }

  ngOnInit(): void {
      this.fetchPlatesMainStats();
      this.initCharts();
  }

  fetchPlatesMainStats() {
      this.loadingStats = true;
      this.appStats.getPlatesDashboardStats().subscribe({
          next:(res: DashboardStatesModel) => {
              this.loadingStats = false;
              this.dashboardStats = res;
              this.knobValue = Math.ceil(((this.dashboardStats.results.plates_count - this.dashboardStats.results.plates_without_result_file) / this.dashboardStats.results.plates_count) * 100)
          },
          error: () => {
              this.loadingStats = false;
          }
      })
  }

  initCharts() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.barData = {
          labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
          datasets: [
              {
                  label: 'Plaques Crées',
                  backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                  barThickness: 12,
                  borderRadius: 12,
                  data: this.selectedWeek.data[0]
              },
          ]
      };

      this.barOptions = {
          animation: {
              duration: 0
          },
          plugins: {
              legend: {
                  labels: {
                      color: textColor,
                      usePointStyle: true,
                      font: {
                          weight: 700,
                      },
                      padding: 28
                  },
                  position: 'bottom'
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                          weight: 500
                      }
                  },
                  grid: {
                      display: false,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };


  }

  onWeekChange() {
      const newBarData = {...this.barData};
      newBarData.datasets[0].data = this.selectedWeek.data[0];
      this.barData = newBarData;
  }


  ngOnDestroy(): void {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}
