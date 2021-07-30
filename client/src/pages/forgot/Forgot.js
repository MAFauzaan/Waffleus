import { Container, Paper, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import axios from 'axios'

import useStyles from './ForgotStyles'

const Forget = () => {
    const classes = useStyles()

    const [ email, setEmail ] = useState("")

    const [ sent, setSent ] = useState(false)

    const submit =  () => {
       axios({
            method: 'POST',
            data: {
                email: email
            },
            withCredentials: true,
            url: 'http://localhost:4000/forgot'
        }).then(() => {
            setSent(true)
        })

        setEmail("")
    }

    return(
        <Container className={classes.container} maxWidth={false}>
            
            <Paper className={classes.paper}>
                {
                    sent ?
                    <p className={classes.p}>Your request has been sent, check you email for further information.</p>
                    :
                    <div>
                    <h2 className={classes.h2}>Forgot your password?</h2>
                    <hr className={classes.hr}/>
                    <p className={classes.p}>Enter the email address associated with your account, and we will send you a link to reset your password.</p>
                    <div className={classes.textfield}>
                        <TextField 
                            name="email"
                            label="Email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <br />
                        <Button onClick={submit} className={classes.submit}>Submit</Button>
                    </div>
                    </div>
                }
               
            </Paper>
        </Container>
    )
}

export default Forget