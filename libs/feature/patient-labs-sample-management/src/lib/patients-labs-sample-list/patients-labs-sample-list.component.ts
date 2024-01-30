import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'ddsi-labs-apps-patients-labs-sample-list',
  standalone: true,
  imports: [CommonModule, DataViewModule, RatingModule, FormsModule, ButtonModule],
  templateUrl: './patients-labs-sample-list.component.html',
  styleUrls: ['./patients-labs-sample-list.component.scss'],
})
export class PatientsLabsSampleListComponent {
  layout: 'list' | 'grid' = 'list';

  products: any[] = [{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
}];

getSeverity(product: any) {
  switch (product.inventoryStatus) {
      case 'INSTOCK':
          return 'success';

      case 'LOWSTOCK':
          return 'warning';

      case 'OUTOFSTOCK':
          return 'danger';

      default:
          return null;
  }
}

}
