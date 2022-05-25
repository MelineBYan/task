import { getAvailableUrls } from './../../actions/workspace.actions';
import { createSlice } from '@reduxjs/toolkit';
import { ReducerNames } from '../reducerNames';
import { addWorkspace, getWorkspaces, editWorkspace, deleteWorkspace } from '../../actions';
import { WorkspaceData } from '../../../core/models/workspace/workspace.model';

const workspace = createSlice({
    name: ReducerNames.WORKSPACE,
    initialState: {
        workspaces: [] as WorkspaceData[],
        availableUrl: "",
        revalidate: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addWorkspace.rejected, state => {
            state.revalidate = false;
        });
        builder.addCase(addWorkspace.fulfilled, state => {
            state.revalidate = true;
        });
        builder.addCase(getWorkspaces.fulfilled, (state, { payload: { data } }) => {
            state.workspaces = data;
            state.revalidate = false;
        });
        builder.addCase(editWorkspace.fulfilled, state => {
            state.revalidate = true;
        });
        builder.addCase(deleteWorkspace.fulfilled, state => {
            state.revalidate = true;
        });
        builder.addCase(getAvailableUrls.fulfilled, (state, { payload: { data } }) => {
            state.availableUrl =  data;
            state.revalidate = true;
        });
    },
});

export default workspace.reducer;
