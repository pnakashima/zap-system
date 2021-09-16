import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import NewMessage from '../pages/NewMessage'
import MessageList from '../pages/MessageList'

const Routes = () => {
    return (

        <Switch>
            <Route path="/" exact>
                <Dashboard />
            </Route>

            <Route path="/list">
                <MessageList />
            </Route>

            <Route path="/message">
                <NewMessage />
            </Route>
        </Switch>

    )
}

export default Routes