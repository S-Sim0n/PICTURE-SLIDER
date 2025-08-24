import { bus } from "./Bus";
import type { IAnimate } from "./types";
class AddTouchStart{
    currentTranslate: number = 0;
    
    x: number = 0;
    y: number = 0;
    startTime: number = 0;
    
    private handler?: (e: TouchEvent) => void;

    constructor(private el: HTMLElement, private animate:IAnimate){
        if (!this.el) {
            console.error('Element is null!');
            return;
        }
        bus.on('currentTranslate',(value=>this.currentTranslate = value))
        this.touchStart(el)  
             
    }

    touchStart(el:HTMLElement){
        this.handler=(e:TouchEvent)=>{
            this.startTime = performance.now()
            this.x = e.touches[0].clientX
            this.y = e.touches[0].clientY
            
            bus.set('startX', this.x);
            bus.set('deltaX', 0);
            
            bus.set('startY', this.y);
            bus.set('startTime', this.startTime);

            bus.set('lastTranslate',this.currentTranslate)
            this.animate.stop()
        
        };
        el.addEventListener('touchstart',this.handler)
        
    }

    

    destroy(){
        if(this.handler){
            this.el.removeEventListener('touchstart',this.handler);
            this.handler = undefined;
        }

        this.x = this.y = this.startTime = 0
    }

}

export {AddTouchStart}