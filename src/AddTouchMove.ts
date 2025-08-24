import { HandleScroll } from "./HandleScroll";
import { bus } from "./Bus";
class AddTouchMove{
    startX :number = 0;
    startY :number = 0;
    x: number = 0;
    y: number = 0;

    lockX: number = 0;
    restX: number = 0;

    
    lastTranslate: number = 0;
    translate: number = 0;
   
    private handleScroll: HandleScroll
    private handler?: (e: TouchEvent) => void;
    

    deltaX: number = 0;
    deltaY: number = 0;

    constructor( private el: HTMLElement){

        bus.on('startX',(value)=>this.startX = value);
        bus.on('startY',(value)=>this.startY = value);
        bus.on('lockX', (value)=>this.lockX = value);
        
        bus.on('restX',(value)=>this.restX = value);
        bus.on('lastTranslate', (value)=>this.lastTranslate = value)
        
        this.touchMove()
        this.handleScroll = new HandleScroll(this.el)
   
    }

    touchMove(){
        this.handler=(e:TouchEvent)=>{
            
            this.x = e.touches[0].clientX;
            this.y = e.touches[0].clientY;
            this.deltaX = this.x-this.startX
            this.deltaY = this.y-this.startY
            bus.set('deltaX',this.deltaX)
            bus.set('deltaY',this.deltaY)
            const dir = Math.sign(this.deltaX) 
            /* handleScroll */
            this.handleScroll.check(e)
            
            if(this.lockX === 1)return

            if(this.restX === 0){
                if(Math.abs(this.deltaX) <10 )return
                this.deltaX = dir * (Math.abs(this.deltaX) - 10); 
            }

            const smoothDeltaX=Math.pow(Math.abs(this.deltaX), 0.8)

            this.translate = this.lastTranslate + (dir * smoothDeltaX);
            this.el.style.transform = `translateX(${this.translate}px)`;
            bus.set('currentTranslate', this.translate ); // Nur einmal setzen
            
            this.deltaX = 0;
        }
        
        this.el.addEventListener('touchmove',this.handler)
    }

    destroy(){
        if(this.handler){
            this.el.removeEventListener('touchmove',this.handler);
            this.handler = undefined;
        }
        if(this.handleScroll){
            this.handleScroll.destroy()
        }

        this.x = this.y = this.deltaX = this.deltaY = 0;
    }
}

export {AddTouchMove}