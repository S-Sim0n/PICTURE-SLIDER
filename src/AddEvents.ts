import { bus } from "./Bus";
import { Animate } from "./Animate";
import { AddTouchStart } from "./AddTouchStart"
import { AddTouchMove } from "./AddTouchMove"
import { AddTouchEnd } from "./AddTouchEnd";
import { AddClicks } from "./AddClicks";
import { Counter } from "./Counter";
import { HandleTranslateTo } from "./HandleTranslateTo";
import { CheckFps } from "./CheckFps";
import { SetSize } from "./preloader/SetSize";
import { AddHandleResize } from "./AddHandleResize";


class AddEvents{
    
    AddTouchStart: AddTouchStart | null = null;
    AddTouchMove: AddTouchMove | null = null;
    AddTouchEnd: AddTouchEnd | null = null;
    AddClicks: AddClicks | null = null;
    AddHandleResize: AddHandleResize | null = null
    Animate?: Animate | null = null;
    Counter?: Counter | null = null;
    CheckFps?: CheckFps | null = null;
    SetSize?: SetSize | null = null;

    
    HandleTranslateTo:HandleTranslateTo|null = null


    constructor( private el: HTMLElement, private prevBtn:HTMLElement, private nextBtn:HTMLElement){
        
        if (!this.el) {
            console.warn('Slider wrapper element not found - touch events disabled');
            return
        } 
        this.initPreloader()

        this.CheckFps = new CheckFps()
        this.CheckFps.check().then((value)=>{
            this.init(value)  
        }).catch(()=>{
            this.init(16.666666666666668)
        })
           
    }

    init(value:number){
        this.Animate = new Animate(this.el, value)
        this.AddTouchStart = new AddTouchStart(this.el, this.Animate)
        this.AddTouchMove = new AddTouchMove(this.el)
        this.Counter = new Counter()
        this.HandleTranslateTo = new HandleTranslateTo(this.el, this.Counter)
        this.AddTouchEnd = new AddTouchEnd(this.el, this.Animate, this.HandleTranslateTo)
        this.AddClicks = new AddClicks(this.prevBtn, this.nextBtn, this.Animate, this.Counter, this.HandleTranslateTo)
        this.AddHandleResize = new AddHandleResize ()
        this.AddHandleResize.newInit(()=>this.destroy(),()=>this.init(value))
        
    }

    initPreloader(){
        const pictureObj=[
            {medium:'./1-medium.avif', large: './1-large.avif'},
            {medium:'./2-medium.avif', large: './2-large.avif'},
            {medium:'./3-medium.avif', large: './3-large.avif'},
            {medium:'./1-medium.avif', large: './1-large.avif'},
            {medium:'./2-medium.avif', large: './2-large.avif'},
            {medium:'./3-medium.avif', large: './3-large.avif'}  
        ]
        this.SetSize = new SetSize(pictureObj) 
    }
    

    destroy(){
        
        this.AddTouchStart?.destroy()
        this.AddTouchMove?.destroy()
        this.AddTouchEnd?.destroy()
        this.AddClicks?.destroy()

        this.Animate?.destroy();
        this.Counter?.destroy();
        this.CheckFps?.destroy();
        this.SetSize?.destroy();

        bus.reset()

        this.AddTouchStart = null;
        this.AddTouchMove = null;
        this.AddTouchEnd = null;
        this.AddClicks = null;

        this.Animate = null;
        this.Counter = null;
        this.CheckFps = null;
        this.SetSize = null;
        
    }
}
export {AddEvents}