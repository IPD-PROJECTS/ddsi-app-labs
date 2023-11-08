import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../layout/service/app.layout.service';
import { AppConfigComponent } from '../layout/config/app.config.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'ddsi-labs-apps-login',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    RouterModule,
    AppConfigComponent,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  rememberMe: boolean = false;

  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
