import React, { useCallback } from 'react';
import './App.less';
import { unauthorizedPages, authorizedPages } from './routes/routes';
import { Routes, Route } from 'react-router-dom';
import SignInContent from './pages/sign-in-content/sign-in-content';
import { useInit } from './redux/hooks';
import {  Layout } from 'antd';
import { clearAuthInfo, signOut } from './redux';
import { useDispatch } from 'react-redux';
import WorkspaceContent from './pages/workspace-content/workspace-content';

function App() {
    const { authorized } = useInit();
    const dispatch = useDispatch();
    const onLogOutClick = useCallback(() => {
        dispatch(signOut());
        clearAuthInfo();
    }, [dispatch]);
    const tabs = authorizedPages.map(({ key, label, path }) => ({
        tabKey: key,
        tabLabel: label,
        routePath: path,
    }));
    return (
        <Layout>
            <Routes>
                {authorized
                    ? authorizedPages.map(({ path, content, key }) => (
                          <React.Fragment key={key}>
                              <Route path={path} element={content} />
                              <Route path="*" element={<WorkspaceContent />} />
                          </React.Fragment>
                      ))
                    : unauthorizedPages.map(({ path, content, key }) => (
                          <React.Fragment key={key}>
                              <Route path={path} element={content} />
                              <Route path="*" element={<SignInContent />} />
                          </React.Fragment>
                      ))}
            </Routes>
        </Layout>
    );
}

export default App;
