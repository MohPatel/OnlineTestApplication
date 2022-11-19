import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Question } from './question';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http:HttpClient) { }

  loadAllQuestion() : Observable<Question[]>{
      return this.http.get<Question[]>("./assets/questions.json");
  }

  loadAnswers():Observable<Answer[]>
  {
    return this.http.get<Answer[]>("./assets/answers.json");

  }
}
