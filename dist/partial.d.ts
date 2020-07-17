export default class Partial {
    private dataAttr;
    private element;
    constructor(element: Element);
    create(): Promise<void>;
}
