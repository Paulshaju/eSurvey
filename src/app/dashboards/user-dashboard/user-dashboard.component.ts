import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { newsData } from 'src/app/models/news.model';
import { surveyData } from 'src/app/models/survey.model';
import { UserData } from 'src/app/models/user.model';
import { CookiesService } from 'src/app/services/cookies.service';
import { NewsService } from 'src/app/services/news.service';
import { SurveyService } from 'src/app/services/survey.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  name:string = 'Paul'
  userData!:UserData.getUserData
  newsArticlesData!:newsData.newResult[]
  trendingNews!:newsData.newResult[]
  questions!:surveyData.data[]
  featuredNewsTitle:string = 'Latest featured articles'
  surveyStarted = false
  subTitle = ''
  activeImage = ''
  newsLoading = true
  submission = false
  errorOccured = false
  backgroundIMages = ['assets/images/image1.jpg', 'assets/images/image2.jpg', 'assets/images/image3.jpg', 'assets/images/image4.jpg']
  indexImage = 0
  constructor(
    private userSvc:UserService,
    private newsSvc:NewsService,
    private activatedRoute:ActivatedRoute,
    private route:Router,
    private cookieSvc:CookiesService,
    private surveySvc:SurveyService

  ) {
   
    
    
   }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data:Data) => {
      this.userData = data.userData
    },(_err:Error)=>{
      console.error(_err)
    })
   
    this.surveySvc.checkResponse(this.userSvc.userEmail).subscribe(result =>{
      if(result.result){
        this.submission = true
      }
    },(_err:Error)=>{
      this.errorOccured = true
    })
    this.activeImage = this.backgroundIMages[0]
    // if(this.userSvc.userEmail){
    //   this.userSvc.getUserDetails(this.userSvc.userEmail).subscribe((result) => {
    //     console.log(result)
    //   })
    // }
    this.newsSvc.getArticles().subscribe((result:newsData.newResult[])=>{
      if(result){
        this.newsArticlesData = result
      }
      else{
        this.newsArticlesData = []
      }
      
    })
    this.newsSvc.getTrendingNews().subscribe((result:newsData.newResult[]) =>{
      if(result){
        this.newsLoading = false
        this.trendingNews = result
      }
      else{
        this.newsLoading = false
        this.trendingNews = []
      }
    },()=>{
      this.newsLoading = false
    })
    this.setNewsImages()

  }
  setNewsImages(){
    var i = 0
    setInterval(() => {
      i = i + 1
      this.indexImage = i
      if(i === this.backgroundIMages.length){
        i = 0
      }
      this.featuredNewsTitle = this.newsArticlesData[i].title
      this.activeImage = this.backgroundIMages[i]
      this.subTitle = this.newsArticlesData[i].subTitle ? this.newsArticlesData[i].subTitle : ''
      
    }, 9750
    )
  }
  surveyClicked(){
    this.surveyStarted = true
  }
  logOutClicked(){
    this.cookieSvc.deleteCookies(this.userSvc.userEmail)
    this.route.navigateByUrl('/login')
  }
  checkSubmissionisDone(result:boolean){
    if(result){
      this.submission = true
    }
  }
  
  

}
