
class CountLoader{
    el: HTMLElement | null = null
    
    constructor(private pictureLength: number){
        
        const countSpan = document.querySelector('.img-length') as HTMLSpanElement;
        if(!countSpan)return;
        this.el = countSpan;

    }

    countProgress(count:number){
        //progress
        const progress = Math.max(count / this.pictureLength, 0.2);
        this.el&&(this.el.style.opacity=`${progress}`)
    }

}
export {CountLoader}