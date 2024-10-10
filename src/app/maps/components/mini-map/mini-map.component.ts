import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import {Map, Marker} from 'mapbox-gl'

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
  

  @Input() lngLat?:[number,number];
  @ViewChild('map') divMap?:ElementRef;

  ngAfterViewInit(){
    if(!this.divMap?.nativeElement) throw "Map div not found"
    if(!this.lngLat) throw "LngLat can't be null"

    const map = new Map({
      
      container: this.divMap?.nativeElement, // ID del div en el HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: this.lngLat, // Coordenadas de inicio [lng, lat]
      zoom: 15, // Nivel de zoom inicial
      interactive: false
    });

    new Marker().setLngLat(this.lngLat).addTo(map)

  }
  


}
