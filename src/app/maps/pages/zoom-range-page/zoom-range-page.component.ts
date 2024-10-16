import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import  {LngLat, Map} from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  
  
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5,40);

  

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento html no fue encontrado';

      this.map = new Map({
      
      container: this.divMap?.nativeElement, // ID del div en el HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas de inicio [lng, lat]
      zoom: this.zoom // Nivel de zoom inicial
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener(){
    if(!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (env) => {
      this.zoom = this.map!.getZoom()
    });

    this.map.on('zoomend',(env) => {
      if(this.map!.getZoom() < 18) return;

      this.map!.zoomTo(18);
    })

    this.map.on('move',()=> {
      this.currentLngLat = this.map!.getCenter();

    })

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value :string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom) 
  }


}
