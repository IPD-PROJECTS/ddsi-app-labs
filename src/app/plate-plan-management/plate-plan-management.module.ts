import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatePlanManagementRoutingModule } from './plate-plan-management-routing.module';
import { ListPlatePlanComponent } from './pages/list-plate/list-plate-plan.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ListPlatePlanComponent],
  imports: [CommonModule, PlatePlanManagementRoutingModule, TableModule, ButtonModule, InputTextModule],
})
export class PlatePlanManagementModule {}
