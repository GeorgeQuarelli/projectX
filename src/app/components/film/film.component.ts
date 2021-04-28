import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/model/film';
import { FilmService } from 'src/app/service/film.service';

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
  

  constructor(private http : HttpClient, private fimService: FilmService) { }

  getAll(){
    this.fimService.getAll()
    .subscribe( ( res : Film[] ) => {
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

