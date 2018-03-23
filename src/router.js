

import React from 'react';
// import { Router, Route, IndexRoute} from 'react-router';
import { BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';


import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory()

import Layout from './js/pages/Layout';
import Home from './js/pages/Home';
import Health from './js/pages/Health';
import Spotify from './js/pages/Spotify';


const routes = (
    <BrowserRouter>
        {/* If path is / then load the Home component */}
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/health" component={Health} />
                <Route path="/spotify" component={Spotify} />
                
                
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default routes;