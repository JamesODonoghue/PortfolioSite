

import React from 'react';
// import { Router, Route, IndexRoute} from 'react-router';
import { BrowserRouter, Route, IndexRoute, Switch} from 'react-router-dom';


import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory()

import Layout from './js/pages/Layout';
import Home from './js/pages/Home';


const routes = (
    <BrowserRouter>
        {/* If path is / then load the Home component */}
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default routes;