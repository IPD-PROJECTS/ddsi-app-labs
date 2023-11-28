import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'ddsi-labs-apps-create-plate-plan',
  standalone: true,
  imports: [CommonModule, SplitterModule, AccordionModule],
  templateUrl: './create-plate-plan.component.html',
  styleUrls: ['./create-plate-plan.component.scss'],
})
export class CreatePlatePlanComponent {}
