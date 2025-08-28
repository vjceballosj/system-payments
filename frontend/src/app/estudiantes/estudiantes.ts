import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiantes.models';
import { EstudianteService } from '../services/estudiantes';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-estudiantes',
  standalone: false,
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class Estudiantes implements OnInit {

  estudiantes!: Array<Estudiante>;
  estudiantesDataSource!: MatTableDataSource<Estudiante>;
  displayedColumns: string[] = ['id','nombres','apellidos','codigo','programaId'];

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.estudianteService.getAllEstudiantes().subscribe({
      next: value => {
        this.estudiantes = value;
        this.estudiantesDataSource = new MatTableDataSource<Estudiante>(this.estudiantes);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
