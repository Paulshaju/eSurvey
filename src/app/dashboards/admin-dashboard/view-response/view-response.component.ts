import { Component, OnInit } from '@angular/core';
import { surveyData } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.scss']
})
export class ViewResponseComponent implements OnInit {

  questions!: surveyData.data[]
  options!: surveyData.data[]
  questionsLoading = false
  constructor(private surveySvc: SurveyService) { }

  ngOnInit(): void {
    this.surveySvc.getAllQuestions().subscribe((result: surveyData.questionsResult) => {
      if (result.consulations.Questions) {
        this.questions = result.consulations.Questions
        this.questionsLoading = true
      }
    },
    (_err:Error)=>{
      this.questions = []
      this.questionsLoading = true
    })
  }

}
