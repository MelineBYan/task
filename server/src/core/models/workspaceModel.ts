export interface IWorkspace {
    id?: string;
    name: string;
    url: string;
    project?: string;
    createdByUserId: string;
    users: string[];
}

export class WorkspaceData implements IWorkspace {
    constructor(
        public id = '',
        public name = '',
        public url = '',
        public project = '',
        public createdByUserId = '',
        public users = [],
    ) {}
}
