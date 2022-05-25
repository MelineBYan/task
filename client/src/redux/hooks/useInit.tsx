import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { ReducerNames } from '../store/reducerNames';
import { AuthDataKeys, AuthResult } from '../../utils/constants';
import { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { getWorkspaces, setUserDataFromLocalStorage, updateUserData } from '../actions';

export const useInit = () => {
    const dispatch = useDispatch();
    const { result } = useSelector((state: RootState) => state[ReducerNames.AUTH]);
    const { revalidate: workspaceRevalidate } = useSelector(
        (state: RootState) => state[ReducerNames.WORKSPACE],
    );

    const { decodedToken, isExpired }: { decodedToken: any; isExpired: boolean } = useJwt(
        localStorage.getItem(AuthDataKeys.ACCESS_TOKEN) || '',
    );
    const authorized =
        (result === AuthResult.SUCCESS && !isExpired) ||
        (result === AuthResult.NONE &&
            !!localStorage.getItem(AuthDataKeys.ACCESS_TOKEN) &&
            !isExpired);
    useEffect(() => {
        if (authorized) {
            dispatch(setUserDataFromLocalStorage());
            dispatch(getWorkspaces());
        }
    }, [authorized, dispatch]);

    useEffect(() => {
        if (workspaceRevalidate) {
            dispatch(getWorkspaces());
        }
    }, [dispatch, workspaceRevalidate]);

    useEffect(() => {
        if (result === AuthResult.SUCCESS) {
            dispatch(updateUserData());
        }
    }, [dispatch, result]);
    return {
        authorized,
        decodedToken,
    };
};
