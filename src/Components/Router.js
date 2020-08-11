import React from "react";
import {HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from '../Routes/Home';
import Search from '../Routes/Search';
import TV from '../Routes/TV';
import Detail from '../Routes/Detail';
import Header from "./Header";

export default () => (
    <Router>
        <Header/>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={Search} />
            <Route path="/tv" exact component={TV} />
            <Route path="/movie/:id" component={Detail} />
            <Route path="/show/:id" component={Detail} />
            <Redirect from="*" to="/" /> {/*일치하는 라우터가 없다면 어디든지 "/" 로 보내주는 것*/}
        </Switch>
    </Router>
);
