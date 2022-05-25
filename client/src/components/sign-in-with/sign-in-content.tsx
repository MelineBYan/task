import { Col, Row } from 'antd';
import { Typography, Button } from 'antd';
import { GoogleOutlined, AppleFilled } from '@ant-design/icons';

function SignInWith() {
    return (
        <>
            <Row justify={'center'}>
                <Typography.Paragraph className={'sign-in-content-oauth-text'}>
                    Or
                </Typography.Paragraph>
            </Row>
            <Row>
                <Button block style={{ marginBottom: '10px' }}>
                    <GoogleOutlined />
                    <span>Continue with Google</span>
                </Button>
                <Button block>
                    <AppleFilled />
                    <span>Continue with Apple</span>
                </Button>
            </Row>
        </>
    );
}

export default SignInWith;
