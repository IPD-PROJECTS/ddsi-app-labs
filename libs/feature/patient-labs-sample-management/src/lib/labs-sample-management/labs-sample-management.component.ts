import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ApplicationRoutingService, SampleManagementService } from '@ddsi-labs-apps/services';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Sample } from '@ddsi-labs-apps/models';
export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: string;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
  updated_by: string;
  tests: {id: string, name: string, date: string, status: string, updated_by: string}[];
}
@Component({
  selector: 'ddsi-labs-apps-labs-sample-management',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    SelectButtonModule,
    FormsModule,
    DropdownModule
  ],
  templateUrl: './labs-sample-management.component.html',
  styleUrl: './labs-sample-management.component.scss',
})
export class LabsSampleManagementComponent implements OnInit {
  customers!: Customer[];
  @ViewChild('dt1') table!: Table;
  items: MenuItem[] = [
    {
      label: 'Accepted',
      icon: 'pi pi-check',
      value: 'accepted'
    },
    {
      label: 'Rejected',
      icon: 'pi pi-times',
      value: 'rejected'
    },
    { label: 'Pending', icon: 'pi pi-pause', value: 'pending' }
  ];
  listSamples: Sample[] = [];
  constructor(private sampleMgt: SampleManagementService, private appRouting: ApplicationRoutingService) {}

  ngOnInit() {
   this.listSamples =  this.sampleMgt.getListSample();
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  calculateCustomerTotal(name: string) {
    let total = 0;

    if (this.customers) {
      for (const customer of this.customers) {
        if (customer.representative?.name === name) {
          total++;
        }
      }
    }

    return total;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
      case 'rejected':
        return 'danger';

      case 'qualified':
      case 'accepted':
        return 'success';

      case 'new':
      case 'test_preparation':
        return 'info';

      case 'negotiation':
      case 'testing':
        return 'warning';

      default:
        return 'info';
    }
  }

  goToRegisterSamplePage() {
    this.appRouting.goToRegisterSamplePage();
  }

  seeSampleDetailsPage(id: string) {
    this.appRouting.goToSampleDetailsPage(id);
  }

  deleteSample(id: string) {
    this.sampleMgt.deleteById(id);
    this.listSamples =  this.sampleMgt.getListSample();
  }
}
