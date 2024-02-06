import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApplicationRoutingService, AuthenticationService, LayoutService } from '@ddsi-labs-apps/services';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'ddsi-labs-apps-login',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    TooltipModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({});
  INPUT_TYPE : 'text' | 'password' = 'password';
  isLoading = false;
  hasError = false;
  errorMsg?: string;
  constructor(private appRouting: ApplicationRoutingService, private layoutService: LayoutService, private authService: AuthenticationService, private fb: FormBuilder) {
    this.formGroup = fb.group({
      username:['', [Validators.required]],
      password:['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  processAuthentication() {
    this.formGroup.markAllAsTouched();
    if(this.formGroup.valid) {
      this.isLoading = true;
      const data = this.formGroup.value;
      this.authService.login(data).subscribe({
        next:() => {
          this.isLoading = false;
          this.appRouting.goToPlatesApp();
        },
        error:() => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMsg = 'Une erreur est survenue lors de votre authentication. <br /> Veuillez réessayer'
        }
      })
    }
  }

  switchVisibility(): void {
    if(this.INPUT_TYPE === 'text') {
      this.INPUT_TYPE = 'password'
    } else {
      this.INPUT_TYPE = 'text'
    }
  }
}
