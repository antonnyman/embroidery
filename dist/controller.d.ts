declare type Context = {
    [key: string]: any;
};
export default class Controller {
    private readonly context;
    private dataAttr;
    private targetElements;
    private actionElements;
    private targetsElements;
    private actionsElements;
    private cache;
    constructor(element: Element, context: Context);
    private getKey;
    private updateCache;
    private create;
}
export {};
