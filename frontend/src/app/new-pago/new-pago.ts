import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../models/estudiantes.models';

@Component({
  selector: 'app-new-pago',
  standalone: false,
  templateUrl: './new-pago.html',
  styleUrl: './new-pago.css'
})
export class NewPago implements OnInit {

  pagoFormGroup!: FormGroup;
  codigoEstudiante!: string;
  tiposPagos: string[] = [];
  pdfFileUrl!: string;

  constructor(private fb:FormBuilder, private activatedRouter:ActivatedRoute){

  }

  ngOnInit(): void {
      for(let elt in PaymentType){
        let value = PaymentType[elt];
        if(typeof value == 'string'){
          this.tiposPagos.push(value);
        }
      }

      this.codigoEstudiante = this.activatedRouter.snapshot.params['codigoEstudiante'];
      this.pagoFormGroup =  this.fb.group({
        date: this.fb.control(''),
        cantidad: this.fb.control(''),
        type: this.fb.control(''),
        codigoEstudiante: this.fb.control(this.codigoEstudiante),
        fileName: this.fb.control('')
      })
  }

  selectFile(event:any){
    if(event.target.files.length > 0){
      let file = event.target.file[0];
      this.pagoFormGroup.patchValue({
        fileSource: file,
        fileName: file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  guardarPago(){
    let date:Date = new Date(this.pagoFormGroup.value.date);
    let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+'/'+date.getFullYear(); //DD/MM/YYYY

    let formData = new FormData();
    formData.set('date', formattedDate);
    formData.set('cantidad', this.pagoFormGroup.value.cantidad);
    formData.set('type', this.pagoFormGroup.value.type);
    formData.set('codigoEstudiante', this.pagoFormGroup.value.codigoEstudiante);
    formData.set('file', this.pagoFormGroup.value.fileSource);
  }
}
