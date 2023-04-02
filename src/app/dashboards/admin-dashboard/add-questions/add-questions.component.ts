import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { surveyData } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
// import $ from 'jquery';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  @ViewChild('container') d1!: ElementRef;
  questionForm!: FormGroup
  addquestions = true
  counter = 0
  submitting = false

  constructor(private surveySvc:SurveyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      title: new FormControl(),
    })
  }
  

  optionsAdded() {
    this.counter++
    this.d1.nativeElement.insertAdjacentHTML('beforeend', `<div class="flex flex-row flex-middle" id="container${this.counter}">
    <input type="radio" checked>
    <input class="optionsInput" type="text" placeholder="Enter your options here" id="options${this.counter}"></input>
    <img src='../../../assets/images/remove.png' id="removeIcon${this.counter}" class="removeIcon ml-2 cursor-pointer" " />
    </div>`)
    var removeIcon = document.getElementById(`removeIcon${this.counter}`)
    var id = `container${this.counter}`
    if(removeIcon){
      removeIcon.addEventListener('click',()=>{
        this.removeOptions(id)
      })
    }
  }
  removeOptions(id:string){
    var elem =  document.getElementById(id)
    if(elem){
      elem.remove()
    }
    this.counter--
  }
  onSubmit(){
    this.submitting = true
    let optionsValues:surveyData.options [] = []
    if(this.counter > 1){
      for(let i=1;i<= this.counter;i++){
        var optionId = `options${i}`
        if((<HTMLInputElement>document.getElementById(optionId)).value){
          let options:surveyData.options = {
            optionId:i,
            optionText: (<HTMLInputElement>document.getElementById(optionId)).value
          }
          optionsValues.push(options)
        }
      }
      let questions:surveyData.submitQuestion = {
        questionId:0,
        questionText:this.questionForm.get('title')?.value,
        options:optionsValues
      }
      this.surveySvc.insertQuestion(questions).subscribe((result: surveyData.result) => {
        if(result.result){
          this._snackBar.open('Question added Succesfully')
          this.addquestions = true
          this.submitting = false
        }
        else{
          this.submitting = false
          this._snackBar.open('Question Submission failed!!Please try again later.')
        }
      },(_err: any) => {
        this._snackBar.open('Question Submission failed!!Please try again later.')
        this.submitting = false
      })
    }
    else{
      this.submitting = false
      this._snackBar.open('Please submit more than one option to save the question')
    }
   
  }


}
