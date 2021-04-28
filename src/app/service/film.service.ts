import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../model/film';

const ApiUrl = 'http://localhost:3000/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  getAll():Observable <Film[]> {
    return  this.http.get<Film[]>(ApiUrl);
  }
  constructor(private http : HttpClient) { }
}
