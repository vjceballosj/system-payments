import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pagos',
  standalone: false,
  templateUrl: './pagos.html',
  styleUrl: './pagos.css'
})
export class Pagos {

  public pagos:any;
  public dataSource:any;
  public displayedColumns = ['id','fecha','cantidad','type','status','nombre'];

  /*
  - @ViewChild: decorador que permite acceder a un componente hijo del DOM
  */
  @ViewChild(MatPaginator) panigator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
