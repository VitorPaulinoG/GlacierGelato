import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { IceCream } from '../../../models/IceCream';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
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
import { Observable, of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { AlertConfirmationComponent } from '../../alert-confirmation/alert-confirmation.component';
import { IceCreamFilter } from '../../../models/IceCreamFilter';

@Component({
  selector: 'product-list-page',
  imports: [
    MatIconModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule,
    MatTableModule, CurrencyPipe, MatPaginatorModule,  MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent
  ],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
})
export class ProductListPageComponent {

  form:FormGroup;
  
  value: string = '';
  length: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];
  iceCreams$: Observable<IceCream[]> = of([]);
  iceCreams: IceCream[] = [];
  sortOptions = [{option: 'Nome', value: 'name' }, {option: 'Preço', value: 'price' }];

  priceOperators = ['=', '>', '>=', '<', '<='];
  constructor(
    private iceCreamService: IceCreamService, 
    private router: Router,
    private formBuilder:FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {

    this.form = this.formBuilder.group({
      name: [null],
      priceOperator: [null],
      price:[null],
      sort: [null]
    });
    
    this.loadPage();
  }


  handlePageEvent($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize; 
  
    this.loadPage();
  }

  loadPage() {
    let filter = new IceCreamFilter(
      this.form.value.name,
      this.form.value.priceOperator,
      this.form.value.price,
      this.form.value.sort
    );
    console.log(this.form.value.sort);
    this.iceCreamService.getFilteredAndSortedAndPaginated(
      filter, 
      this.pageSize, this.pageIndex + 1).subscribe({
        next: (p) => {
          this.iceCreams$ = of(p.data);
          this.iceCreams$.subscribe(x => this.iceCreams = x);
          this.length = p.items;
        }
      }
    );
  }



  onAdd(){
    this.router.navigate(['register'], {relativeTo: this.activatedRoute});
  }

  onEdit(iceCream: IceCream) {
    this.router.navigate([iceCream.id.toString() + '/edit'], {relativeTo: this.activatedRoute});
  }

  onRemove(iceCream: IceCream) {
    this.openDialog('Remover Produto', 'Você tem certeza que deseja remover este produto?', 'Não', 'Sim',
      () => {
        this.iceCreamService.delete(iceCream.id).subscribe(
          {
            next: (p) => {
              this.showMessage('Produto removido com sucesso!', 'Ok', {duration: 1000});
              this.loadPage();
            },
            error: (e) => this.showMessage(e, '', {duration: 1000})
          }
        )
      }
    );
  }

  onFilter() {
    this.loadPage();
  }
  
  openDialog(header: string, description: string, cancelButtonName: string, confirmationButtonName: string, confirmationAction: () => void) {
    this.dialog.open(AlertConfirmationComponent, {
      width: '400px', 
      data: {
        header,
        description,
        cancelButtonName,
        confirmationButtonName,
        confirmationAction
      }
    }
    )
  }

  showMessage(message: string, action: string): MatSnackBarRef<TextOnlySnackBar>;
  showMessage(message: string, action: string, config: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar>;
  showMessage(message: string, action: string, config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    if (config) 
      return this.snackBar.open(message, action, config);
    return this.snackBar.open(message, action);
  }
}
