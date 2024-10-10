
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import  {LngLat, Map, Marker} from 'mapbox-gl';

interface MarkerAndColor{
  color:string;
  marker: Marker;
}

interface PlainMarker{
  color:string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5,40);

  public markers: MarkerAndColor[] = [];

  

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El elemento html no fue encontrado';

      this.map = new Map({
      
      container: this.divMap?.nativeElement, // ID del div en el HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas de inicio [lng, lat]
      zoom: this.zoom // Nivel de zoom inicial
    });

    /*const marker = new Marker().setLngLat(
      this.currentLngLat
    ).*/
    //addTo(this.map);
    this.readFromLocalStorage()
    
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker(){

    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map?.getCenter();
    this.addMarker(lngLat,color)

  }

  addMarker(lnglat: LngLat, color: string){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat(lnglat)
    .addTo(this.map);

    this.markers.push({
      color:color,
      marker:marker
    })

    this.saveToLocalStorage();

    marker.on(
      'dragend',
      ()=> this.saveToLocalStorage()
    );

  }

  deleteMarker(index:number){
    this.markers[index].marker.remove();
    this.markers.splice(index,1);
  }

  flyTo(marker : Marker){
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(({color,marker})=>{
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }


  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({color, lngLat}) =>{
      const [lng, lat ] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords,color)
    })

  }
  

}
