import { AppBar, Toolbar, IconButton, Drawer, Menu, MenuItem, withStyles } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { cartActions } from '../../store/cartSlice'
import { authActions } from '../../store/authSlice'

import MenuIcon from '@material-ui/icons/Menu'

import Links from '../Links'
import Logo from '../../resources/logo.png'
import useStyle from './NavbarStyles'

const Navbar = () => {
    const classes = useStyle();
    const isInitialized = useSelector(state => state.user.isInitialized)
    const user =  useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const [ anchorEl, setAnchorEl ] = useState(null)

    const [mobile, setMobile] = useState({
        mobileView: false,
        drawerOpen: false
    })

    const { mobileView, drawerOpen } = mobile;

    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 700
            ? setMobile({mobileView: true})
            : setMobile( {mobileView: false});
        };
    
        setResponsiveness();
    
        window.addEventListener("resize", () => setResponsiveness());
      }, []);

    //Function Components
    const logo = (    
    <NavLink to='/' className={classes.logoContainer}>
          <div className={classes.wrapper}>
            <img className={classes.logo}  src={Logo}  alt="Waffle us logo"/>
          </div> 
    </NavLink>
    )

    const account = Links.find(link => {
        return link.id === 7
    })

    const login = Links.find(link => {
        return link.id === 6
    })

    const defaultLinks = Links.filter(link => {
        return link.id !== account.id && link.id !== login.id
    })

    const handleAccountClick = (e) => {
        setAnchorEl(e.currentTarget )
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const logout = async () => {
      await axios.get("http://localhost:4000/logout", {
            withCredentials: true
         }).then((res) => {
            if (res.data === "success") {
                window.location.href = "/";
            }
        })
        
        dispatch(cartActions.logout())
        dispatch(authActions.userLogout())
    }

    const StyledMenuItem = withStyles((theme) => ({
        root: {
          '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: theme.palette.common.white,
            },
          },
        },
      }))(MenuItem);
      

    const conditionalLink = isInitialized ? 
    <div className={classes.accountContainer}> 
         <div className={`${classes.link} ${classes.account}`} onClick={handleAccountClick}>
            {account.name}
         </div>
    <Menu 
        className={classes.menu}
        id="account-menu" 
        anchorEl={anchorEl} 
        keepMounted 
        open={Boolean(anchorEl)} 
        onClose={handleClose}
    >
        <StyledMenuItem><Link className={classes.userLink} to={`/userprofile`}>My Account: <br />{user.username}</Link></StyledMenuItem>
        <StyledMenuItem><Link className={classes.userLink} to={`/userhistory`}>Order</Link></StyledMenuItem>
        <StyledMenuItem onClick={logout}>Log out</StyledMenuItem>
    </Menu> 
    </div>
   
    : 

    <NavLink
      exact
      className={classes.link}
      to={login.linkTo}
    >
        <div>
            {login.name}
        </div>
    </NavLink>
    ;
    
    const orderUrl = defaultLinks.find(link => link.id === 5)
    const filterOrderUrl = defaultLinks.filter(link => link.id !== 5)

    const conditionalOrderLink = (
        <NavLink 
            activeClassName={
                isInitialized ?
                classes.clickLink
                :
                null
            }
            exact
            className={classes.link} 
            to={
                isInitialized ? orderUrl.linkTo
                :
                '/login'
            } 
            key={orderUrl.id} 
        >
            <div>
            {orderUrl.name}
            </div>
        </NavLink>
    )

    const getDefaultLinks = () => {
        const links = filterOrderUrl.map(link => {
            return(
                <NavLink 
                    activeClassName={classes.clickLink}
                    exact
                    className={classes.link} 
                    to={link.linkTo} 
                    key={link.id} 
                    
                >
                    <div>
                    {link.name}
                    </div>
                </NavLink>
            )
        })

        return links
    }
    //

    //Display
    const mobileDisplay = () => {

        const openDrawer = () => {
            return  setMobile(prevState => ({...prevState, drawerOpen: true}))
        }

        const closeDrawer = () => {
            return  setMobile(prevState => ({...prevState, drawerOpen: false}))
        }

        return(

           <Toolbar style={{width: '100%', padding: 0}}>
               <IconButton {...{edge: 'start', 'aria-label': 'menu', 'aria-haspopup': 'true', onClick: openDrawer}}>
                   <MenuIcon />
               </IconButton>
               <Drawer {...{anchor: 'left', open: drawerOpen, onClose: closeDrawer}}>
                    <div className={classes.drawerContainer}>
                        {getDefaultLinks()}
                        {conditionalOrderLink}
                        {conditionalLink}
                    </div>
               </Drawer>

               <div style={{width: '20vw', height: '100% ', overflow: 'hidden'}}>{logo}</div>
           </Toolbar>
        )
    }

    const desktopDisplay = () => {
        return(
            <Toolbar className={classes.toolBar}>
                {logo}
                <div className={classes.showLinks}>
                    {getDefaultLinks()}   
                    {conditionalOrderLink} 
                    {conditionalLink}            
                </div>
            </Toolbar>
        )
    }
    //

    return(     
        <AppBar elevation={0} position="static" className={classes.appBar}>
           {mobileView ?  mobileDisplay()  :  desktopDisplay()}
        </AppBar>
    )
}

export default Navbar;