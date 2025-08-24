import { bus } from "./Bus";
import { HandleTranslateTo } from "./HandleTranslateTo";
import { CalcSpeed } from "./CalcSpeed";
import type { IAnimate } from "./types";
class AddTouchEnd{
    private endHandler?: (e: TouchEvent) => void;
    private cancelHandler?: (e: TouchEvent) => void;
   
    private calcSpeed : CalcSpeed|null
    
    
    startTime: number = 0;

    endTime: number = 0;
    deltaTime: number = 0;

    constructor(private el: HTMLElement, private Animate: IAnimate, private HandleTranslateTo : HandleTranslateTo ){
        bus.on('startTime',(value)=> this.startTime = value);

        
        this.calcSpeed = new CalcSpeed()
        
        this.touchEnd(el)

    }

    touchEnd(el:HTMLElement){
        this.endHandler = ()=>this.handleEnd();
        this.cancelHandler = ()=>this.handleEnd();
        el.addEventListener('touchend',this.endHandler);
        el.addEventListener('touchcancel',this.cancelHandler);
    }

    handleEnd(){
        this.endTime = performance.now()
        this.deltaTime = this.endTime - this.startTime;
        bus.set('deltaTime',this.deltaTime);
        this.calcSpeed?.calc();
        
        this.HandleTranslateTo?.check();

        this.Animate?.start()
        
        bus.set('lockX',0);
    }

    destroy(){
        if(this.el){
            this.endHandler && this.el.removeEventListener('touchend', this.endHandler);
            this.cancelHandler && this.el.removeEventListener('touchcancel', this.cancelHandler);
        }
        if(this.HandleTranslateTo){
            this.HandleTranslateTo.destroy;
            
        }
        
        this.startTime = this.endTime = this.deltaTime = 0;
    }

}

export {AddTouchEnd}