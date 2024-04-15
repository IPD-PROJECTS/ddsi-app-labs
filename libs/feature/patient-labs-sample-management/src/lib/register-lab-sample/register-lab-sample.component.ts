import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ApplicationRoutingService } from '@ddsi-labs-apps/services';

@Component({
  selector: 'ddsi-labs-apps-register-lab-sample',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './register-lab-sample.component.html',
  styleUrl: './register-lab-sample.component.scss',
})
export class RegisterLabSampleComponent {

  constructor(private appRouting: ApplicationRoutingService){}
  
  goBack(){
    this.appRouting.goToSampleListPage();
  }
}
