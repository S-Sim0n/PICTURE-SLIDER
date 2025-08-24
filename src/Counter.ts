
class Counter {
    countEl: HTMLElement|null = null
    count: number = 1;
    picturesLength: number = 0;

    prevBtn: HTMLElement | null = null;
    nextBtn: HTMLElement | null = null;

    

    constructor( ){
        const picturesL = document.querySelectorAll('.pictures').length
        if(picturesL === 0){
            console.error('pictures length = 0')
            return
        }
        this.picturesLength = picturesL

        const counterElement = document.querySelector('.counter') as HTMLElement
        if(!counterElement){
            console.error('counterEl not found')
            return
        }
        this.countEl = counterElement

        const prevButton = document.querySelector('.prev') as HTMLButtonElement
        if(prevButton === null){
            console.warn('prev button = null')
        }
        this.prevBtn = prevButton
        this.prevBtn?.classList.add('disable-prev');
        
        const nextButton = document.querySelector('.next') as HTMLButtonElement
        if(prevButton === null){
            console.warn('prev button = null')
        }
        this.nextBtn = nextButton

        
        
    }
    handleCount(direction:'next'|'prev'){
        if(!this.countEl)return

        if(direction === 'next' && this.count < this.picturesLength){
            this.count ++
        }else if (direction === 'prev' && this.count > 1){
            this.count --
        }
        
        this.countEl.textContent=`${this.count}`

        //btns disable
        
        this.prevBtn?.classList.toggle('disable-prev', this.count === 1);  
        this.nextBtn?.classList.toggle('disable-next', this.count >= this.picturesLength);   
    }
    destroy(){
        this.count = 1; 
        if (this.countEl) {
            this.countEl.textContent = '1'; 
        }
        this.countEl = null
    }

}

export {Counter}