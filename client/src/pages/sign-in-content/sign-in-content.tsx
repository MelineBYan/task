import React, { useEffect } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import { SlackOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../routes/routes';
import { BaseContent } from '../../core/base-content/base-content';
import { useForm } from 'antd/es/form/Form';
import SignInWith from '../../components/sign-in-with/sign-in-content';
import Password from 'antd/es/input/Password';
import { FormNames, UserStoreDataKeys } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, ReducerNames } from '../../redux';
import { clearEmailError, clearPasswordError } from '../../redux/store/reducers/auth';

export const SignInContent: React.FC = () => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const { passwordErrorText } = useSelector((state: RootState) => state[ReducerNames.AUTH]);
    useEffect(() => {
        return () => {
            dispatch(clearEmailError());
            dispatch(clearPasswordError());
        };
    }, [dispatch]);
    return (
        <BaseContent
            headContent={
                <>
                    <Typography.Title level={1} style={{ textAlign: 'center' }}>
                        <SlackOutlined /> <span>slack</span>
                    </Typography.Title>
                    <Typography.Title level={1}>
                        First of all, enter your email address
                    </Typography.Title>
                    <Typography.Paragraph className={'sign-in-content-sign-up-text'}>
                        We suggest using the email account that you use for work.
                    </Typography.Paragraph>
                </>
            }
        >
            <Form name={FormNames.SIGN_IN} className="sign-in-content-form" form={form}>
                <Form.Item
                    name={UserStoreDataKeys.EMAIL}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your email',
                        },
                    ]}
                >
                    <Input placeholder={'Your email'} />
                </Form.Item>
                <Form.Item
                    extra={
                        passwordErrorText ? (
                            <Typography.Paragraph
                                style={{
                                    fontSize: '12px',
                                    lineHeight: '16px',
                                    color: 'red',
                                }}
                            >
                                {passwordErrorText}
                            </Typography.Paragraph>
                        ) : (
                            'Password must contain numbers, A-Z and a-z letters and consist of at least 6 characters.'
                        )
                    }
                    name={UserStoreDataKeys.PASSWORD}
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password',
                        },
                    ]}
                >
                    <Password
                        placeholder={'Password'}
                        iconRender={visible =>
                            visible ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined className={'sign-in-content-password-icon'} />
                            )
                        }
                    />
                </Form.Item>
            </Form>
            <Typography.Paragraph className={'sign-in-content-sign-up-text'}>
                Don&apos;t have an account? <Link to={RoutePath.SIGNUP}>Sign Up</Link>
            </Typography.Paragraph>
            <Button
                block
                type={'primary'}
                className={'sign-in-content-button'}
                htmlType={'submit'}
                form={FormNames.SIGN_IN}
            >
                Continue
            </Button>
            <br />
            <SignInWith />
        </BaseContent>
    );
};

export default SignInContent;
