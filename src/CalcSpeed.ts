 import { bus } from "./Bus"
 class CalcSpeed{

   deltaX: number = 0
   deltaTime: number = 0;
   pxMs: number = 0;
   clampedPxMs: number = 0;

   constructor(){

      bus.on('deltaX',(value)=>this.deltaX = value)
      bus.on('deltaTime',(value)=>this.deltaTime = value)
   }
   calc(){
      this.pxMs = this.deltaX / this.deltaTime;
      this.clampedPxMs = Math.max(Math.min(Math.abs(this.pxMs),1.3), 0.8) 
      bus.set('speed', this.clampedPxMs)
   }

   destroy(){
      this.deltaX = this.deltaTime = this.pxMs = this.clampedPxMs = 0
      
   }
 }

 export {CalcSpeed}