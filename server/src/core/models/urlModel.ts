export interface IUrl {
    id?: string;
    name: string;
}

export class UrlData implements IUrl {
    constructor(public id = '', public name = '') {}
}
