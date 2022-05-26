import React, { useCallback } from 'react';
import { Row, Col, Typography, Grid, Button } from 'antd';
import WorkspaceContentTable from '../../components/table-workspace-content/table-workspace-content';
import BaseLayer, { DefaultThemeShadow } from '../../core/base-layer/base-layer';
import SlackOutlined from '@ant-design/icons/SlackOutlined';
import './workspace-content.less';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../routes/routes';

const WorkspaceContent = () => {
    const screen = Grid.useBreakpoint();
    const navigate = useNavigate();
    const layout = screen.xl
        ? '60%'
        : screen.lg
        ? '60%'
        : screen.md
        ? '60%'
        : screen.sm
        ? '60%'
        : screen.xs
        ? '60%'
        : '100%';

    const onAddWorkspaceClick = useCallback(() => {
        navigate(RoutePath.WORKSPACE);
    }, []);
    return (
        <>
            <Row justify={'center'}>
                <Col className="workspaces-content">
                    <Typography.Title level={1}>
                        <SlackOutlined /> <span>slack</span>
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col className="workspaces-content" flex={layout}>
                    <Row justify="center">
                        <Col flex={'30%'}>
                            <Typography.Title
                                level={1}
                                className="workspaces-content-header-text"
                                style={{ textAlign: 'left' }}
                            >
                                Create a new Slack workspace
                            </Typography.Title>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="center">
                <Col className="workspaces-content" flex={layout}>
                    <Row justify={'center'}>
                        <Col flex="30%">
                            <Typography.Paragraph
                                className="workspaces-content-header-text"
                                style={{ textAlign: 'left', fontSize: '20px' }}
                            >
                                Slack gives your team a home – a place where they can talk and work
                                together. To create a new workspace, click on the button below.
                            </Typography.Paragraph>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="center">
                <Col className="workspaces-content" flex={layout}>
                    <Row justify="center">
                        <Col flex="30%">
                            <Typography.Paragraph
                                className="workspaces-content-header-text"
                                style={{ textAlign: 'left', fontSize: '12px' }}
                            >
                                By continuing, you’re agreeing to our customer terms of service,
                                user terms of service, privacy policy and cookie policy.
                            </Typography.Paragraph>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="center">
                <Col className="workspaces-content" flex={layout}>
                    <Row justify="center">
                        <Col>
                            {' '}
                            <Button
                                type="primary"
                                size="large"
                                style={{ fontSize: '18px', fontWeight: '700' }}
                                onClick={onAddWorkspaceClick}
                            >
                                Create Workspace
                                <span>
                                    <ArrowRightOutlined style={{ fontWeight: '700' }} />
                                </span>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <Typography.Title level={3} className="workspaces-content-header-text">
                        Or
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col className="workspaces-content" flex={layout}>
                    <Typography.Title level={3} className="workspaces-content-header-text">
                        Open a workspace
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify="center">
                <Col flex={layout}>
                    <BaseLayer shadow={DefaultThemeShadow.shadow3}>
                        <WorkspaceContentTable />
                    </BaseLayer>
                </Col>
            </Row>
        </>
    );
};

export default WorkspaceContent;
