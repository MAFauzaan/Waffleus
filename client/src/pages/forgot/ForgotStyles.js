import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    container: {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '700px',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#fdb84d',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='46' height='46' fill-opacity='0.6' fill='%23ffa61d'/%3E%3C/svg%3E")`
        /* background by SVGBackgrounds.com */,
        [theme.breakpoints.down('xs')]: {
            height: '700px'
        }
    },
    paper: {
        padding: '2%',
        borderRadius: '15px',
        [theme.breakpoints.up('md')]: {
            width: '40%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '70%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%'
        }
    },
    p: {
        fontSize: '14px',
        marginTop: '30px'
    },
    textfield: {
        display: 'grid',
        placeItems: 'center',
        marginTop: '20px'
    },
    submit: {
        marginTop: "20px",
        padding: '5px 50px',
        background: '#FDB84D',
        borderRadius: '15px',
        color: '#fbfbfa',
        fontWeight: 'bold',
        '&:hover':{
            background: '#fca51e'
        }
    }
}))