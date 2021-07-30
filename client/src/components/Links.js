import { AccountCircle } from '@material-ui/icons'
import Login from '../resources/login.png'


const login = {
      backgroundColor: '#00000000',
      outline: 'none',
      border: 'none',
      height: '40%',
}

const Links = [
    {
        id: 1,
        name: 'HOME',
        linkTo: '/'
    },
    {
        id: 2,
        name: "MENU",
        linkTo: '/menu'
    },
    {
        id: 3,
        name: "LOCATION",
        linkTo: '/location'
    },
    {
        id: 4,
        name: "ABOUT US",   
        linkTo: '/about'
    },
    {
        id: 5,  
        name: 'ORDER',
        linkTo: '/online-order'
    },
    {
        id: 6,
        name: <img src={Login} alt="login" style={login}/>,
        linkTo: '/login'
    },
   {
       id: 7,
       name: <AccountCircle fontSize="large"/>,
       linkTo: '/account',
       label: 'Account'
   }
]

export default Links