class CheckFps{
    fps: number = 0;
    fpMs: number = 0;
    rafId: number|null = null

    frameValues:number[]=[]
    constructor(){
        
    }

    check():Promise<number>{
        let lastTime=0
        let counter=0
        return new Promise((resolve)=>{

            const raf = (timeStamp:number)=>{
                const now = timeStamp;
                if(lastTime === 0){
                    lastTime = timeStamp
                }else{
                    const frameTime = now-lastTime
                    this.frameValues.push(frameTime)
                }
                lastTime=now
                counter+=1
                if(counter<60){
                    this.rafId = requestAnimationFrame(raf)
                    
                }else{
                    resolve(this.calcFps())   
                }
            }
            this.rafId = requestAnimationFrame(raf)

        });
        
    };

    calcFps(){
        const sum = this.frameValues.reduce((acc, curr)=> acc + curr, 0)
        
        //average
        const average = sum / this.frameValues.length;
        this.fps  = Math.round(1000 / average);
        

        if (this.fps > 90) {
            this.fps = 120; 
        } else if (this.fps > 45) {
            this.fps = 60; 
        } else{
            this.fps = 30; 
        }
            
        return this.fpMs = 1000 / this.fps 
    }

    destroy(){
        if(this.rafId){
            cancelAnimationFrame(this.rafId)
            this.rafId = null
        }
        this.fps = this.fpMs = 0;
        this.frameValues = []

    }
}

export {CheckFps}
