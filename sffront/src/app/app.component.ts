import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { WebsocketService } from './websocket.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sffront';
  constructor(private swUpdate : SwUpdate, private webSocketService : WebsocketService) {

  }

  chartTemperature = [];
  chartHumidity = [];

  ngOnInit(): void {
    if(this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }

    this.chartTemperature = new Chart('temperature', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Temperatura'
        },
      },
      data: {
        labels: ['Jamón', 'Huevo', 'Carne'],
        datasets: [{
            label: 'Mediciones',
            data: [2430, 15600, 365],
            backgroundColor: ["pink", "blue", "red"],
            borderColor: 'black',
            fill: false,
          }],
      }
    });

    this.chartHumidity = new Chart('humidity', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Humedad'
        },
      },
      data: {
        labels: ['Jamón', 'Huevo', 'Carne'],
        datasets: [{
            label: 'Mediciones',
            data: [2430, 15600, 365],
            backgroundColor: ["pink", "blue", "red"],
            borderColor: 'blue',
            fill: false,
          }],
      }
    });

    this.webSocketService.listen('mqtt:temp').subscribe((data) => {
      console.log('Temperaturas: ' + JSON.stringify(data));
      this.updateChartData(this.chartTemperature, data, 0);
    })

    this.webSocketService.listen('mqtt:hum').subscribe((data) => {
      console.log('Humedad: ' + JSON.stringify(data));
      this.updateChartData(this.chartHumidity, data, 0);
    })
  }

  updateChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }
}
