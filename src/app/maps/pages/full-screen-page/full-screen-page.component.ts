import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environments } from '../../../../enviroments/environments';
import  {Map} from 'mapbox-gl';


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;
  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento html no fue encontrado';

    const map = new Map({
      
      container: this.divMap?.nativeElement, // ID del div en el HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas de inicio [lng, lat]
      zoom: 9 // Nivel de zoom inicial
    });
  }

  

  /*ngOnInit(): void {
    

    if(!this.divMap) throw 'El elemento html no fue encontrado';

    const map = new mapboxgl.Map({
      
      container: this.divMap?.nativeElement, // ID del div en el HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas de inicio [lng, lat]
      zoom: 9 // Nivel de zoom inicial
    });
  }*/

  




}
