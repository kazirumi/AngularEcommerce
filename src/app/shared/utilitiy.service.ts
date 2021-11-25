import { Injectable } from '@angular/core';
import { isNull, isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UtilitiyService {

  constructor() { }

  
    public getImage=(Image:string)=>{
        
        if(isNull(Image) || Image =="")
        return `/assets/img/upload.png`;
        else
        return `https://localhost:44386/${Image}`;
      }
}

