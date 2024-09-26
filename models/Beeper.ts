
import {Status}from './status'

export interface Beeper{
  id:string
  name:string;
  status:Status;
  created_at?: Date;
  DateExplosion?:Date;
  Longitude?:number;
  Latitude?:number;

 }



