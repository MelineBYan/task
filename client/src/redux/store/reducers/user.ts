import { ReducerNames } from '../reducerNames';
import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { setUserDataFromLocalStorage, signIn, signUp, updateUserData } from '../../actions';
import { UserInterface } from '../../../core/models/user/user.model';

const userSlice = createSlice<UserInterface, SliceCaseReducers<UserInterface>, ReducerNames.USER>({
    name: ReducerNames.USER,
    initialState: {
        id: '',
        email: '',
    } as UserInterface,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signUp.fulfilled, (state, { payload: { email, id } }) => {
            state = {
                ...state,
                id,
                email,
            };
        });
        builder.addCase(signIn.fulfilled, (state, { payload: { userId } }) => {
            state.id = userId;
        });
        builder.addCase(
            setUserDataFromLocalStorage.fulfilled,
            (state, { payload: { userId, email } }) => {
                state.id = userId;
                state.email = email;
            },
        );
        builder.addCase(updateUserData.fulfilled, (state, { payload }) => {
            state = Object.assign(state, payload);
        });
    },
});

export default userSlice.reducer;
