import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ForgotPage from "./pages/Forgot"
import Cart from "../Shop/pages/Cart";
import GuestLayout from '../../components/Layout/guest/GuestLayout.js'
function User(props) {
    const match = useRouteMatch();
    return (
        <GuestLayout>
            <Switch>
                <Route exact path={`${match.url}/login`} component={LoginPage} />
                <Route exact path={`${match.url}/register`} component={RegisterPage} />
                <Route exact path={`${match.url}/forgot`} component={ForgotPage} />
                <Route exact path={`${match.url}/cart`} component={Cart}/>
            </Switch>
        </GuestLayout>
    )
}

User.propTypes = {}

export default User