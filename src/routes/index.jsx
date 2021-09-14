import { Route, Switch } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Message from '../pages/Message'
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
                <Message />
            </Route>
        </Switch>

    )
}

export default Routes