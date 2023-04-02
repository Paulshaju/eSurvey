import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Chart } from 'chart.js';
import { surveyData } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit {
  @Output() result = new EventEmitter<number>();
  loadingGraph = false
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    tension: 0.5, 
  }
  lineChartLabels:string[] = []
  lineChartType = 'line'
  lineChartLegend = true
  
  lineChartData:any
  constructor(private surveySvc:SurveyService) { }

  ngOnInit(): void {
    this.surveySvc.getCount().subscribe((result: surveyData.responseAnalysis) => {
      let countArray :number[] = []
      let questionArray : string[] = []
      if (result) {
        let numberofQuesiton = result.eachQuestionCount.length
        this.result.emit(result.totalresponse as unknown as number)
        for(let i = 1; i<=numberofQuesiton;i++){
          questionArray.push(`Question ${i}`)
        }

        this.lineChartLabels = questionArray
        result.eachQuestionCount.sort((a, b) => a.questionId < b.questionId ? -1 : a.questionId > b.questionId ? 1 : 0)
        result.eachQuestionCount.forEach(elem =>{

          countArray.push(elem.count as unknown as number)
        })
        this.lineChartData = [{
          label: 'responses',
          data:countArray,
          fill: true,
          borderColor: 'rgb(34, 233, 213)',
          backgroundColor:'rgba(33, 38, 66, 0.97)',
        }]
      }
      this.loadingGraph = false
    })
  }

}
