import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  add(form: NgForm) {
    this.http.post<Film>(`${ApiUrl}`,form.value).subscribe((res:Film) => {
      this.films.push(res);
      form.reset();
      this.imageSrc = null;
    });
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
  
  reset(form: NgForm) {
    this.active = null;
    this.imageSrc = null;
    form.reset();
  }

  save(form: NgForm){
    if(this.active){
      this.edit(form);
    } else {
      this.add(form);
    }

  }

  edit(form: NgForm){
    this.http.patch<Film>(`${ApiUrl}/${this.active.id}`,form.value)
    .subscribe(res =>{
      const index = this.films.findIndex( (f: { id: number; }) => f.id === this.active.id);
      this.films[index] =res;
    })
  }

  readUrl(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const[file] = event.target.files;
      reader.readAsDataURL(file);
      if(this.active){
          reader.onload= ()=> {
          this.active.img = reader.result as string;
        }
      } else {
          reader.onload= ()=> {
          this.imageSrc = reader.result as string;
        }
      }      
    }
  }


  ngOnInit(): void {
    this.getAll();
  }

}
