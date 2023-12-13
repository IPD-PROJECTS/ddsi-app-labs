import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PlateModel } from '@ddsi-labs-apps/models';
import { PLATE_ATTRIBUTE, PLATE_LABEL } from '@ddsi-labs-apps/enums';
import { ApplicationRoutingService } from 'src/app/shared/service/application-routing/application-routing.service';
import { PlatePlanService } from 'src/app/shared/service/plate-plan/plate-plan.service';





@Component({
  selector: 'ddsi-labs-apps-list-plate-plan',
  templateUrl: './list-plate-plan.component.html',
  styleUrls: ['./list-plate-plan.component.scss'],
  providers:[]
})
export class ListPlatePlanComponent {
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
