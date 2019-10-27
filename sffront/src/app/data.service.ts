import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class DataService {

    constructor(private socket: Socket) {

    }

    getTemperature() {

    }

    getHumidity() {

    }
}