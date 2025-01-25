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
import { ActivatedRoute } from '@angular/router';
import { IceCream } from '../../../models/IceCream';

@Component({
  selector: 'app-edit-product-page',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './edit-product-page.component.html',
  styleUrl: './edit-product-page.component.scss'
})
export class EditProductPageComponent {
  form:FormGroup;
  iceCream: IceCream | undefined;
  
  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private iceCreamService:IceCreamService,
    private snackBar: MatSnackBar,
    private location: Location) {
      this.form = this.formBuilder.group({
        name: [null],
        description:[null],
        price: [null]
      });
      let id = this.route.snapshot.paramMap.get('id');
      if(id) {
        iceCreamService.getById(id).subscribe(p =>  {
          this.form = this.formBuilder.group({
            name: [p?.name, Validators.required],
            description: [p?.description, Validators.required],
            price: [p?.price, Validators.required]
          });
          this.iceCream = p;
        });
      } else {
        this.showMessage('Error ao carregar item!', '', {duration: 1000});
        location.back();
      }
  }

  onConfirm() {
    if(this.form.valid && this.iceCream) {
      this.iceCreamService.update(this.iceCream?.id, this.form.value)
      .subscribe({
        next: (p) => {
          this.showMessage('Sorvete alterado com sucesso!', 'Ok', {duration: 1000});
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
