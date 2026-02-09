import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-asociacion-dialog',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './asociacion-dialog.html',
  styleUrl: './asociacion-dialog.css',
})
export class AsociacionDialog {
  constructor(
    private readonly dialogRef: MatDialogRef<AsociacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.form.patchValue(data);
    }
  }

  form = new FormGroup({
    tipoDocumentoIdentidad: new FormControl('', Validators.required),
    nDocumento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
  });

  save() {
    this.dialogRef.close(this.form.value);
  }
}
