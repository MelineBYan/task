import React, { useCallback } from 'react';
import { Form } from 'antd';
import { FormFinishInfo } from 'rc-field-form/lib/FormContext';
import { FormNames } from '../../utils/constants';
import { signIn, signUp } from '../../redux/actions';
import { SignInData, SignUpData } from '../../core/models/user/user.model';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../routes/routes';

/* eslint-disable-next-line */
export interface FormProviderProps {}

export const FormProvider: React.FC<FormProviderProps> = props => {
 const navigate = useNavigate();
 const navigateHome = useCallback(() => {
    navigate(RoutePath.WORKSPACE_CREATE);
}, [navigate]);
    const { children } = props;
    const dispatch = useDispatch();
    const onFormFinish = (name: string, { forms, values }: FormFinishInfo) => {
        switch (name as string) {
            case FormNames.SIGN_IN: {
                dispatch(signIn({...values, navigateHome} as SignInData & {navigateHome: ()=> void}));
                break;
            }
            case FormNames.SIGN_UP: {
                dispatch(
                    signUp({...values, navigateHome}  as SignUpData  & {navigateHome: ()=> void}),
                );
                break;
            }
        }
    };
    return <Form.Provider onFormFinish={onFormFinish}>{children}</Form.Provider>;
};

export default FormProvider;

