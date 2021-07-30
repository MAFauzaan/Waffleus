import { Container, Paper, Button, TextField, InputAdornment, Snackbar } from '@material-ui/core'
import { LockOutlined, PersonOutline } from '@material-ui/icons'
import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert'


import { authActions } from '../../store/authSlice'

import useStyles from './LoginStyles'

const Login = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const authData = useSelector(state => state.user)
    const history = useHistory()

    const [ loginUsername, setLoginUsername ] = useState("")
    const [ loginPassword, setLoginPassword ] = useState("")

    const [ isNotAuthed, setIsNotAuthed ] = useState(false)

    const handleClick = async (e) => {
        axios({
            method: "POST",
            data: {
              username: loginUsername,
              password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:4000/login",
          }).then((res)=> {
               dispatch(authActions.userLogin(res.data))
              if(res.data === 'No User Exists') {
                setIsNotAuthed(true)     
              } else {
                window.setTimeout(() => {history.push('/')}, 1000)
              }
          })
}

    return(
         <Container className={classes.container} maxWidth={false}>
             {console.log(authData)}
            { 
                authData.user === 'No User Exists' && 
                <Snackbar open={isNotAuthed} autoHideDuration={3000} onClose={() => setIsNotAuthed(false)}>
                    <Alert severity="error">Username or password incorrect</Alert>
                </Snackbar>
            }
            <Paper className={classes.paper} variant='outlined' elevation={3}>
                <h1 className={classes.login}>Login</h1>
                <form className={classes.form} autoComplete="off">
                    <TextField 
                        name="username"
                        className={classes.textField} 
                        label="Username"
                        onChange={(e) => setLoginUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline />
                                </InputAdornment>
                            )
                        }}
                    />
                    <br />
                    <TextField 
                        name="password"
                        type="password"
                        className={classes.textField} 
                        label="Password" 
                        onChange={(e) => setLoginPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">   
                                    <LockOutlined />
                                </InputAdornment>
                            )
                        }}
                    />
                </form>
                <Link to="/login/pw_forgot" className={classes.forgot}>Forgot password?</Link>
                <Button 
                    className={classes.loginButton} 
                    fullWidth
                     onClick={handleClick}
                >
                    Login
                </Button>
                <hr className={classes.hr}/>
                <p className={classes.makeAccount}>Don't have an account? <Link to="/login/signup">Signup now</Link></p>
            </Paper>
        </Container>
       
    )
}

export default Login