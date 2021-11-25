import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/services/parametros/comite.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-crear-comite',
  templateUrl: './crear-comite.component.html',
  styleUrls: ['./crear-comite.component.css']
})
export class CrearComiteComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ComiteService: ComiteService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]]
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SaveRecord() {
    let model = new ComiteModel();
    model.nombre = this.form.controls.nombre.value;
    
    this.ComiteService.SaveRecord(model).subscribe({
      next: (data: ComiteModel) => {
        this.router.navigate(["parametros/listar-comite"]);
      },
      error: (err: any) => {
      }
    });
  }

  ngOnInit(): void {
    this.CreateForm();
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}
