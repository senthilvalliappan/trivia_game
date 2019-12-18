import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  quizdata: any
  index ;
  interval: any
  answers: any = []
  finalScore:number;
  submitted:boolean = false;
  constructor(private service: ApiService) {

  }

  ngOnInit() {
    // this.quizdata = this.service.getQuizData()
    this.index =0
    this.service.getQuizData().subscribe((res: any) => {
      res;
      this.quizdata = res;
      console.log("res", this.quizdata.results);
      if (this.quizdata.results.length > 0) {
        let i = 0;
        this.quizdata.results.forEach(element => {
          element.id = i + 1
          element.answers = [...element.incorrect_answers]
          let index = this.getRndInteger(0, 4);
          element.answers.splice(index, 0, element.correct_answer);
          i++;
        });

        console.log(this.quizdata)

      }
    })
  }
  startInterval() {
    this.interval = setInterval(() => {
      this.changeData();
    }, 30000)
  }

  changeData() {
    console.log(this.index)
    if (this.index == this.quizdata.results.length - 1) {
      clearInterval(this.interval);
    } else {
      this.index += 1
      if(this.quizdata.results[this.index].answered){

      }
    }


  }

  getRndInteger(min, max): any {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  checkbox(e) {
    console.log(e)
    this.quizdata.results[this.index].answered = e.target.value;
  }

  next() {
    console.log(this.quizdata.results[this.index].answered)
    this.answers.push({ id: this.quizdata.results[this.index].id, answer: this.quizdata.results[this.index].answered });
    this.index+= 1;
    console.log('answers',this.answers)
    clearInterval(this.interval);
    this.startInterval();
  }

  submit(){
    this.submitted = true;
    let score = 0;
    for(let i = 0;i<this.answers.length;i++){
      for(let j = 0;j< this.quizdata.results.length;j++){
        if(this.quizdata.results[j].id == this.answers[i].id){
          if(this.quizdata.results[j].correct_answer == this.answers[i].answer){
            score+=1
          }
        }
      }

    }
    this.finalScore = score;
    console.log(this.finalScore)
  }

  restartQuiz(){
    this.submitted = false;
    clearInterval(this.interval);
    this.finalScore = undefined
    this.answers =[];
    this.ngOnInit();

  }
}
