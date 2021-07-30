import { Grid } from "@material-ui/core"

import useStyles from "./sideNavStyles"

const SideNav = (props) => {

    const bg = props.background
    const handleClick = props.handleClick
     
    const classes = useStyles()

    return(
    <Grid item sm={12} md={2} className={classes.grid}>
        <h2  style={{backgroundColor: bg.profile}} onClick={() => handleClick("profile")} className={classes.navLabel}>Profile</h2>
        <h2  style={{backgroundColor: bg.order}} onClick={() => handleClick("order")} className={classes.navLabel}>Order History</h2>
        <hr className={classes.hr}/>
    </Grid>      
    )
}

export default SideNav