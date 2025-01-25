import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-confirmation',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './alert-confirmation.component.html',
  styleUrl: './alert-confirmation.component.scss'
})
export class AlertConfirmationComponent {

  public header: string;
  public description: string;
  public cancelButtonName: string;
  public confirmationButtonName: string;
  public confirmationAction = () => {};

  constructor(
    private dialogRef: MatDialogRef<AlertConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      header: string; 
      description: string; 
      cancelButtonName: string; 
      confirmationButtonName: string,
      confirmationAction: () => void
    }) {
    
    this.header = data.header || 'Title';
    this.description = data.description || '...';
    this.cancelButtonName = data.cancelButtonName || 'Cancelar';
    this.confirmationButtonName = data.confirmationButtonName || 'Confirmar';
    this.confirmationAction = data.confirmationAction;
  }
}
