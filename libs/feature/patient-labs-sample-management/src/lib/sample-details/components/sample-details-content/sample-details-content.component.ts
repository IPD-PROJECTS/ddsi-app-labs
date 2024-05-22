import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipModule } from 'primeng/chip';
@Component({
  selector: 'ddsi-labs-apps-sample-details-content',
  standalone: true,
  imports: [CommonModule,ChipModule, InputTextareaModule, DropdownModule, ButtonModule, InputTextModule, BadgeModule, CalendarModule, FormsModule],
  templateUrl: './sample-details-content.component.html',
  styleUrl: './sample-details-content.component.scss',
})
export class SampleDetailsContentComponent {
  date: Date | undefined = new Date();
  motifsPrelevements = ['Epidémie', 'Projet', 'Dépistage', 'Inconnu', 'Contact avec un cas'];
  typesPrelevements = ['Sang', 'Sérum', 'Selle', 'Ecouvillon Nasal'];
  selectedMotif: string | undefined;
  selectedType: string | undefined;
}
