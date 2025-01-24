import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { IceCream } from '../../../models/IceCream';
import { IceCreamService } from '../../../services/ice-cream.service';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'product-list-page',
  imports: [
    MatIconModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, 
    MatTableModule, CurrencyPipe, RouterLink
  ],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss'
})
export class ProductListPageComponent {
  value: string = '';
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];
  iceCreams$: Observable<IceCream[]>;
  iceCreams: IceCream[] = [];

  constructor(private iceCreamService: IceCreamService) {
    this.iceCreams$ = iceCreamService.getAll();
    this.iceCreams$.subscribe(x => this.iceCreams = x);
  }

  // refresh() {
  //   this.iceCreams$ = this.iceCreamService.getAll();
  //   this.iceCreams$.subscribe(x => this.iceCreams = x);
  // }

  onEdit(iceCream: IceCream) {
    
  }

  onRemove(iceCream: IceCream) {
    // this.iceCreamService.delete(iceCream.id);
    // this.refresh();
  }
}
