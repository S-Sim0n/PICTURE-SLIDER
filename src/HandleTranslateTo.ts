import { bus } from "./Bus";
import type { ICounter } from "./types";
class HandleTranslateTo {
    elWidth: number = 0;
    maxSwipe: number = 0;
    maxTranslate: number = 0;
    pictures: number =0;
    pictureGab: number = 0;
    swipeThreshold : number = 0;

    deltaX: number = 0;
    
    lastTranslate: number = 0;
    translateTo: number = 0;
    restX: number = 0; 

    constructor(private el: HTMLElement, private Counter:ICounter){
        
        bus.on('deltaX',(value)=> this.deltaX = value)
        
        bus.on('lastTranslate',(value)=> this.lastTranslate = value)
        bus.on('restX',(value)=> this.restX = value)
        
        const rect = this.el.getBoundingClientRect();
        this.pictures = document.querySelectorAll('.pictures').length
        this.pictureGab = rect.width*0.025;
        this.elWidth = rect.width  + this.pictureGab ;
        this.maxSwipe = this.elWidth;
        this.maxTranslate = this.elWidth * (this.pictures-1)
        this.swipeThreshold = rect.width * 0.16; // 16%
        
    }
    check(){
        if(Math.abs(this.deltaX) < this.swipeThreshold ){
              
            bus.set('translateTo', this.lastTranslate + this.restX)
             
        }else{
            
            const dir = Math.sign(this.deltaX)
            this.Counter.handleCount(dir<0?'next':'prev')
            this.translateTo = this.lastTranslate + (dir * (this.maxSwipe + dir*this.restX)); // dir dir wichtig :)
            this.minMaxTranslate()   
        }
        
    }

    minMaxTranslate(){
        this.translateTo = Math.max(Math.min(0,this.translateTo),-this.maxTranslate);
        bus.set('translateTo', this.translateTo) 
        bus.set('restX', 0);
        
    }
    
    // clicks
    setTranslateTo(direction:string){
        
        this.translateTo+= direction === 'next'? -this.elWidth: this.elWidth
        this.minMaxTranslate()
    }

    destroy(){
        
    this.elWidth = this.maxSwipe = this.maxTranslate = this.pictures = 0;
    this.pictureGab = this.swipeThreshold = this.lastTranslate = this.translateTo = this.restX = 0;
    
    }
    
}

export {HandleTranslateTo}