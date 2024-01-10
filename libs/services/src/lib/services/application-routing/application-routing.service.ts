import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRoutingService {

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToPlatesApp() {
    this.router.navigate(['/apps/plates']);
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

  goToAddPlateTypePage() {
    this.router.navigate(['/apps/plates/create-plate-type']);
  }

  goToAddPatientPage() {
    this.router.navigate(['/apps/plates/patients/list'], { state: { type: 'ADD'}});
  }

  goToAddPlatePlanPage(id?: number) {
    const path = id ? ['/apps/plates/plate-plan/edit', id] : ['/apps/plates/plate-plan/create']
    this.router.navigate(path);
  }
}
