class Clock {
    private hoursEl: HTMLSpanElement | null = null;
    minutesEl: HTMLSpanElement | null = null;
    
    hours: string = '00';
    minutes:  string = '00';

    intervalId: number | null = null;
    constructor(){
        const hoursSpan= document.querySelector('.hours') as HTMLSpanElement
        if(!hoursSpan)return
        this.hoursEl = hoursSpan; 

        const minutesSpan= document.querySelector('.minutes') as HTMLSpanElement
        if(!minutesSpan)return
        this.minutesEl = minutesSpan;
        
        this.updateTime();
    }
    
    updateTime(){
        if(this.intervalId)return;
        this.intervalId = setInterval(()=>{
            this.setTime()
        },1000)
        this.setTime()
    }
    
    setTime(){
        const newDate= new Date();
        this.hours = newDate.getHours().toString().padStart(2,'0');
        this.minutes = newDate.getMinutes().toString().padStart(2,'0');

        this.hoursEl!.textContent=this.hours;
        this.minutesEl!.textContent=this.minutes;
    }
    destroy(){
        if(this.intervalId){
            clearInterval(this.intervalId)
            this.intervalId = null
        }
        this.hoursEl = null;
        this.minutesEl = null;
        
    }
}

export {Clock}