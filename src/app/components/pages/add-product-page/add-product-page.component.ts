import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarConfig,
  MatSnackBarLabel,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { IceCreamService } from '../../../services/ice-cream.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product-page',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.scss'
})
export class AddProductPageComponent {
  form:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private iceCreamService:IceCreamService,
    private snackBar: MatSnackBar,
    private location: Location) {
      this.form = this.formBuilder.group({
        name: [null, Validators.required],
        description:[null, Validators.required],
        price: [null, Validators.required]
      });
  }

  onConfirm() {
    if(this.form.valid) {
      this.iceCreamService.add(this.form.value)
      .subscribe({
        next: (p) => {
          this.showMessage('Sorvete cadastrado com sucesso!', 'Ok', {duration: 1000});
          this.location.back();
        },
        error: (e) => this.showMessage(e, '', {duration: 1000})
      });
    } else {
      this.showMessage('Campos obrigatórios não preenchidos!', '', {duration: 1000});
    }
  }
  
  onCancel() {
    this.location.back();
  }

  showMessage(message: string, action: string): MatSnackBarRef<TextOnlySnackBar>;
  showMessage(message: string, action: string, config: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar>;
  showMessage(message: string, action: string, config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    if (config) 
      return this.snackBar.open(message, action, config);
    return this.snackBar.open(message, action);
  }
}
