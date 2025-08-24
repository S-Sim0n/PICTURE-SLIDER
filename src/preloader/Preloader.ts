import { CountLoader } from "../CountLoader";

interface IpicturesObj{
    medium: string;
    large:string;
    [key: string]: string;
} 

class Preloader{
    counter: number = 0
    
    CountLoader : CountLoader | null = null

    constructor(private pictureObj:IpicturesObj[], private size:string){
        this.preload()

        const picturesL = document.querySelectorAll('.pictures').length
        
        if(picturesL === 0){
            console.error('pictures length = 0')
            return
        }
        this.CountLoader = new CountLoader (picturesL)
        
    }

    

    preload(){
        this.pictureObj.forEach((picture)=>{
            const img = new Image()
            img.onload=()=>{
                img.decode().then(()=>{
                    
                    this.handleCounter()
                }).catch(()=>{
                    
                    console.warn(`decode error : ${picture[this.size]}`)
                    this.handleCounter()
                })
            }
            img.onerror=()=>{
                
                console.warn(`load error : ${picture[this.size]}`)
                this.handleCounter()
            }
            img.src = picture[this.size]
        })
        
    }
    handleCounter(){
        if (++this.counter === this.pictureObj.length) {
            
            console.log("Preload finished");
        }
        this.CountLoader?.countProgress(this.counter)
    }

    destroy(){
        this.counter = 0;
        this.CountLoader&&(this.CountLoader = null)
    }
}

export {Preloader}
