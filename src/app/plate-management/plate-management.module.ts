import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlateManagementRoutingModule } from './plate-management-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, PlateManagementRoutingModule, KnobModule, FormsModule, ChartModule,DropdownModule ],
})
export class PlateManagementModule {}
