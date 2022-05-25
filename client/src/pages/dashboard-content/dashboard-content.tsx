import React, { useMemo, } from 'react';
import {  Layout, Menu, Typography } from 'antd';
import './dashboard-content.less';
import { Header } from 'antd/lib/layout/layout';
import FormCreateWorkspace from '../../components/form-create-workspace/form-create-workspace';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, ReducerNames } from '../../redux';

const { Sider, Content } = Layout;
const Dashboard: React.FC = () => {
  const {id} = useParams();
  const { workspaces } = useSelector((state: RootState) => state[ReducerNames.WORKSPACE]);
  const workspace = useMemo(()=> {
return workspaces.find(({_id})=> _id === id);
  }, []);
    return (
        <Layout>
            <Sider
                trigger={null}
                className="dashboard-sidebar"
                style={{ backgroundColor: '#350d36' }}
            >
                <div className="logo" />
                <Menu mode="inline" defaultSelectedKeys={['1']}></Menu>
            </Sider>
            <Layout className="dashboard">
                <Header className="header" style={{ backgroundColor: '#350d36', padding: '0' }}>
                    <Menu mode="horizontal" />
                </Header>
                <Content
                    className="dashboard-content"
                    style={{
                        padding: 40,
                        minHeight: 800,
                    }}
                >
                   { id ? <Typography.Title>{`Welcome to  ${workspace?.name}`}</Typography.Title> : <FormCreateWorkspace />}
                </Content>
            </Layout>
        </Layout>
    );
};
export default Dashboard;