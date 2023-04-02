import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { surveyData } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {
  questions!: surveyData.data[]
  options!: surveyData.data[]
  questionsLoading = false
  optionsLoading = false
  panelExpanded = false
  questionRespondedCondition = false
  tooltipMessage = 'Please click to edit the question'
  @ViewChild('container') d1!: ElementRef;
  questionForm!: FormGroup
  questionresponded: string[] = []

  constructor(private surveySvc: SurveyService) { }

  ngOnInit(): void {

    this.surveySvc.getAllQuestions().subscribe((result: surveyData.questionsResult) => {
      if (result.consulations.Questions) {
        this.questions = result.consulations.Questions
      }
      this.questionsLoading = true
    }, (_err: Error) => {
      this.questions = []
      this.questionsLoading = true
    })
    this.surveySvc.getCount().subscribe((result: surveyData.responseAnalysis) => {
      if (result) {
        result.eachQuestionCount.sort((a, b) => a.questionId < b.questionId ? -1 : a.questionId > b.questionId ? 1 : 0)
        if (this.questions) {
          this.questions.forEach(elemq => {
            result.eachQuestionCount.forEach(elem => {
              if (elemq.id as unknown as number == elem.questionId) {
                this.questionresponded.push(elemq.id)
              }
            })
          })
        }

      }
      this.questionRespondedCondition = true
    }, (_err: Error) => {
      this.questions = []
      this.questionRespondedCondition = true
    })
  }
  updatedSuccessfull(result: boolean) {
    console.log(result)
    if (result) {
      this.panelExpanded = !this.panelExpanded
    }

  }
  checkDisabled(id:string){
    console.log(id)
    console.log(this.questionresponded)
    if(this.questionresponded.includes(id)){
      this.tooltipMessage = 'Edit is disable has responses were recoreded for this message'
    }
    return this.questionresponded.includes(id)
  }



}
