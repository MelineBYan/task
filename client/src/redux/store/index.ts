import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import workspaceReducer from './reducers/workspace';
import { ReducerNames } from './reducerNames';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        [ReducerNames.AUTH]: authReducer,
        [ReducerNames.USER]: userReducer,
        [ReducerNames.WORKSPACE]: workspaceReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
