import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newsData } from '../models/news.model';

const apiPort = 'https://esurveyapi.herokuapp.com/apis'
const apiEndpoints = {
  getArticles: `${apiPort}/getarticles`,
  getTrendingNews: `${apiPort}/gettrendingnews`
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http:HttpClient
  ) { }
  
  getArticles():Observable<newsData.newResult[]>{
    return this.http.get<newsData.newResult[]>(apiEndpoints.getArticles)
  }
  getTrendingNews():Observable<newsData.newResult[]>{
    return this.http.get<newsData.newResult[]>(apiEndpoints.getTrendingNews)
  }
}
