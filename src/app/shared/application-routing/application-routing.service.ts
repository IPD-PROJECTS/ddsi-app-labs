import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRoutingService {

  constructor(private router: Router) { }

  goToListPlateTypePage() {
    this.router.navigate(['/apps/plates/list-plate-type']);
  }

  goToListPatientPage() {
    this.router.navigate(['/apps/plates/patients/list']);
  }

  goToAddPlateTypePage() {
    this.router.navigate(['/apps/plates/create-plate-type']);
  }

  goToAddPatientPage() {
    this.router.navigate(['/apps/plates/patients/list'], { state: { type: 'ADD'}});
  }
}
