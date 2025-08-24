// types.ts
export interface IHandleScroll {
    lockX: boolean;
    check(e: TouchEvent, deltaX: number, deltaY: number): void;
}

export interface IHandleTranslateTo {
    restX: number;
    check(deltaX: number): void;
    minMaxTranslate(translateTo: number): void;
    setTranslateTo(direction: string): void;
    destroy():void
}

export interface IAnimate {
    currentTranslate: number ;
    translateTo: number ;
    rafId: number|null 
    fpsMs: number; 
    speed: number ;
    dampedDelat:number ;
    dir: number;
    translate: number;
    elWidth: number;
    start():void;
    stop():void;
    destroy():void;
}

export interface ICounter {
    count: number,
    handleCount(direction: string):void
    destroy():void


}