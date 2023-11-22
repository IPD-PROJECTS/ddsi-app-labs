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

  goToAddPlateTypePage() {
    this.router.navigate(['/plates/create-plate-type']);
  }
}
