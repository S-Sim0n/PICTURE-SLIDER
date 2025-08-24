class AddHandleResize{
    private handler?: () => void;
    timeoutId: number | null = null

    constructor(){

    }

    newInit(destroyF:()=>void, initF: ()=>void){
        
        this.handler = ()=>{
            if(this.timeoutId){
                clearTimeout(this.timeoutId)
                this.timeoutId = null
            }
            this.timeoutId = setTimeout(()=>{
                try{
                    destroyF()
                    initF()
                }catch(error){
                    console.warn("error HandleResize ", error);
                }
            },300)
        }
        window.addEventListener('resize',this.handler)
    }

    

    destroy(){
        if(this.handler){
            window.removeEventListener('resize', this.handler);
            this.handler = undefined;
        }
        if(this.timeoutId){
            clearTimeout(this.timeoutId)
            this.timeoutId = null;
        }
    }
}

export {AddHandleResize}