import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    container: {
        height: '800px',
        [theme.breakpoints.up('md')]: {
            marginTop: '167px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '86px',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '70px',
        }
    },
    label: {
        textAlign: 'center',
        color: '#303030',
        [theme.breakpoints.up('md')]: {
            fontSize: '3vw',
            marginBottom: '100px',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '5vw',
            marginBottom: '50px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '8vw',
            marginBottom: '50px',
        }
    },
    map: {
        height: '70%',
        width: '100%'
    }
}))         