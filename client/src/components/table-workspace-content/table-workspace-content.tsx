import { Table, Space, Button, Typography } from 'antd';
import {  useSelector } from 'react-redux';
import { ReducerNames, RootState } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import './table-workspace-content.less';
import React, { useCallback } from 'react';

export default () => {
    const { workspaces } = useSelector((state: RootState) => state[ReducerNames.WORKSPACE]);
    const navigate = useNavigate();
    const data = workspaces.map(({ name, _id }) => ({
        key: _id,
        name,
        workspaceId: _id,
    }));

    const onOpenClick = useCallback(
        (workspaceId:string) => {
            navigate(`/workspace/${workspaceId}`);
        },
        [navigate],
    );
    const columns = [
        {
            title: <Typography.Paragraph className="table-title">Workspace</Typography.Paragraph>,
            dataIndex: 'name',
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: <Typography.Paragraph className="table-title">Actions</Typography.Paragraph>,
            dataIndex: 'workspaceId',
            render: (workspaceId: string) => {
                return (
                    <div className="workspaces-item-action">
                        <Space size="middle">
                            <Button
                                type="ghost"
                                className="workspaces-item-action-button"
                                onClick={() => onOpenClick(workspaceId)}
                            >
                                Open
                            </Button>
                            <ArrowRightOutlined className="workspaces-item-action-button-icon" />
                        </Space>
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <Table
                className="table"
                columns={columns}
                dataSource={data}
                pagination={false}
                rowClassName="table-row"
            />
        </>
    );
};
