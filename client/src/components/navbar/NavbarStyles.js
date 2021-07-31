import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  appBar:{
    backgroundColor: "#ffff",
    height: "10vh"
  },
   toolBar: {
     display: 'flex',
     padding: 0,
     justifyContent: 'space-between',
     height: '100%'
   },
   logoContainer: {
     height: "100%",
      [theme.breakpoints.up('md')]: {
        position: 'relative',
        left: '10%',
        width: "105px",
      },
      [theme.breakpoints.up('md')]: {
        position: 'relative',
        left: '10%',
        width: "105px",
      },
      [theme.breakpoints.up('sm')]: {
        position: 'relative',
        left: '5%',
        width: "105px",
      },
      [theme.breakpoints.down('xs')]: {
        width: "100px",
      }
   },
   wrapper: {
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
   },
   logo:{
     height: "100%",
     width: "100%"
   },
   clickLink: {
      background: '#eaeae9',
   },
   showLinks: {
      height: '100%',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        marginRight: '8%',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'block',
        placeItems: 'center',
      }
   },
   link: {
      color: '#f7a72c',
      textDecoration: 'none',
      height: '100%',
      placeItems: 'center',
      [theme.breakpoints.up('lg')]: {
        padding: '0 17px',
        fontSize: '20px',
        display: 'flex',
      },
      [theme.breakpoints.down('md')]: {
        padding: '0 8px',
        fontSize: '18px',
        display: 'flex',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0',
        margin: '0 5px',
        fontSize: '16px',
        display: 'flex',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '4vw',
        margin: '25px 0',
        width: '100%',
        display: 'flex',
        textAlign: 'left',
        justifyContent: 'center'
      },
   },
    login: {
      backgroundColor: '#ffff',
      outline: 'none',
      border: 'none'
    },
   drawerContainer: {
    display: 'grid',
    width: '180px'
  },
  accountContainer: {
    [theme.breakpoints.up('md')]: {
      marginLeft: "20px"
    }
  },
  account: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  menu: {
    marginTop: '50px',
  },
  userLink: {
    color: '#000000',
    textDecoration: 'none'
  }
}))