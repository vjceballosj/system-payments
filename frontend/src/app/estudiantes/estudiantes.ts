import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiantes.models';
import { EstudianteService } from '../services/estudiantes';


@Component({
  selector: 'app-estudiantes',
  standalone: false,
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class Estudiantes implements OnInit {

  estudiantes!: Array<Estudiante>;

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.estudianteService.getAllEstudiantes().subscribe({
      next: value => {
        this.estudiantes = value;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
