import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { LayoutService } from '@ddsi-labs-apps/services';

@Component({
  selector: 'ddsi-labs-apps-dashboard',
  standalone: true,
  imports: [CommonModule, KnobModule, FormsModule, ChartModule,DropdownModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  knobValue: number = 90;

    selectedWeek: any;

    weeks: any[] = [];

    barData: any;

    barOptions: any;

    pieData: any;

    pieOptions: any;


    subscription: Subscription;

    cols: any[] = [];

    constructor(private layoutService: LayoutService) {
      this.weeks = [{
        label: 'Last Week',
        value: 0,
        data: [[4, 8, 1, 6, 10, 11, 6], [28, 48, 40, 19, 86, 27, 90]]
    },
    {
        label: 'This Week',
        value: 1,
        data: [[0, 3, 11, 21, 10, 9, 3], [48, 78, 10, 29, 76, 77, 10]]
    }];

    this.selectedWeek = this.weeks[0];
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts();
        });
    }

    ngOnInit(): void {

        this.initCharts();
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
                    label: 'Plate Analysed',
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
        let newBarData = {...this.barData};
        newBarData.datasets[0].data = this.selectedWeek.data[0];
        this.barData = newBarData;
    }


    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

