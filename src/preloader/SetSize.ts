import { Preloader } from "./Preloader";

interface IpicturesObj{
    medium: string;
    large:string;
    [key: string]: string;
} 

class SetSize{
    pictures: NodeListOf<Element> | null = null; 
    Preloader: Preloader | null = null

    constructor(private picturesObj:IpicturesObj[]){
        if(this.picturesObj.length===0){
            console.warn('pictureObj length: 0')
            return 
        }
        const nodeList = document.querySelectorAll('.pictures')
        if(nodeList.length === 0){
            console.warn('error: pictureTags not found')
            
        }
        if(this.picturesObj.length < nodeList.length){
            console.warn('pictureObj length < pictureTags')
            
        }
        this.pictures = nodeList

        const size = this.check()
        this.setSize(size)
        
        this.Preloader = new Preloader(this.picturesObj,size)
    }

    check():string{
        const size = Math.max(window.innerWidth,window.innerHeight)
        if(size < 1000){
            return'medium'
        }else{
            return'large'
        }
    }

    setSize(size:string){
        this.pictures?.forEach((picture,i)=>{
            if (i >= this.picturesObj.length)return
            const sources = picture.querySelectorAll('source')
            sources.forEach((source)=>{
                const type = source.type;
                if(type=== 'image/avif'){
                    source.srcset = `${this.picturesObj[i][size]}`;
                }; 
            });

        });
    }

    destroy(){
        this.pictures = null;
        this.Preloader?.destroy();
    }

}

export {SetSize}

