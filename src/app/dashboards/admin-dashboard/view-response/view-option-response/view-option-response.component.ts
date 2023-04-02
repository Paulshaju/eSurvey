import { Component, Input, OnInit } from '@angular/core';
import { surveyData } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-view-option-response',
  templateUrl: './view-option-response.component.html',
  styleUrls: ['./view-option-response.component.scss']
})
export class ViewOptionResponseComponent implements OnInit {
  @Input() id = ''
  totalOptions = 0
  loadingGraph = false
  noResponse = false
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = []
  public barChartType = 'bar'
  public barChartLegend = true
  public barChartData: any

  constructor(private surveySvc: SurveyService) { }

  ngOnInit(): void {
    this.surveySvc.getOptions(this.id).subscribe((result: surveyData.optionDataResult) => {
      if (result.Options) {
        this.totalOptions = result.Options.length
      }
    })
    this.surveySvc.getOptionsCount(this.id).subscribe((result: surveyData.questionOptionResponse) => {
      this.loadingGraph = true
      if (result) {
        for (let i = 1; i <= this.totalOptions; i++) {
          this.barChartLabels.push(`Option ${i}`)
        }
        result.Answers.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
        let countArray: number[] = []
        for (let i = 1; i <= this.totalOptions; i++) {
          let checked = false
          result.Answers.forEach(elem => {
            if (elem.id == i) {
              console.log(elem.id)
              checked = true
              countArray.push(elem.count)
            }
          })
          if (!checked) {
            countArray.push(0)
          }
        }
        console.log(countArray)
        this.barChartData = [{
          data: countArray, label: 'Responses'
        }]
      }
    })

  }

}
