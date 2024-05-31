import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipModule } from 'primeng/chip';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import {
  AddTestToSampleComponent,
  AnalysisType,
} from '../addTestToSample/addTestToSample.component';
import { SetSampleRegistrationComponent } from '../setSampleRegistration/setSampleRegistration.component';
import { DividerModule } from 'primeng/divider';
import { EditSampleAnalysisComponent } from '../editSampleAnalysis/editSampleAnalysis.component';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '@ddsi-labs-apps/services';
import { NotificationSeverity } from '@ddsi-labs-apps/enums';
@Component({
  selector: 'ddsi-labs-apps-sample-details-content',
  providers: [DialogService, ConfirmationService, NotificationService],
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ConfirmPopupModule,
    DynamicDialogModule,
    ChipModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    BadgeModule,
    CalendarModule,
    FormsModule,
  ],
  templateUrl: './sample-details-content.component.html',
  styleUrl: './sample-details-content.component.scss',
})
export class SampleDetailsContentComponent {
  date: Date | undefined = new Date();
  motifsPrelevements = [
    'Epidémie',
    'Projet',
    'Dépistage',
    'Inconnu',
    'Contact avec un cas',
  ];
  typesPrelevements = ['Sang', 'Sérum', 'Selle', 'Ecouvillon Nasal'];
  selectedMotif: string | undefined;
  selectedType: string | undefined;
  listAnalyses: AnalysisType[] = [];
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
  private dialogService = inject(DialogService);
  private confirmService = inject(ConfirmationService);
  private notificationService = inject(NotificationService);
  addSampleAnalysisList() {
    const ref = this.dialogService.open(AddTestToSampleComponent, {
      width: '50%',
      breakpoints: { '500px': '75%' },
      data: {
        listAnalyses: this.listAnalyses,
      },
      draggable: true,
      header: "Ajout d'analyse sur l'echantillon",
    });
    ref.onClose.subscribe((elt: { result: any }) => {
      if (elt?.result) {
        this.listAnalyses.push(...elt.result);
        console.log('list', this.listAnalyses);
      }
    });
  }

  accept() {
    this.confirmPopup.accept();
  }
  reject() {
    this.confirmPopup.reject();
  }

  editSampleAnalysis(data: AnalysisType, index: number) {
    const ref = this.dialogService.open(EditSampleAnalysisComponent, {
      draggable: true,
      header: "Mise à jour de l'analyse",
      data: {
        sampleAnalysis: data,
        index,
      },
    });

    ref.onClose.subscribe((resp: { result: AnalysisType }) => {
      if (resp?.result) {
        this.listAnalyses[index] = { ...resp.result };
      }
    });
  }

  setSampleRegistrationInfos() {
    this.dialogService.open(SetSampleRegistrationComponent, {
      width: '40%',
      resizable: true,
      draggable: true,
      header: "Enregistrement de la reception de l'echantillon",
    });
  }

  confirm(event: any, sampleAnalysis: AnalysisType, index: number) {
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez vous vraiment supprimer cet analyse',
      accept: () => {
        this.deleteSampleAnalysis(index);
        this.notificationService.displayNotification(NotificationSeverity.SUCCESS, 'Suppression', 'Suppression bien effectuée')
      }
    });
  }

  deleteSampleAnalysis(index: number) {
    this.listAnalyses.splice(index, 1);
  }
}
