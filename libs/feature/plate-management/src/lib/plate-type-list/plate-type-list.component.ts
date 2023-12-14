import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PLATE_TYPE_ATTRIBUTE_LABEL, PLATE_TYPE_ATTRIBUTE } from '@ddsi-labs-apps/enums';
import { PlateTypeModel } from '@ddsi-labs-apps/models';
import { PlateTypeService, ApplicationRoutingService } from '@ddsi-labs-apps/services';

@Component({
  selector: 'ddsi-labs-apps-plate-type-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './plate-type-list.component.html',
  styleUrls: ['./plate-type-list.component.scss'],
})
export class PlateTypeListComponent implements OnInit {
  listPlatesType: PlateTypeModel[] = [];
  PLATE_TYPE_LABEL = PLATE_TYPE_ATTRIBUTE_LABEL;
  PLATE_TYPE_ATTRIBUTE = PLATE_TYPE_ATTRIBUTE;
  activityValues: number[] = [0, 100];


  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private plateTypeService: PlateTypeService, private appRouting: ApplicationRoutingService) {}

  ngOnInit() {
    this.loading = true;
    this.plateTypeService.getListPlateType().subscribe({
      next:(resp: any) => {
        this.listPlatesType = resp;
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

  addNewPlateType() {
    this.appRouting.goToAddPlateTypePage();
  }
}
