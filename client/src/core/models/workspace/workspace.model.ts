export enum WorkspaceDataKeys {
    ID = '_id',
    NAME = 'name',
    URL = 'url',
    PROJECT = 'project',
    CREATED_BY_USER_ID = 'createdByUserId',
}

export interface WorkspaceData {
    [WorkspaceDataKeys.ID]?: string;
    [WorkspaceDataKeys.NAME]: string;
    [WorkspaceDataKeys.URL]?: string;
    [WorkspaceDataKeys.PROJECT]?: string;
    [WorkspaceDataKeys.CREATED_BY_USER_ID]?: string;
}
