import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EstudianteService } from '../services/estudiantes';

@Component({
  selector: 'app-pagos',
  standalone: false,
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos {

  public pagos: any;
  public dataSource: any;
  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status', 'nombres','apellidos'];

  /*
  - @ViewChild: decorador que permite acceder a un componente hijo del DOM
  */
  @ViewChild(MatPaginator) panigator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private estudianteService:EstudianteService) { }

  ngOnInit(): void {
    this.estudianteService.getAllPagos().subscribe({
      next: data => {
        this.pagos = data;
        this.dataSource = new MatTableDataSource(this.pagos);
        this.dataSource.paginator = this.panigator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err);
      }

    })
  }
}
