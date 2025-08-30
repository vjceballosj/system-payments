import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from '../models/estudiantes.models';
import { EstudianteService } from '../services/estudiantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-pago',
  standalone: false,
  templateUrl: './new-pago.html',
  styleUrls: ['./new-pago.css']
})
export class NewPago implements OnInit {

  pagoFormGroup!: FormGroup;
  codigoEstudiante!: string;
  tiposPagos: string[] = [];
  pdfFileUrl!: string;

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit(): void {
    // Cargar enum PaymentType como lista de strings
    for (let elt in PaymentType) {
      let value = PaymentType[elt];
      if (typeof value === 'string') {
        this.tiposPagos.push(value);
      }
    }

    this.codigoEstudiante = this.activatedRouter.snapshot.params['codigoEstudiante'];

    this.pagoFormGroup = this.fb.group({
      date: this.fb.control(''),
      cantidad: this.fb.control(''),
      type: this.fb.control(''),
      codigoEstudiante: this.fb.control(this.codigoEstudiante),
      fileName: this.fb.control(''),
      fileSource: this.fb.control(null)
    });
  }

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.pagoFormGroup.patchValue({
        fileSource: file,
        fileName: file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  guardarPago() {
    let date: Date = new Date(this.pagoFormGroup.value.date);
    let formattedDate = date.toISOString().split('T')[0];  // convertir a yyyy-MM-dd

    let formData = new FormData();
    formData.set('date', formattedDate);
    formData.set('cantidad', this.pagoFormGroup.value.cantidad);
    formData.set('type', this.pagoFormGroup.value.type);
    formData.set('codigoEstudiante', this.pagoFormGroup.value.codigoEstudiante);
    formData.set('file', this.pagoFormGroup.value.fileSource);

    this.estudianteService.guardarPago(formData).subscribe({
      next: value => {
        Swal.fire({
          title: 'Pago Guardado',
          text: "El pago ha sido registrado con éxito",
          icon: "success"
        });
      },
      error: err => {
        Swal.fire({
          icon: "error",
          title: 'Error',
          text: "Ha ocurrido un error al registrar el pago"
        });
      }
    });
  }
}
