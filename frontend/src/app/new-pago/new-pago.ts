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
}
