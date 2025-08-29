import { Component, OnInit } from '@angular/core';
import { Pago } from '../models/estudiantes.models';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../services/estudiantes';

@Component({
  selector: 'app-estudiante-details',
  standalone: false,
  templateUrl: './estudiante-details.html',
  styleUrl: './estudiante-details.css'
})
export class EstudianteDetails implements OnInit {

  estudianteCodigo!: string;
  pagosEstudiante!: Array<Pago>;
  pagosDataSource!: MatTableDataSource<Pago>;

  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status', 'nombres'];

  constructor(private activatedRoute: ActivatedRoute, private estudiantesService: EstudianteService, private router: Router) {

  }

  ngOnInit(): void {
    this.estudianteCodigo = this.activatedRoute.snapshot.params['codigo'];
    this.estudiantesService.getPagosDeEstudiante(this.estudianteCodigo).subscribe({
      next: value => {
        this.pagosEstudiante = value;
        this.pagosDataSource = new MatTableDataSource<Pago>(this.pagosEstudiante)
      },
      error: err => {
        console.log(err);
      }
    })
  }

  agregarPago() {
    this.router.navigateByUrl(`admin/new-pago/${this.estudianteCodigo}`);
  }
}
