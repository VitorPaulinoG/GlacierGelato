import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-product-page',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.scss'
})
export class AddProductPageComponent {
  form:FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description:[null, Validators.required],
      price: [null, Validators.required]
      })
  }
  onConfirm() {
       // this.iceCreamService.add(new IceCream(11, 'Sorvete de Maracujá', '', 10.00)).subscribe({
    //   complete: () => this.iceCreams$ = this.iceCreamService.getAll()
    // });
  }
}
