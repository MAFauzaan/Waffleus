import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
      margin: '0 60px',
  },
  textfield: {
      width: '40%',
      margin: '10px',
      [theme.breakpoints.up('md')]:{
        width: '50%'
      },
      [theme.breakpoints.down('sm')]:{
        width: '60%'
      },
      [theme.breakpoints.down('xs')]:{
        width: '100%'
      },
  },
  profilePict:{
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
    },
  },
  form: {
      marginLeft: '40px',
      display: '',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    }
  },
  button: {
      borderRadius: '30px',         
      marginTop: '20px',
      padding: '10px 40px',
      background: '#FDB84D',
      '&:hover':{
        background: '#fca51e'
    },
    [theme.breakpoints.up('md')]:{
        marginLeft: '10px'
    },
  },
  p: {
    color: '#28B79D', 
    marginLeft: '50px',
    '&:hover': {
        cursor: 'pointer'
    }
  }
}))