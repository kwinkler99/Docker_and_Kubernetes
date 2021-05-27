import React, { Component }  from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import NotFound from './notFound.js';
import App from './App';
import Form from './Form'



class Home extends Component {

    render(){

        return (
            <div className="Home">
                <Router>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/form" component={Form} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}


export default Home