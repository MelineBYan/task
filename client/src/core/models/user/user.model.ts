import { AuthDataKeys } from '../../../utils/constants';
import { UserStoreDataKeys } from '../../../utils/constants';

export interface UserInterface {
    [UserStoreDataKeys.ID]?: string;
    [UserStoreDataKeys.EMAIL]: string;
}

export interface SignInData {
    [UserStoreDataKeys.EMAIL]: string;
    [UserStoreDataKeys.PASSWORD]: string;
}
export enum SignInPostErrorCodes {
    INVALID_PASSWORD_OR_EMAIL = 'INVALID_PASSWORD_OR_EMAIL',
}
export enum SignupPostErrorCodes {
    EMAIL_EXISTS = 'EMAIL_EXISTS',
}

export interface SignUpData extends UserInterface {
    [UserStoreDataKeys.PASSWORD]: string;
}

export interface AuthData {
    [AuthDataKeys.USER_ID]: string;
    [AuthDataKeys.ACCESS_TOKEN]: string;
}
