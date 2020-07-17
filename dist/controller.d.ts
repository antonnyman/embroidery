declare type Context = {
    [key: string]: Function;
};
export default class Controller {
    private dataAttr;
    private targetElements;
    private actionElements;
    private cache;
    private context;
    private initCalled;
    constructor(element: Element, context: Context);
    updateCache(elements: NodeList, attr: string): void;
    create(): void;
}
export {};
