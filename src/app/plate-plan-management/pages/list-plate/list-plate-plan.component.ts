import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PlateModel } from 'src/app/models/plate.model';
import { ApplicationRoutingService } from 'src/app/shared/application-routing/application-routing.service';
import { PlatePlanService } from 'src/app/shared/service/plate-plan/plate-plan.service';


enum PLATE_ATTRIBUTE {
  id = 'id',
  description = 'description',
  created_at = 'created_at',
  updated_at = 'updated_at',
  created_by = 'created_by',
}

enum PLATE_LABEL {
  id = 'Id',
  description = 'Description',
  created_at = 'Created at',
  updated_at = 'Updated at',
  created_by = 'Created by',
}


@Component({
  selector: 'ddsi-labs-apps-list-plate-plan',
  templateUrl: './list-plate-plan.component.html',
  styleUrls: ['./list-plate-plan.component.scss'],
})
export class ListPlatePlanComponent {
  listPlatesType: PlateModel[] = [];
  PLATE_PLAN_LABEL = PLATE_LABEL;
  PLATE_ATTRIBUTE = PLATE_ATTRIBUTE;
  activityValues: number[] = [0, 100];
  itemCounts = 0;

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

  addNewPlatePlan() {
    this.appRouting.goToAddPlatePlanPage();
  }
}
