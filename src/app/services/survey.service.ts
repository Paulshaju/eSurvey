import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { surveyData } from '../models/survey.model';

const apiPort = 'https://esurveyapi.herokuapp.com/apis'
const apiEndpoints = {
  getAllQuestions: `${apiPort}/GetAllQuestions`,
  getOptions: `${apiPort}/GetQuestionOptions`,
  insertResponse: `${apiPort}/insertResponse`,
  insertQuestion: `${apiPort}/insertQuestion`,
  updateQuestion: `${apiPort}/updateQuestion`,
  getCount: `${apiPort}/getCount`,
  getOptionsCount: `${apiPort}/GetQuestionResponse`,
  checkResponseEmail:`${apiPort}/checkResponse`
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private http:HttpClient
  ) { }
  getAllQuestions(): Observable<surveyData.questionsResult> {
    return this.http.get<surveyData.questionsResult>(apiEndpoints.getAllQuestions)
  }
  getOptions(id:string):Observable<surveyData.optionDataResult>{
    let params = new HttpParams().set('id', id);
    return this.http.get<surveyData.optionDataResult>(apiEndpoints.getOptions,{ params: params })
  }
  insertResponse(response:surveyData.SubmitResponse):Observable<any>{
    return this.http.post<any>(apiEndpoints.insertResponse,response)
  }
  insertQuestion(question:surveyData.submitQuestion):Observable<any>{
    return this.http.post<any>(apiEndpoints.insertQuestion,question)
  }
  updateQuestion(question:surveyData.submitQuestion):Observable<any>{
    return this.http.post<any>(apiEndpoints.updateQuestion,question)
  }
  getCount():Observable<any>{
    return this.http.get<any>(apiEndpoints.getCount)
  }
  getOptionsCount(id:string):Observable<any>{
    return this.http.get<any>(`${apiEndpoints.getOptionsCount}/${id}`)
  }
  checkResponse(id:string):Observable<any>{
    let params = new HttpParams().set('id', id)
    return this.http.get<any>(apiEndpoints.checkResponseEmail,{ params: params })
  }

}
