import {  useState } from 'react'
import { Container, Paper, TextField, InputAdornment, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { EmailOutlined, LockOutlined, PersonOutline, HomeOutlined } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import useStyles from './registerStyles'

const Register = () => {
    const history = useHistory()
    const classes = useStyles();

    const [ isRegistered, setIsRegistered ] = useState(null)

    const [ registerNew, setRegisterNew ] = useState({
        email: "",
        username: "",
        password: "",
        address: ""
    })

    const [ valid, setValid ] = useState({
        email: false,
        username: false,
    })


    const [ errorMessage, setErrorMessage ] = useState({
        email: "",
        username: "",
    })

       

    const checkEmail = () => {
        if(registerNew.email !== "") {
            axios({
                method: 'POST',
                data: {
                    email: registerNew.email
                },
                url: 'http://localhost:4000/findexistingemail'
            })
            .then(res => {
                setErrorMessage({...errorMessage, email: res.data})
                if(res.data === 'Email is available') {
                    setValid({...valid, email: true})
                }
            })
            
        }
    }

     
    const checkUsername = () => {
        if (registerNew.username !== "") {
            axios({
                method: 'POST',
                data: {
                    username: registerNew.username
                },
                url: 'http://localhost:4000/findexistingusername'
            })
            .then(res => {
                setErrorMessage({...errorMessage, username: res.data})
                if(res.data === 'Username is available') {
                    setValid({...valid, username: true})
                }
            })
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target

        setRegisterNew({...registerNew, [name]: value})
    }

    const handleClick = (e) => {

        if(registerNew.email && registerNew.username && registerNew.password.length >= 8 && valid.email === true && valid.username === true) {
            e.preventDefault()
    
            axios({
                method: 'post',
                data: {
                    email: registerNew.email,
                    username: registerNew.username,
                    password: registerNew.password,
                    address: registerNew.address
                },
                withCredentials: true,
                url: 'http://localhost:4000/register'
            }).then(res => {
                if(res.data === "User Created") {
                    setIsRegistered(true)
                    setRegisterNew({
                        email: "",
                        username: "",
                        password: "",
                        address: ""
                    })
                    setTimeout(() => history.push('/login'), 1500) 
                } else {
                    setIsRegistered(false)
                    setRegisterNew({
                        email: "",
                        username: "",
                        password: "",
                        address: "",
                    })
                }
            })   
        } else {
            setIsRegistered(false)
        }
    }

    return(
         <Container className={classes.container} maxWidth={false}>
             {console.log(valid)}
               {
                 isRegistered === true ? 
                 <Alert className={classes.alert} severity="success">User successfully registered!</Alert>
                 : isRegistered === false ?
                 <Alert className={classes.alert} severity="error">User creation failed, try once more.</Alert>
                 : isRegistered === null ?
                 null
                 :
                 null
             }
            <Paper className={classes.paper} variant='outlined' elevation={3}>
                <h1 className={classes.login}>Sign up</h1>
                <form className={classes.form} autoComplete="off">
                    <TextField 
                        name="email"
                        type="email"
                        autoComplete="off"
                        helperText= {errorMessage.email}
                        className={classes.textField} 
                        label="Email"
                        onChange={handleChange}
                        value={registerNew.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlined />
                                </InputAdornment>
                            ),
                        }}
                        required
                    />
                     <Button onClick={checkEmail}>Check email availability</Button>

                    <br />
                     <TextField 
                        name="username"
                        autoComplete="off"
                        className={classes.textField} 
                        label="Username"
                        helperText={errorMessage.username}
                        onChange={handleChange}
                        value={registerNew.username}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline />
                                </InputAdornment>
                            )
                        }}
                        required
                    />
                     <Button onClick={checkUsername}>Check username availability</Button>

                    <br />
                    <TextField 
                        name="password"
                        type="password"
                        autoComplete="off"
                        className={classes.textField} 
                        label="Password" 
                        helperText={registerNew.password.length < 8 && "Password has to be 8 characters long"}
                        onChange={handleChange}
                        value={registerNew.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">   
                                    <LockOutlined />
                                </InputAdornment>
                            )
                        }}
                        required
                    />
                    
                    <br />
                    <TextField 
                        name="address"
                        autoComplete="off"
                        label="Address"
                        variant="outlined"
                        placeholder="Nomor rumah, Jalan, RT/RW, Kecamatan, Kelurahan, Kota"
                        onChange={handleChange}
                        className={`${classes.textField} ${classes.address}`} 
                        value={registerNew.address}
                        multiline
                        rows={5}
                        InputProps={{   
                            startAdornment: (
                                <InputAdornment position="start">   
                                    <HomeOutlined />
                                </InputAdornment>
                            )
                        }}
                        required
                    />
                      <button onClick={handleClick} className={classes.register} fullWidth>
                        Register
                    </button>     
                </form>
            </Paper>
          
        </Container>
       
    )
}

export default Register