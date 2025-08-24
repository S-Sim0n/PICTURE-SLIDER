import { bus } from "./Bus";
class HandleScroll{
     
    lockX: number = 0

    deltaX: number = 0;
    deltaY: number = 0;

    constructor(private el: HTMLElement  ){
        bus.on('deltaX',(val)=> this.deltaX = val);
        bus.on('deltaY',(val)=> this.deltaY = val);
        bus.on('lockX', (val) => this.lockX = val);

    }

    check(e: TouchEvent){
        const absDx = Math.abs(this.deltaX);
        const absDy = Math.abs(this.deltaY);

        
        if(absDx > absDy){
            e.preventDefault()
            this.el.classList.add('lock-y')
        }else if( absDy > 10 && absDy > absDx){
            bus.set('lockX',1)
            this.el.classList.remove('lock-y')
        }
    }

    destroy(){
        this.lockX = 0;
        this.el.classList.remove('lock-y')
    }
}

export {HandleScroll}