type BusKey =
  | 'startX' | 'startY' | 'deltaX' | 'deltaY' 
  | 'startTime' |'endTime'| 'deltaTime'
  | 'lastTranslate' | 'translateTo' | 'restX' | 'lockX' | 'pxMs' | 'speed' | 'currentTranslate'| 'dampedDelta'|'animateValue';

class Bus {
    values: Record<BusKey, number> = {
        startX: 0,
        startY: 0,
        deltaX: 0,
        deltaY: 0,
        startTime: 0,
        endTime: 0,
        deltaTime: 0,
        lastTranslate: 0,
        translateTo: 0,
        restX: 0,
        lockX: 0,
        pxMs: 0,
        speed: 0,
        currentTranslate: 0,
        dampedDelta: 0,
        animateValue: 0

    };
    
    listeners: Record<BusKey, ((val: number)=> void)[]> = {
        startX: [],
        startY: [],
        deltaX: [],
        deltaY: [],
        startTime: [],
        endTime: [],
        deltaTime: [],
        lastTranslate: [],
        translateTo: [],
        restX: [],
        lockX: [],
        pxMs: [],
        speed: [],
        currentTranslate: [],
        dampedDelta: [],
        animateValue: []
        

    }

    set(key: BusKey, value: number) {
        this.values[key] = value;
        (this.listeners[key] || []).forEach(fn => fn(value));
    }

    get(key: BusKey): number | undefined {
        return this.values[key];
    }

    on(key: BusKey, fn: (val: number) => void) {
        if (!this.listeners[key]) {
        this.listeners[key] = [];
        }
        this.listeners[key].push(fn);
    }
    
    

    
    
    reset() {
    // Setze ALLE Werte zurück (0 oder null, je nach Bedarf)
    (Object.keys(this.values) as BusKey[]).forEach(key => {
        this.values[key] = 0; // oder null, falls du zwischen "uninitialisiert" unterscheiden möchtest
    });

    // Leere ALLE Listener-Arrays
    (Object.keys(this.listeners) as BusKey[]).forEach(key => {
        this.listeners[key] = [];
    });
    }
}

export const bus = new Bus()