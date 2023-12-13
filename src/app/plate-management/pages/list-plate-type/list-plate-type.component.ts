import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PlateTypeService } from '@ddsi-labs-apps/services';
import { ApplicationRoutingService } from '@ddsi-labs-apps/services';
import { PlateTypeModel } from '@ddsi-labs-apps/models';
import { PLATE_TYPE_ATTRIBUTE, PLATE_TYPE_ATTRIBUTE_LABEL } from '@ddsi-labs-apps/enums';


interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'ddsi-labs-apps-list-plate-type',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './list-plate-type.component.html',
  styleUrls: ['./list-plate-type.component.scss'],
})
export class ListPlateTypeComponent implements OnInit {
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
