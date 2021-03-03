import React from 'react'
import Todo from './components/task1/Todo'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import Trello from './components/task2/Trello'

const App = () => {
    return (
        <HashRouter>
            <div className="main-content">
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/trello/boards" />
                    </Route>
                    <Route exact path="/todo">
                        <Todo />
                    </Route>
                    <Route exact path="/trello/boards">
                        <Trello />
                    </Route>
                    <Route path="/trello/board">
                        <Trello />
                    </Route>
                </Switch>
            </div>
        </HashRouter>
    )
}

export default App
