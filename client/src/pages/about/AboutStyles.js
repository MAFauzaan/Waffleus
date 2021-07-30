 import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    about: {
        marginTop: '85px',
        marginBottom: '53px'
    },
    h1: {
        textAlign: 'center',
        margin: 0,
        fontSize: '36px'
    },
    hr: {
        width: '10%',
        height: '1px',
        backgroundColor: 'black',
        marginLeft: 0,
        marginBottom: '20px',
    },
    content: {
        marginBottom: '0',
        [theme.breakpoints.up('lg')]: {
            fontSize: '36px'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '24px'
        },
    },
    description: {
        [theme.breakpoints.up('lg')]: {
            fontSize: '24px'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '20px'
        },
    }
}))