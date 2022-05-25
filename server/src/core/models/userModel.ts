export interface UserInterface {
    id?: string;
    email: string;
    token: string;
    validPassword?: (pass: string) => boolean;
}

export class UserData implements UserInterface {
    constructor(public id = '', public email = '', public token = '') {}
}
