import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/model/film';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  films: Film[] | any;

  constructor(private http : HttpClient) { }

  getAll(){
    this.http.get<Film[]>('http://localhost:3000/film').subscribe( ( res : Film[] ) => {
    this.films = res;
    });
  }

  delete(film: Film){
    const index = this.films.indexOf(film);
    this.films.splice(index,1);
  }

  ngOnInit(): void {
    this.getAll();
  }

}
