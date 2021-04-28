import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { Film } from 'src/app/model/film';

const ApiUrl = 'http://localhost:3000/film';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  films: Film[] | any;
  error: any;
  active: Film | any;
  imageSrc: string | any;

  constructor(private http : HttpClient) { }

  getAll(){
    this.http.get<Film[]>(ApiUrl).subscribe( ( res : Film[] ) => {
    this.films = res;
    },
      err => this.error = err
    );
  }

  delete(event: { stopPropagation: () => void; }, film: Film){
    event.stopPropagation();
    //const index = this.films.indexOf(film);
    this.http.delete<Film>(`${ApiUrl}/${film.id}`).subscribe(()=>{
      const index = this.films.findIndex( (f: { id: number; }) => f.id === film.id);
      this.films.splice(index,1);
    });
  }

  setActive(film: Film) {
    this.active = film;
  }

  ngOnInit(): void {
    this.getAll();
  }
}
