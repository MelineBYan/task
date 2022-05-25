import React, { useCallback, useMemo, useState } from 'react';
import {  Button, Row, Col, Input, Typography } from 'antd';
import './form-create-workspace.less';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkspace, getAvailableUrls, ReducerNames, RootState } from '../../redux';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

const delayedTimeOfOnChange = 1000;
const FormCreateWorkspace: React.FC = () => {
    const { availableUrl } = useSelector((state: RootState) => state[ReducerNames.WORKSPACE]);
    const { workspaces } = useSelector((state: RootState) => state[ReducerNames.WORKSPACE]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const debouncedChangeHandler = useMemo(
        () =>
            debounce(e => {
                setName(e.target.value);
                e.target.value && dispatch(getAvailableUrls(e.target.value));
            }, delayedTimeOfOnChange),
        [dispatch],
    );
    const onFinish = useCallback(() => {
        dispatch(addWorkspace({ name, url: availableUrl }));
        const id = workspaces.find(({url}) => url === availableUrl )?._id;
        id && navigate(`/workspace/${id}`);
    }, [availableUrl, dispatch, name]);
    return (
        <>
            <Row justify={'start'}>
                <Col flex="50%">
                    <Typography.Title>What’s the name of your company or team?</Typography.Title>
                    <Typography.Paragraph>
                        This will be the name of your Slack workspace — choose something that your
                        team will recognize.
                    </Typography.Paragraph>
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col flex="50%">
                    <Input
                        placeholder={'Workspace Name'}
                        size="large"
                        onChange={debouncedChangeHandler}
                    />
                </Col>
            </Row>
            <Row justify={'start'}>
                <Col flex="50%">
                    <span style={{ color: 'green', margin: '10px 20px' }}>
                        {availableUrl ? `Available subdomain for ${name}  is ${availableUrl}` : ''}
                    </span>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col flex="50%">
                    <Button onClick={onFinish} type="primary">
                        Add workspace
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default FormCreateWorkspace;
