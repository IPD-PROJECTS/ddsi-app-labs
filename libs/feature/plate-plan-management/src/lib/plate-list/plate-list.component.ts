import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ApplicationRoutingService, PlatePlanService } from '@ddsi-labs-apps/services';
import { NextCaracterPipe, GetLabelOfPlateItemPipe } from '@ddsi-labs-apps/pipes';
import { BadgeModule } from 'primeng/badge';
import { PlateDetailResolve } from '../plate-details.resolver';
import { PLATE_ATTRIBUTE, PLATE_LABEL } from '@ddsi-labs-apps/enums';
import { PlateModel } from '@ddsi-labs-apps/models';

@Component({
  selector: 'ddsi-labs-apps-plate-list',
  standalone: true,
  providers:[MessageService, PlateDetailResolve, DialogService, PlatePlanService, GetLabelOfPlateItemPipe, NextCaracterPipe],
  imports: [CommonModule, BadgeModule, TableModule, ButtonModule, InputTextModule, GetLabelOfPlateItemPipe, NextCaracterPipe],
  templateUrl: './plate-list.component.html',
  styleUrls: ['./plate-list.component.scss'],
})
export class PlateListComponent {
  listPlatesType: PlateModel[] = [];
  PLATE_PLAN_LABEL = PLATE_LABEL;
  PLATE_ATTRIBUTE = PLATE_ATTRIBUTE;
  itemCounts = 10;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private platePlanService: PlatePlanService, private appRouting: ApplicationRoutingService) {}



  fetchListPlatePlan(params: any) {
    const endpoint_params = {
      limit: params?.rows,
      page: (params?.first / params?.rows)
    }
    this.loading = true;
    this.platePlanService.getListPlates(endpoint_params).subscribe({
      next:(resp: {count: number, results: PlateModel[]}) => {
        this.listPlatesType = resp.results;
        this.itemCounts = resp.count;
        this.loading = false;
      },
      error:(err) => {
        this.loading = false;
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  addNewPlatePlan(id?: number) {
    this.appRouting.goToAddPlatePlanPage(id);
  }
}
