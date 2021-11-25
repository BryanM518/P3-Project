import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/services/parametros/comite.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-actualizar-comite',
  templateUrl: './actualizar-comite.component.html',
  styleUrls: ['./actualizar-comite.component.css']
})
export class ActualizarComiteComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ComiteService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ComiteModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
      }
    });
  }

  SaveRecord() {
    let model = new ComiteModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    this.service.EditRecord(model).subscribe({
      next: (data: ComiteModel) => {
        this.router.navigate(["/parametros/listar-comite"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

