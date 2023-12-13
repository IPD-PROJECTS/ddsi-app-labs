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
import { PlateTypeService } from 'src/app/shared/service/plate-type/plate-type.service';
import { ApplicationRoutingService } from 'src/app/shared/service/application-routing/application-routing.service';
import { PlateTypeModel } from '@ddsi-labs-apps/models';

enum PLATE_TYPE_ATTRIBUTE {
  name = 'label',
  number_rows = 'number_rows',
  number_cols = 'number_cols',
  created_at = 'created_at',
  updated_at = 'updated_at',
  author = 'created_by'
}

enum PLATE_TYPE_ATTRIBUTE_LABEL {
  name = 'Label',
  number_rows = 'Number of rows',
  number_cols = 'Number of cols',
  created_at = 'Created at',
  updated_at = 'Updated at',
  author = 'Last Updated by'
}
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
