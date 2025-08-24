class LoadPage {
    
    overlay: HTMLElement|null = null
    logo: HTMLElement|null = null
    h1: HTMLElement|null = null
    
    
    constructor(){
        const overlay = document.querySelector('.overlay')as HTMLDivElement
        const logo = document.querySelector('.load-page-logo')as HTMLDivElement
        const h1 = document.querySelector('.h1-top')as HTMLDivElement
        if(!overlay)console.warn('overlay wrapper not found')
        if(!logo)console.warn('logo wrapper not found')
        if(!h1)console.warn('h1 wrapper not found')
        this.overlay = overlay
        this.logo = logo
        this.h1 = h1;
        this.setValue()

        window.addEventListener('resize',()=>{
            this.setValue()
        })
    }
    
    setValue(){
        const speedValue = 300;
        const distance = window.innerHeight 
        /* let duration = (speedValue / Math.sqrt(distance)) * 0.15; */
        let duration = (speedValue / Math.log(distance + 1)) * 0.035;
        
        document.documentElement.style.setProperty('--duration', `${duration}s`)

       
        
        
        
        
        //logo
        
        
        const logoWidth =  window.innerWidth >= window.innerHeight ? Math.round(window.innerWidth * 0.025) : Math.round(window.innerWidth * 0.05);
        document.documentElement.style.setProperty('--logo-width', `${logoWidth}px`)
        
        const fontSize = window.innerWidth >= window.innerHeight ? logoWidth * 0.16 : logoWidth * 0.158;
        this.logo?.style.setProperty('--font', `${fontSize}px`)

        document.documentElement.style.setProperty('--scale','4.5');

        
        
        this.h1?.style.setProperty('--delay', `${2.8 }s`)

        //footer 
        const footer= document.querySelector('.footer') as HTMLElement

        
        const footerHeight= footer?.offsetHeight;
        document.documentElement.style.setProperty('--footer-height',`${footerHeight}px`)

        
    }

    
    
}

export {LoadPage}