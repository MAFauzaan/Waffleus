import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { brown } from '@material-ui/core/colors'
import { Switch, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Menu from './pages/menu/Menu'
import Location from './pages/location/Location'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Order from './pages/order/OnlineOrder'
import Register from './pages/register/Register'
import Forgot from './pages/forgot/Forgot'
import UserLayout from './pages/userPage/userLayout'

const App = () => {

  const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fdb84d'
        },
        secondary: brown
    }
})

  return(
<ThemeProvider theme={theme}>
   <Layout>
      <Switch>
          
      <Route path='/' exact={true}>
        <Home />
      </Route>

      <Route path='/menu'>
        <Menu />
      </Route>

      <Route path='/location'>
        <Location />
      </Route>

      <Route path='/about'>
        <About />
      </Route>

      <Route path="/login" exact>
        <Login />
      </Route>

      <Route path="/login/pw_forgot"> 
        <Forgot />
      </Route>

      <Route path="/online-order">
        <Order />
      </Route>

      <Route path='/login/signup'>
          <Register />
      </Route>

      <Route path='/:userid'>
          <UserLayout />
      </Route>
          
      </Switch>
   </Layout>
 </ThemeProvider>

  )
}

export default App;
