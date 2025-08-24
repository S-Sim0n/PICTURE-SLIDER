import { bus } from "./Bus";
import type { IAnimate, ICounter, IHandleTranslateTo } from "./types";


class AddClicks{
    prevListener?: (event: MouseEvent)=>void;
    nextListener?: (event: MouseEvent)=>void;
    

    constructor(
        private prev: HTMLElement, 
        private next: HTMLElement, 
        private Animate: IAnimate,
        private Counter: ICounter,
        private HandleTranslateTo: IHandleTranslateTo
    ){
        
        this.init()
    }
    init(){
        this.prevListener=()=>this.handleClicks('prev')
        this.nextListener=()=>this.handleClicks('next')
        
        this.prev.addEventListener('click',this.prevListener);
        this.next.addEventListener('click',this.nextListener);
    }
    handleClicks(direction: 'prev' | 'next'){
        bus.set('speed', 0.97)
        this.Counter.handleCount(direction)
        this.HandleTranslateTo?.setTranslateTo(direction)
        this.Animate.start()
    }

    destroy(){
        if(this.prevListener){
            this.prev.removeEventListener('click',this.prevListener)
        }
        if(this.nextListener){
            this.next.removeEventListener('click',this.nextListener)
        }
        this.HandleTranslateTo?.destroy();
        this.Animate?.destroy();
        this.Counter?.destroy();
    }
}

export {AddClicks}