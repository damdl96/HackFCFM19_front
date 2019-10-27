import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sffront';
  constructor(private swUpdate : SwUpdate, private webSocketService : WebsocketService) {

  }
  ngOnInit(): void {
    if(this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }

    this.webSocketService.listen('http:temp').subscribe((data) => {
      console.log('Temperaturas: ' + JSON.stringify(data));
    })

    this.webSocketService.listen('http:hum').subscribe((data) => {
      console.log('Humedad: ' + JSON.stringify(data));
    })

  }
}
