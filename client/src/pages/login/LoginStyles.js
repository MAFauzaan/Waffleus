import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    container: {
        margin: 0,
        padding: 0,
        height: '1000px',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#fdb84d',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='46' height='46' fill-opacity='0.6' fill='%23ffa61d'/%3E%3C/svg%3E")`
        /* background by SVGBackgrounds.com */
    },
    paper: {
        textAlign: 'center',
        display: 'grid',
        placeItems: 'center',
        padding: '80px 0',
        borderRadius: '1.5%',
        [theme.breakpoints.up('lg')]:{
            width: '25%',
        },
        [theme.breakpoints.down('md')]:{
            width: '50%',
        },
        [theme.breakpoints.down('xs')]:{
            width: '80%',
        }
    },
    login: {
        margin: '10px 0 12px',
        color: '#fdb84d',
        [theme.breakpoints.up('lg')]:{
            fontSize: '40px'
        },
        [theme.breakpoints.down('md')]:{
            fontSize: '36px'
        },
        [theme.breakpoints.down('xs')]:{
            fontSize: '28px'
        }
    },
    form: {
        textAlign: 'center',
        margin: '20px 20px 0'
    },
    textField: {
        margin: '10px 0',
        borderBottomColor: '#fdb84d'
    },
    forgot: {
        textDecoration: 'none',
        color: '#fdb84d',
        fontWeight: '500',
        paddingRight: '20%',
        marginBottom: '50px'
    },
    loginButton: {
        width: '50%',
        marginBottom: '20px',
        color: '#ffff',
        backgroundColor: '#59534D',
        "&:hover": {
            backgroundColor: '#3f3b37'
        }
    },
    hr: {
        width: '75%',
        margin: 0,
        textAlign: 'center',
        height: '2px',
        border: 0,
        backgroundColor: '#cbcbcc'
    },
    makeAccount: {
        marginTop: '30px'
    }
}))