import { bus } from "./Bus";
class Animate {
    currentTranslate: number = 0;
    translateTo: number = 0;

    rafId: number|null = null
    fpsMs: number = 0;
    speed: number = 0.97;

    
    dampedDelat:number = 0;
    dir: number = 0
    translate: number = 0
    
    elWidth: number = 0;

    constructor(private el: HTMLElement, fpsMs:number=60){
        this.fpsMs = fpsMs;
        
        bus.on('speed',(value)=> this.speed = value)
        bus.on('translateTo',(value)=> this.translateTo = value);
        bus.on('currentTranslate',(value)=>this.currentTranslate = value)

        const rect=this.el.getBoundingClientRect();
        const gab= rect.width*0.025
        this.elWidth = rect.width+gab
    }

    start(){
        this.stop()
        if(this.currentTranslate === this.translateTo)return
        this.dir = Math.sign(this.translateTo - this.currentTranslate)
        
        this.translate = this.currentTranslate;

        const scaledSpeed = (this.speed * this.elWidth)/  500;
        
        const steps =()=>{
            
            const distance = Math.abs(this.translateTo-this.translate)
            const progressValue= Math.min(1,distance / this.elWidth)
            /* const dampedValue= this.dir*Math.max(Math.pow(progressValue,0.8),0.01) */
            /* const dampedValue = this.dir * Math.max(progressValue * (2 - progressValue), 0.01); */
            const dampedValue = this.dir * Math.max(Math.pow(progressValue * (1.8 - progressValue), 0.80), 0.005);



            this.translate += dampedValue*(scaledSpeed*this.fpsMs) 
            bus.set('restX',this.translateTo-this.translate)
            bus.set('currentTranslate',this.translate)
            
            if(this.dir<0 && this.translate <= this.translateTo || this.dir>0 && this.translate >= this.translateTo){
                this.el.style.transform=`translateX(${this.translateTo}px)`
                bus.set('lastTranslate', this.translateTo)
                bus.set('currentTranslate', this.translateTo)// vll überflüssig obwohl vll wegen return oben
                bus.set('restX',0)
                return
            }
            
            this.el.style.transform=`translateX(${this.translate}px)`;
            this.rafId=requestAnimationFrame(steps)
        }
        
        this.rafId=requestAnimationFrame(steps)
    }

    stop(){
        if(this.rafId){
            cancelAnimationFrame(this.rafId)
            this.rafId = null
        } 
    }

    destroy(){

        if(this.rafId){
            cancelAnimationFrame(this.rafId)
            this.rafId = null
        } 
        this.currentTranslate = this.translateTo = this.fpsMs = this.speed = 0;
        this.dampedDelat = 0;
        this.dir = this.translate = this.elWidth= 0;
        this.el.style.transform=`translateX(${0}px)`;

    }

}

export {Animate}