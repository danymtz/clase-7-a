import { Component, OnInit } from '@angular/core';
import NavigatorHelper from 'src/app/libs/helpers/navigator.helper';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  position: any ={};
  time: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  getLocation() {
   /* NavigatorHelper.getLocation().then(position => {
    console.log("position: ", position);
    
   }).catch(err => {
    console.log("Error", err);
    
   }) */

   NavigatorHelper.getLocationC(position=> {
      console.log(position);
      this.position = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      } 
      //this.time = new Date(position.timestamp).toLocaleDateString();
      this.time = position.timestamp;
   },
   error => {
    console.log(error);
   })
  }

  onSubmit (){
    console.log("position: ", this.position,"Time: ", this.time);
    
  }
  
  start(video: HTMLVideoElement){
    console.log(">>>", video);
    
    NavigatorHelper.startRecord(video);
  }
}
