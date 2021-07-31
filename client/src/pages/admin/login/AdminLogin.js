import { Container, Paper, TextField, Button } from "@material-ui/core"
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminActions } from '../../../store/adminSlice'

import useStyles from './AdminStyles'

const Admin = () => {
    const history = useHistory();
    const classes = useStyles()

    const dispatch = useDispatch()
    const adminstatus = useSelector(state => state.admin)


    const [ input, setInput ] = useState({
        email: '',
        password: ''
    })

    const submit = async () => {
       await axios({
            method: 'POST',
            data: {
                email: input.email,
                password: input.password
            },
            url: 'http://localhost:4000/loginadmin'
        })
        .then(res => {
            if (res.data === 'Login granted') {
                dispatch(adminActions.userLogin(res.data))
            } 
        })
    }



    return(
        <Container className={classes.container} maxWidth={false}>

            {console.log(adminstatus)}
            <Paper className={classes.paper}>
                <h1 className={classes.login}>Admin</h1>
                <form className={classes.form}>
                    <TextField 
                        name="email"
                        className={classes.textField} 
                        label="Email"
                        value={input.email}
                        onChange={(e) => setInput({...input, email: e.target.value})}
                     />
                     <br/>
                       <TextField 
                        name="password"
                        type="password"
                        className={classes.textField} 
                        label="Password"
                        value={input.password}
                        onChange={(e) => setInput({...input, password: e.target.value})}

                     />
                     <br/>
                        <Button onClick={submit} className={classes.loginButton}>Login</Button>
                    </form>
            </Paper>
        </Container>
    )
}

export default Admin