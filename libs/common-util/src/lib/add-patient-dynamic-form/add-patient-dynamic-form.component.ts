import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

enum Genre  {
    MASCULIN = 'M', FEMININ = 'F' 
}

@Component({
  selector: 'ddsi-labs-apps-add-patient-dynamic-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, MessagesModule, InputTextModule, DropdownModule],
  templateUrl: './add-patient-dynamic-form.component.html',
  styleUrl: './add-patient-dynamic-form.component.scss',
})
export class AddPatientDynamicFormComponent {
  listGenres = [ {label: 'Masculin', value: Genre.MASCULIN}, {label: 'Feminin', value: Genre.FEMININ}]
}
