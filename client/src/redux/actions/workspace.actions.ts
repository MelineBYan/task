import { WorkspaceData } from '../../core/models/workspace/workspace.model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addWorkspace = createAsyncThunk(
    'workspace/add',
    async ({ name, url, project }: WorkspaceData) => {
        const {
            data: { data },
        } = await axios.post('workspace', {
            name,
            url,
            project,
        });
        return {
            data,
        };
    },
);

export const editWorkspace = createAsyncThunk(
    'workspace/edit',
    async ({ _id, name, url, project }: WorkspaceData) => {
        const {
            data: { data },
        } = await axios.put(`workspace/${_id}`, {
            _id,
            name,
            url,
            project,
        });
        return {
            data,
        };
    },
);

export const deleteWorkspace = createAsyncThunk('workspace/delete', async (id: string) => {
    const {
        data: { data },
    } = await axios.delete(`workspace/${id}`);
    return {
        data,
    };
});

export const getWorkspaces = createAsyncThunk('workspace/get', async () => {
    const {
        data: { data },
    } = await axios.get('workspace');
    return {
        data,
    };
});

export const getWorkspace = createAsyncThunk(
    'workspace/get-single',
    async (workspaceId: string) => {
        const {
            data: { data },
        } = await axios.get(`workspace/${workspaceId}`);
        return {
            data,
        };
    },
);
export const getAvailableUrls = createAsyncThunk(
    'workspace/available-urls',
    async (workspaceName: string) => {
        const {
            data: { data },
        } = await axios.get(`url/available/${workspaceName}`);
        return {
            data,
        };
    },
);
