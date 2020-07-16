declare enum Data {
    Controller = "[data-controller]",
    Partial = "[data-partial]"
}
declare type Callback = (el: Element) => void;
export declare class Embroidery {
    private cache;
    private context;
    static start(): Embroidery;
    constructor();
    start(): Promise<void>;
    register(controller: any): void;
    discover(callback: Callback, type: Data): void;
    updateCache(element: any, type: any): void;
    initialize(e: Element): void;
    discoverUninitializedControllers(callback: Callback, parentElement?: Element): void[];
    listenForNewUninitializedControllersAtRuntime(callback: Callback): void;
}
export {};
