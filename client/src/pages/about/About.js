import { Container, Grid } from '@material-ui/core'

import useStyles from './AboutStyles'

const About = () => {
    const classes = useStyles()

    return(
        <Container>
            <Grid className={classes.about}>
                <h1 className={classes.h1}>About Waffle us</h1>
            </Grid>

            <Grid style={{marginBottom: '108px'}}>
                <p className={classes.content}>Our Vision</p>
                <hr className={classes.hr}/>
                <p className={classes.description}>Menjadikan waffle us sebagai makanan atau jajanan yang murah dan enak  serta berkualitas di masyarakat </p>
            </Grid>

            <Grid style={{marginBottom: '158px'}}>
                <p className={classes.content}>Our Mission</p>
                <hr className={classes.hr}/>
                <ul className={classes.description}>
                    <li style={{margin: '5px 0'}}>Memperkenalkan waffle kepada masyarakat dengan cara mengubah image waffle yang merupakan makanan high class menjadi sangat affordable dengan kantong masyarakat.</li>
                    <li style={{margin: '5px 0'}}>“Delivering our very best in all we do, holding ourselves accountable for results” </li>
                </ul>
            </Grid>
        </Container>
    )
}

export default About;