declare enum Data {
    Controller = "[data-controller]",
    Partial = "[data-partial]"
}
declare type Callback = (el: Element) => void;
export declare class Embroidery {
    private cache;
    private context;
    static start(): Embroidery;
    start(): Promise<void>;
    register(controller: Element): void;
    discover(callback: Callback, type: Data): void;
    updateCache(element: any, type: any): void;
    initialize(element: HTMLElement): void;
    discoverUninitializedControllers(callback: Callback, parentElement?: Element): void[];
    listenForNewUninitializedControllersAtRuntime(callback: Callback): void;
}
export {};
