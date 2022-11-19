import { Component, OnInit } from '@angular/core';
import { Answer } from '../answer';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionInfo:Array<Question> = []
  anserInfo:Array<Answer> =[]
  flag:boolean=false
  flagAnswer:boolean=false
  passingMarks:number=0
  myAnswer= new Map()
  constructor(public qs:QuestionService) { }

  ngOnInit(): void {
    this.qs.loadAnswers().subscribe({
      next:(data:any)=>this.anserInfo=data.answers,
      error:(error:any)=>console.log(error),
      complete:()=>console.log("completed")
    })
  }

  loadQuestionDetails(){
    this.flag=true;
    this.qs.loadAllQuestion().subscribe({
      next:(data:any) => this.questionInfo=data.questions,
      error:(error:any) => console.log(error),
      complete:() => console.log("done")
    })
  }

  storeAns(qid:any, ans:any)
  {
   // console.log(qid + " " + ans);
    this.myAnswer.set(qid,ans);
  }
  submitExam()
  {

    this.passingMarks = 0;
    //console.log(this.myAnswer);
    //console.log(this.anserInfo);
    //this.myAnswer.forEach((key:AnalyserNode,value:any) => console.log(key,value))

    this.anserInfo.forEach((obj:any,index:any)=>{
      //console.log(this.myAnswer.get(index+1));
     // console.log(obj.qid);
      if(this.myAnswer.get(obj.qid))
      {
        console.log("suceess");
        console.log(this.myAnswer.get(obj.qid));
        console.log(obj.ans);
        if(obj.ans == this.myAnswer.get(obj.qid))
        {
          console.log("suceessfully inside");
          this.passingMarks= this.passingMarks+ 1;
        }
      }
    })
    console.log(this.passingMarks);
  }

  reviewAnswer(){
     this.flagAnswer=true;
  }

}
