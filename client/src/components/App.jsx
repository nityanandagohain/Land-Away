import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';
import Navigation from './navigation/navigation';

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <div className="container" >

                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/register' exact component={Register} />
                    <Route path='/dashboard' exact component={Dashboard} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;