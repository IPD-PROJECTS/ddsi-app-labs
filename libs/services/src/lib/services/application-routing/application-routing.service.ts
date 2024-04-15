import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRoutingService {

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/']);
  }

  goToPlatesApp() {
    this.router.navigate(['/apps']);
  }

  goToListPlateTypePage() {
    this.router.navigate(['/apps/plates/list-plate-type']);
  }

  goToListPatientPage() {
    this.router.navigate(['/apps/plates/patients/list']);
  }

  goToListPlatePlanPage() {
    this.router.navigate(['/apps/plates/plate-plan/list']);
  }

  goToAddPlateTypePage(id?: string) {
    const path = id ? ['/apps/plates/edit-plate-type', id] : ['/apps/plates/create-plate-type']
    this.router.navigate(path);
  }

  goToAddPatientPage() {
    this.router.navigate(['/apps/plates/patients/list'], { state: { type: 'ADD'}});
  }

  goToAddPlatePlanPage(id?: number) {
    const path = id ? ['/apps/plates/plate-plan/edit', id] : ['/apps/plates/plate-plan/create']
    this.router.navigate(path);
  }


  // SampleLabManagement

  goToRegisterSamplePage(id?: number) {
    const path = id ? ['/apps/labs-samples/edit', id] : ['/apps/labs-samples/create']
    this.router.navigate(path);
  }


  goToSampleListPage() {
    const path = ['/apps/labs-samples/list'];
    this.router.navigate(path);
  }
}
