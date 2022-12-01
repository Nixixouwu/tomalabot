import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  pageTitle = 'Te llevo';
  isNotHome = false;
  loading :HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController, public httpClient:HttpClient) {}
  
  ngOnInit(): void {
    this.cargarLoading('Bienvenido a TeLLevoAPP');
    console.log('OnInit');
  }

  ngOnDestroy(): void {
    this.cargarLoading('Vuelve pronto!!')
    console.log('OnDestroy');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  cargarLoading(message: string){
    this.presentLoading(message);

    setTimeout(() => {
      this.loading.dismiss();
    },2000);
  }

  async presentLoading(message:string){
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }

  weatherTemp :any
  todayDate = new Date()
  cityName = ""
  weatherIcon :any
  weatherDetails :any
  name = ""
  loadingClima = true

  loadData(){
    this.httpClient.get(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}&units=metric&lang=sp`).subscribe(results => {      
      this.weatherTemp = results['main']
      this.name = results['name']
      this.weatherDetails = results['weather'][0]      
      this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png` 
      this.loadingClima = false
    })
  }

}
