import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'

import Admin from '../../pages/admin/login/Admin'
import Dashboard from '../../pages/admin/dashboard/Dashboard'

import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = (props) => {
    return(

        <Switch>
            <Route path='/admin' exact={true}>
                <Admin />
            </Route>

            <Route path='/admin/dashboard'>
                <Dashboard />
            </Route>

            <Route path='/'>
                <Fragment>
                <Navbar />
                    <main>
                        {props.children}
                    </main>
                <Footer />
                </Fragment>
            </Route>
        </Switch>


        
    )
}

export default Layout;