import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { surveyData } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-surveyquestions',
  templateUrl: './surveyquestions.component.html',
  styleUrls: ['./surveyquestions.component.scss']
})
export class SurveyquestionsComponent implements OnInit {
  @Output() result = new EventEmitter<boolean>();
  questions!: surveyData.data[]
  options!: surveyData.data[]
  questionsLoading = false
  optionsLoading = false
  questionsTitle = ''
  responseData!: surveyData.SubmitResponse
  currentQuestionId = 1
  totalQuestions = 0
  optionSelected = ''
  insertionError = false
  value = 0
  selected = -1

  constructor(
    private surveySvc: SurveyService,
    private userSvc: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.surveySvc.getAllQuestions().subscribe((result: surveyData.questionsResult) => {
      if (result.consulations.Questions) {
        this.questions = result.consulations.Questions
        this.questionsTitle = this.questions[0].Text
        this.totalQuestions = this.questions.length
        this.questionsLoading = true
      }
    },(_err:Error)=>{
      this.questions = []
      this.questionsLoading = true
    })
    this.surveySvc.getOptions('1').subscribe((result: surveyData.optionDataResult) => {
      if (result.Options) {
        this.options = result.Options
        this.optionsLoading = true
      }
    },(_err:Error)=>{
      this.options = []
      this.questionsLoading = true
      this.optionsLoading = true
    })

  }

  ngOnInit(): void {
  }
  nextQuestions() {
    this.optionsLoading = false
    if(this.currentQuestionId !== this.questions.length){
      if (this.userSvc.userEmail) {
        this.responseData = {
          email: this.userSvc.userEmail,
          QuestionID: this.currentQuestionId,
          ChosenOptionID: this.optionSelected
        }
        this.surveySvc.insertResponse(this.responseData).subscribe(result => {
  
          if (result.result) {
            this.value = this.value + 100 / this.totalQuestions
  
            this.currentQuestionId = this.currentQuestionId + 1
            if (this.currentQuestionId === this.totalQuestions) {
              this.value = 100
            }
            this.surveySvc.getOptions(this.currentQuestionId.toString()).subscribe((result: surveyData.optionDataResult) => {
              if (result.Options) {
                this.questionsTitle = this.questions[this.currentQuestionId - 1].Text
                this.options = result.Options
                this.selected = -1
                this.optionSelected = ''
                this.optionsLoading = true
              }
            })
          }
          else{
            this.optionsLoading = true
            this.insertionError = true
            this._snackBar.open('Response Submission failed!!Please try again later.')
          }
        }, (_err: any) => {
          this._snackBar.open('Response Submission failed!!Please try again later.')
          this.optionsLoading = true
          this.insertionError = true
        })
      }
    }
    else{
      this.result.emit(true)
    }
    

    // this.surveySvc.insertResponse()

  }
  selectedOption(checkbox: MatCheckbox, id: string) {
    this.optionSelected = id
    // console.log(id)

  }

}
