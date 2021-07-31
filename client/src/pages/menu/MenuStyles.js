import { makeStyles } from '@material-ui/core'

export default makeStyles((theme)=> ({
    container: {
        margin: 0,
        padding: 0
   },
   heroSection: {
        display: 'flex',
        textAlign: 'center',
        [theme.breakpoints.up('md')] : {
            padding: '54px 100px 30px'
        },
        [theme.breakpoints.up('lg')] : {
            padding: '54px 150px 35px'
        },
        [theme.breakpoints.up('xl')] : {
            padding: '54px 220px 41px'
        }
   },
    banner: {
        maxWidth: '90%',
        flex: '90%'
    },
    hr: {
        padding: 0,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: '50px',
        width: '50%',
        [theme.breakpoints.up('md')] : {
            marginTop: '80px',
        },
        [theme.breakpoints.up('lg')] : {
            marginTop: '100px',
        },
        [theme.breakpoints.up('xl')] : {
            marginTop: '120px',
        }
    },
    grid: {
        display: 'flex',
        height: '100%', 
        width: '100%',
        '&:hover': {
            cursor: 'pointer'
         },
    },
    center: {
        display: 'grid',
        placeItems: 'center'
    },
    menuContainer: {
        textAlign: 'center',
        marginBottom: '158px',
        width: '100%',
        [theme.breakpoints.up('md')] : {
            height: '480px',
        },
        [theme.breakpoints.up('lg')] : {
            height: '700px',
        },
        [theme.breakpoints.up('xl')] : {
            height: '800px',
        }
    },
    imgContainer: {
       flex: '90%',
       height: '100%',
       display: 'grid',
       placeItems: 'center'
    },
    align: {
        position: 'relative',
        [theme.breakpoints.up('xl')]:{
            top: '10%'
        },
        [theme.breakpoints.down('lg')]:{
            top: '5%'
        },
        [theme.breakpoints.down('md')]:{
            top: '10%'
        }
    },
    image:{
        [theme.breakpoints.down('md')]:{
            height: '75%',
            width: '65%'
        }
    },
    itemClicked: {
        backgroundColor: '#37291d',
        color: '#ffff !important',
        transition: '0.5s'
    },
    reClick: {
        transition: '0.5s'
    },
    name: {
        fontSize: '3vw',
        margin: 0,
    },
    
    left: {
        flex: '5%',
        placeItems: 'center',
        display: 'grid',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    right: {
        flex: '5%',
        placeItems: 'center',
        display: 'grid',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    descriptionContainer: {
        backgroundColor: '#fdb84d',
        transition: '1s'
    },
   croffleDescription: {
       height: '80%',
       width: '80%',
       [theme.breakpoints.down('sm')]: {
            height: '100%',
            width: '100%'
       }
   },
   croffleName: {
       margin: 0,
       fontSize: '3.5vw',
       textAlign: 'left'
   },
   hrImg: {
       margin: '20px 0 50px 0',
       width: '15%',
       textAlign: 'left',
       backgroundColor: '#ffff',
       borderColor: '#020202'
   },
   paragraph: {
       fontSize: '24px',
       textAlign: 'left'
   }
}))