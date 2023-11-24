import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApplicationRoutingService {

  constructor(private router: Router) { }

  goToListPlateTypePage() {
    this.router.navigate(['/plates/list-plate-type']);
  }

  goToListPatientPage() {
    this.router.navigate(['/plates/patients/list']);
  }

  goToAddPlateTypePage() {
    this.router.navigate(['/plates/create-plate-type']);
  }

  goToAddPatientPage() {
    this.router.navigate(['/plates/patients/list'], { state: { type: 'ADD'}});
  }
}
