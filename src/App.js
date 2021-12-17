import React from 'react';
import { useRoutes } from 'react-router-dom';
import Main from './main/MainPage';
import Login from './login/LoginPage';
import Join from './join/JoinPage';

function App() {
    const routes = useRoutes([
        { path: '/', element: <Main /> },
        { path: '/login', element: <Login /> },
        { path: '/join', element: <Join /> },
    ]);
	
    return routes;
}

export default App;