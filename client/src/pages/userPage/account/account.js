import { Grid, TextField, Button } from "@material-ui/core"
import { AccountCircleOutlined } from "@material-ui/icons"

import useStyles from './accountStyles'
import { useState } from "react"

const Account = (props) => {
    const fetchedUserData = props.user    
    const classes = useStyles();

    const [ userData ] = useState({
        username: fetchedUserData.username,
        email: fetchedUserData.email,
        phoneNumber: fetchedUserData.phoneNumber,
        alamat: fetchedUserData.address,
    })

    return(      
        <Grid item xs={12} sm={12} md={10}>
            <div className={classes.container}>
                <div className={classes.profilePict}>
                    <AccountCircleOutlined style={{height: '258px', width: '258px'}}/>
                    <p className={classes.p}>Ubah photo profile</p>
                </div>
                <form className={classes.form}>
                    <TextField defaultValue={userData.username} className={classes.textfield} label='Username' variant='outlined'/>
                    <TextField defaultValue={userData.email} className={classes.textfield} label='Email' variant='outlined'/>
                    <TextField  className={classes.textfield} label='Nomor Telepon' variant='outlined'/>
                    <TextField defaultValue={userData.alamat} className={classes.textfield} label='Alamat' variant='outlined'/>
                    <br />
                    <Button className={classes.button}>Simpan</Button>
                </form>
            </div>
        </Grid>
    )
}

export default Account