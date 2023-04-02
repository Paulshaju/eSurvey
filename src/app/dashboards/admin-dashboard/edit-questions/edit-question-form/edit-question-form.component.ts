import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { surveyData } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-edit-question-form',
  templateUrl: './edit-question-form.component.html',
  styleUrls: ['./edit-question-form.component.scss']
})
export class EditQuestionFormComponent implements OnInit {
  @Input() questionText = ''
  @Input() id = ''
  @Output() result = new EventEmitter<boolean>();
  questions!: surveyData.data[]
  options!: surveyData.data[]
  questionsLoading = false
  optionsLoading = false
  @ViewChild('container') d1!: ElementRef;
  questionForm!: FormGroup
  submitting = false
  counter = 0

  constructor(private surveySvc:SurveyService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      title: new FormControl(),
    })
    let counter = 0
    this.options = []
    if(this.questionText && this.id){
      this.questionForm.patchValue({
        title : this.questionText
      })
      this.surveySvc.getOptions(this.id).subscribe((result: surveyData.optionDataResult) => {
        if (result.Options) {
          this.options = result.Options
          this.optionsLoading = true
          this.options.forEach(elem => {
            this.counter++
            this.d1.nativeElement.insertAdjacentHTML('beforeend', `<div class="flex flex-row flex-middle fadeindownAnimation" id="container${this.counter}">
      <input type="radio" checked>
      <input class="optionsInput" type="text" placeholder="Enter your options here" id="options${this.counter}" value="${elem.Text}"></input>
      <img src='../../../assets/images/remove.png' id="removeIcon${this.counter}" class="removeIcon ml-2 cursor-pointer" " />
      </div>`)
  
            var removeIcon = document.getElementById(`removeIcon${counter}`)
            var id = `container${counter}`
            if (removeIcon) {
              removeIcon.addEventListener('click', () => {
                this.removeOptions(id)
              })
            }
          })
        }
      })
    }
    
    
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
    console.log(id)
    var elem =  document.getElementById(id)
    if(elem){
      elem.remove()
    }
    this.options.forEach((elem,index) =>{
      if(elem.id == id){
        delete this.options[index]
      }
    })
  }
  onSubmit(){
    this.submitting = true
    console.log(this.submitting)
    let optionsValues:surveyData.options [] = []
    if(this.counter > 1){
      for(let i=1;i<= this.counter;i++){
        var optionId = `options${i}`
        console.log((<HTMLInputElement>document.getElementById(optionId)).value)
        if((<HTMLInputElement>document.getElementById(optionId)).value){
          let options:surveyData.options = {
            optionId:i,
            optionText: (<HTMLInputElement>document.getElementById(optionId)).value
          }
          optionsValues.push(options)
        }
        
        
      }
      let questions:surveyData.submitQuestion = {
        questionId:this.id as unknown as number,
        questionText:this.questionForm.get('title')?.value,
        options:optionsValues
      }
      this.surveySvc.updateQuestion(questions).subscribe((result: surveyData.result) => {
        if(result.result){
          this.result.emit(true)
          this._snackBar.open('Question added Succesfully')
        }
        else{
          this._snackBar.open('Question Submission failed!!Please try again later.')
        }
      },(_err: any) => {
        this._snackBar.open('Question Submission failed!!Please try again later.')
      })
      this.submitting = false
    }
    else{
      this.submitting = false
      this._snackBar.open('Please submit more than one option to save the question')
    }
   
  }

}
