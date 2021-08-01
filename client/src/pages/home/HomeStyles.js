import { makeStyles } from '@material-ui/core'

export default makeStyles ((theme) => ({
   hero: {
        margin: 0,
        padding: 0
   },
   posterImg: {
       width: '100%'
   },
   specialText: {
       margin: 0,
       maxWidth: '100%',
       textAlign: 'center',
       fontSize: '3vw',
       color: '#f7a72c',
       [theme.breakpoints.up('lg')]: {
            padding: '162px 30px',
       },
        [theme.breakpoints.down('md')]: {
            padding: '142px 30px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '102px 30px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '42px ',
        }
    },
   ingredients: {
        backgroundColor: '#f7a72c',
        display: 'flex',
        [theme.breakpoints.up('lg')]: {
            height: '605px',
            width: '80%',
        },
        [theme.breakpoints.down('md')]: {
            width: '80%',
            height: '405px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '355px'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '205px'
        }
   },
   imgContainer: {
        flex: '50%',
        display: 'grid',
        placeItems: 'center'
   },   
   img: {   
        maxHeight: '90%',
        maxWidth: '90%'
   },
   imgDesc: {
        flex: '50%',
        color: '#ffff',
        fontSize: '3.5vw',
        display: 'grid',
        placeItems: 'center',
   },
   various: {
        marginBottom: '36px',
        textAlign: 'center',
        fontSize: '3vw',
        maxWidth: '100%',
        [theme.breakpoints.up('lg')]: {
            padding: '162px 30px',
       },
        [theme.breakpoints.down('md')]: {
            padding: '142px 30px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '102px 30px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '42px ',
        }
   },
   variousImg: {
        display: 'inline-block',
        width: '25%',
        height: '100%',
   },
   startingPrice: {
    [theme.breakpoints.up('md')]: {
        width: '75%'
    },
       [theme.breakpoints.down('sm')]: {
           width: '100%'
       }
   },
   deliveryContainer: {
    margin: '20px 0 80px', 
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
   },
   deliveryOptions: {
    placeItems: 'center',
    textAlign: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]:{
        flex: '50%',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        marginTop: '40px'

    }
   },
   shopeelogo: {
       margin: '30px 0',
    [theme.breakpoints.up('lg')] : {
        width: '40%',
        height: '50%'
    },
    [theme.breakpoints.down('md')] : {
        width: '50%',
        height: '50%'
    },
       [theme.breakpoints.down('sm')] : {
           width: '50%',
           height: '50%'
       }
   },
   gofood: {
       [theme.breakpoints.down('xs')]: {
           height: '30%',
           width: '30%'
       }
   }
}))