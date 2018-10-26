import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

export interface Dato {
   latitud: number;
   longitud: number;
   distancia: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	todo:any;
	latitud_anterior:any;
	longitud:any;
	coordenada_anterior:any;
	distancia:any;
	velocidad:any;
	tiempo_actual:any;
	tiempo_anterior:any;
	array:any={};
	coords:any;
	diferente:any;
	


  constructor(private geolocation: Geolocation,public navCtrl: NavController) {

var latitud=[];


  	   this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error getting location', error);
});

let watch = this.geolocation.watchPosition();
watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude


 var today = new Date();



latitud.push(
	{'latitud':data.coords.latitude,
	'longitud':data.coords.longitude,
	'distancia':this.calculateDistance(data.coords,data.coords)
	}
)


if(latitud.length>=2){

	console.log(latitud[latitud.length-1].latitud,latitud[latitud.length-2].latitud)
	
	this.distancia=this.calculateDistance(latitud[latitud.length-1],latitud[latitud.length-2])


}



 //this.tiempo_actual=today

 // this.array['tiempo_anterior']=this.tiempo_anterior
 // this.array['coordenada_anterior']=this.coordenada_anterior

 // this.array['tiempo_actual']=this.tiempo_actual
 // this.latitud= data.coords.latitude
 // this.longitud = data.coords.longitude
 // this.distancia = this.calculateDistance(this.coordenada_anterior, data.coords);
 // this.array['distancia']=this.distancia

 // this.coordenada_anterior = data.coords;
 // this.array['coordenada_actual']=data.coords;
 // this.tiempo_anterior=today



});



  }

  	toRad(value) {
      var RADIANT_CONSTANT = 0.0174532925199433;
      return (value * RADIANT_CONSTANT);
    }

    calculateDistance(starting, ending) {
      var KM_RATIO = 6371;
      try {
        var dLat = this.toRad(ending.latitude - starting.latitude);
        var dLon = this.toRad(ending.longitude - starting.longitude);
        var lat1Rad = this.toRad(starting.latitude);
        var lat2Rad = this.toRad(ending.latitude);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = KM_RATIO * c;
        return d;
      } catch(e) {
        return -1;
      }
    }






}
