import React from 'react'
import './Trello.css'
import Home from './Home/Home'
import Board from './Board/Board'
import Header from './Header/Header'
import { Route, Switch } from 'react-router-dom'

function Trello() {
    return (
        <div className="trello-root">
            <div className="heading">
                <Header />
            </div>
            <div className="content">
                <Switch>
                    <Route exact path="/trello/board/:id">
                        <Board />
                    </Route>
                    <Route>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Trello
