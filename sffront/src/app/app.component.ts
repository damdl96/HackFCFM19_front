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
        datasets: [{
            label: 'Mediciones',
            data: 2300,
            backgroundColor: 'black',
            borderColor: 'blue',
            fill: false,
          }],
      }
    });

    this.chartHumidity = new Chart('humidity', {
      type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Humedad'
        },
      },
      data: {
        datasets: [{
            label: 'Mediciones',
            data: 2300,
            backgroundColor: 'blue',
            borderColor: 'black',
            fill: false,
          }],
      }
    });

    this.webSocketService.listen('mqtt:temp').subscribe((data) => {
      console.log("temperatura: ", data['value']);
      this.updateTemperatureChartData(this.chartTemperature, data['value'], 0);
    })

    this.webSocketService.listen('mqtt:hum').subscribe((data) => {
      console.log("humedad: ", data['value']);
      this.updateHumidityChartData(this.chartHumidity, data['value'], 0);
    })
  }

  updateTemperatureChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }

  updateHumidityChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }
}
