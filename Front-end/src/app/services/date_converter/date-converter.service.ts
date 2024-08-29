import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  // converts given mysql date to an angular date object
  mysqlToAngular(date: string): Date{
    return new Date(date.replace(' ', 'T'));
  }

  // converts given angular date object to mysql string
  angularToMysql(date: Date){
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

}
