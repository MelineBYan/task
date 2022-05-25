import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerNames } from '../reducerNames';
import { AuthData } from '../../../core/models/user/user.model';
import { AuthDataKeys, AuthResult } from '../../../utils/constants';
import { PayloadInterface, signIn, signUp } from '../../actions';
import { SignInPostErrorCodes, SignupPostErrorCodes } from '../../../core/models/user/user.model';

const authSlice = createSlice({
    name: ReducerNames.AUTH,
    initialState: {
        accessToken: '',
        pending: false,
        result: AuthResult.NONE,
        emailErrorText: '',
        passwordErrorText: '',
    },
    reducers: {
        clearEmailError: {
            reducer: state => {
                state.emailErrorText = '';
            },
            prepare: () => {
                return {
                    payload: {},
                };
            },
        },
        clearPasswordError: {
            reducer: state => {
                state.passwordErrorText = '';
            },
            prepare: () => {
                return {
                    payload: {},
                };
            },
        },
        signOut: {
            reducer: state => {
                state.result = AuthResult.ERROR;
                state.accessToken = '';
            },
            prepare: () => {
                return {
                    payload: {},
                };
            },
        },
        saveAuthTokens: {
            reducer: (
                state,
                { payload: { accessToken } }: PayloadAction<Omit<AuthData, AuthDataKeys.USER_ID>>,
            ) => {
                state.accessToken = accessToken;
            },
            prepare: ({ accessToken }: Omit<AuthData, AuthDataKeys.USER_ID>) => {
                return {
                    payload: {
                        accessToken,
                    },
                };
            },
        },
        successAuth: state => {
            state.result = AuthResult.SUCCESS;
        },
        failAuth: state => {
            state.result = AuthResult.ERROR;
        },
    },
    extraReducers: builder => {
        builder.addCase(signUp.pending, state => {
            state.pending = true;
        });
        builder.addCase(signUp.fulfilled, (state, { payload: { accessToken } }) => {
            state.pending = false;
            state.result = AuthResult.SUCCESS;
            state.accessToken = accessToken;
        });
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        builder.addCase(signUp.rejected, (state, data: any & { payload: PayloadInterface }) => {
            const { payload } = data;
            switch (payload?.message) {
                case SignupPostErrorCodes.EMAIL_EXISTS: {
                    state.emailErrorText = 'User is already registered';
                    break;
                }
            }
            state.pending = false;
            state.result = AuthResult.ERROR;
        });

        builder.addCase(signIn.pending, state => {
            state.pending = true;
        });
        builder.addCase(signIn.fulfilled, (state, { payload: { accessToken } }) => {
            state.pending = false;
            state.result = AuthResult.SUCCESS;
            state.accessToken = accessToken;
        });
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        builder.addCase(signIn.rejected, (state, data: any & { payload: PayloadInterface }) => {
            const { payload } = data;
            switch (payload?.message) {
                case SignInPostErrorCodes.INVALID_PASSWORD_OR_EMAIL: {
                    state.passwordErrorText = 'Incorrect password. Please try again.';
                    break;
                }
            }
            state.pending = false;
            state.result = AuthResult.ERROR;
        });
    },
});

export const {
    clearEmailError,
    clearPasswordError,
    saveAuthTokens,
    successAuth,
    failAuth,
    signOut,
} = authSlice.actions;
export default authSlice.reducer;
