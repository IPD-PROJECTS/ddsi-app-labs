import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatePlanManagementRoutingModule } from './plate-plan-management-routing.module';
import { ListPlatePlanComponent } from './pages/list-plate/list-plate-plan.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { PlateDetailResolve } from './plate-details.resolver';
import { DialogService } from 'primeng/dynamicdialog';
import { PlatePlanService } from '../shared/service/plate-plan/plate-plan.service';
import { GetLabelOfPlateItemPipe } from '../shared/pipes/getLabelOfPlateItem/getLabelOfPlateItem.pipe';
import { NextCaracterPipe } from '../shared/pipes/nextCaracter/nextCaracter.pipe';
import { BadgeModule } from 'primeng/badge';
@NgModule({
  declarations: [ListPlatePlanComponent],
  providers:[MessageService, PlateDetailResolve, DialogService, PlatePlanService, GetLabelOfPlateItemPipe, NextCaracterPipe],
  imports: [CommonModule,BadgeModule, PlatePlanManagementRoutingModule, TableModule, ButtonModule, InputTextModule, GetLabelOfPlateItemPipe, NextCaracterPipe],
})
export class PlatePlanManagementModule {}
