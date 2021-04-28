import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Film } from 'src/app/model/film';
import { FilmService } from 'src/app/service/film.service';


const ApiUrl = 'http://localhost:3000/film';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  imageSrc: string | any;
@Input() active: Film | any;
@Input() films: Film[] | any;

  constructor(private http : HttpClient, private fimService: FilmService) {}

  add(form: NgForm) {
    this.http.post<Film>(`${ApiUrl}`,form.value).subscribe((res:Film) => {
      this.films.push(res);
      form.reset();
      this.imageSrc = null;
    });
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
  }

}
