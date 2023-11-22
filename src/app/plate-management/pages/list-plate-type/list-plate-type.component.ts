import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { Customer } from 'src/app/models/model';
import { CustomerService } from '../../service/customer.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ApplicationRoutingService } from 'src/app/shared/application-routing/application-routing.service';

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
  customers1: Customer[] = [];

  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private customerService: CustomerService, private appRouting: ApplicationRoutingService) {}

  ngOnInit() {
    this.customerService.getCustomersLarge().then((customers) => {
      this.customers1 = customers;
      this.loading = false;

      this.customers1.forEach(
        (customer) => (customer.date = new Date(customer.date))
      );
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
