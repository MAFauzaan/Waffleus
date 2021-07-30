import { Container, Grid, makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {  Route, Switch, useHistory, useParams  } from "react-router-dom"

import Account from "./account/account"
import SideNav from "./sideNav/sideNav"
import Order from "./orderHistory/order"

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '50px 0 0 0 ',
        marginBottom: '50px',   
        minHeight: '800px',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    gidContainer: {
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    }
}))

const UserLayout = () => {

    const classes = useStyles()
    const foundUser = useSelector(state => state.user.user)
    const history = useHistory()
    const params = useParams()

    const [ isClick, setIsClick ] = useState({
        profile: false,
        order: false
    })

    const [ bg, setBg ] = useState({
        profile: '#F7A72C',       
        order: '#fffaf4'
    })

    useEffect(() => {
        if(params.userid === 'userhistory') {
            setIsClick({profile: false, order: true})
            setBg({order: '#F7A72C', profile: '#fffaf4'})
        } else {
            setIsClick({profile: true, order: false})
            setBg({profile: '#F7A72C', order: '#fffaf4'})
        }
    }, [params.userid])

    const handleLabelClick = (title) => {   
        if (title === "profile") {
            history.push('/userprofile')
            setIsClick({profile: true, order: false})
            setBg({profile: '#F7A72C', order: '#fffaf4'})
        } else {
            history.push('/userhistory')
            setIsClick({order: true, profile: false})
            setBg({order: '#F7A72C', profile: '#fffaf4'})
        }
    }

    return(
        <Container className={classes.container} maxWidth={false}>
            <Grid container className={classes.gidContainer}>
                    <SideNav handleClick={handleLabelClick} background={bg}/>

                    <Switch>
                    {
                        isClick.profile === true ?
                        <Route path='/userprofile'><Account user={foundUser} /></Route>
                        :   
                        <Route path='/userhistory'><Order user={foundUser}/></Route>
                    }
                    </Switch>
                   
            </Grid>
        </Container>

    )
}

export default UserLayout