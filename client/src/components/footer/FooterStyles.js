import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
    container: {
        backgroundColor: '#59534d',
        width: '100%',
    },
    inlineBlock: {
        display: 'inline-block'
    },
    identity: {
        display: 'flex',
        marginTop: '44px'
    },
    logoContainer: {
        height: '30%',
        width: '30%'
    },
    vision: {
        margin: '7% 0',
        width: '40%',
        color: '#f7a72c',
        [theme.breakpoints.up('md')]: {
            fontSize: '24px'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '18px'
        }              
    },
    address: {
        color: '#ffff',
        width: '87%',
        [theme.breakpoints.up('md')]: {
            margin: '78px auto 21px',
            fontSize: '24px'
        },
        [theme.breakpoints.down('md')]: {
            margin: '20px auto 21px',
            fontSize: '18px'
        }     
    },
    right: {
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    line: {
        backgroundColor: '#8c8c8c',
        [theme.breakpoints.up('md')]: {
            display: 'inline-block',
            float: 'left',
            height: '90%',
            width: '2.5px',
            margin: '5% 4% 5% 0'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            height: '2.5px',
            width: '100%'
        }
    },
    sitemap: {
        [theme.breakpoints.up('lg')]: {
            display: 'inline-block',
            marginTop: '15%',
            flex: '50%',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            marginTop: '10%',   
            width: '50%',
            display: 'inline-block',
            flex: '90%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '0%',   
            width: '50%',
            display: 'inline-block',
            flex: '90%',
        }            
    },
    link: {
        color: '#ffff',
        textDecoration: 'none',
        display: 'block',
        [theme.breakpoints.up('lg')]: {
            margin: '30px 0',
            width: '50%',
            fontSize: '20px'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '20px',
            margin: '20px 0',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            margin: '20px 0',
        }
    },
    login: {
        color: '#ffff',
        [theme.breakpoints.up('md')]: {
            fontSize: '18px',
            marginTop: '10%',
            marginBottom: '20px'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '14px',
            marginTop: '10%',
            marginBottom: '5%'
        }
    },
    socMed: {
        color: '#ffff',
        [theme.breakpoints.up('md')]: {
            flex: '50%',
            marginTop: '3.5%',
            fontSize: '24px'
        },
       '@media(min-width: 600px) and (max-width: 959px)': {
            display: 'inline-block',
            flex: '100%',
            position: 'absolute',
            fontSize: '20px'
       },
       '@media(min-width: 0px) and (max-width: 599px)': {
            marginTop: '4rem',
            fontSize: '20px'
       },
    },
    socMedIcon: {
        [theme.breakpoints.up('lg')]: {
            width: '20%'
        },
        [theme.breakpoints.down('md')]: {
            width: '40%'
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: '30%',
            margin: '0 20px 0 0'
        },
        [theme.breakpoints.down('xs')]: {
            width: '10%',
            margin: '0 20px 0 0'
        },
    },
    goTop: {
        position: 'relative',
        background: '#7b7a73',
        color: '#ffff',
        border: 'none',
        borderRadius: '5px',
        height: '60px',
        width: '50px',
        [theme.breakpoints.up('lg')]: {
            top: '230px',
            left: '80px'
        },
        [theme.breakpoints.down('md')]: {
            top: '60px',
            left: '80px'
        },
        [theme.breakpoints.down('sm')]: {
            top: '40px',
            left: '230px'
        },
        [theme.breakpoints.down('xs')]: {
            top: '-200px',
            left: '100px'
        },
        '&:hover': {
            cursor: 'pointer',
            background: '#686862',
            color: '#ffff'
        }
    }
}))