import { Container } from '@material-ui/core'

import useStyles from './LocationStyles'
import ExploreIcon from '@material-ui/icons/Explore';

const Location = () => {
    const classes = useStyles();

    return(
        <Container className={classes.container}>
             <p className={classes.label}><ExploreIcon fontSize='large'/> Find our location here:</p>
            <iframe title="map" className={classes.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8818054096305!2d106.79052351476932!3d-6.279266195455156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1eeb9da3e79%3A0x4cbc24f263154c72!2sWaffle%20us!5e0!3m2!1sen!2sid!4v1622642382227!5m2!1sen!2sid"  allowFullScreen="" loading="lazy"></iframe>
        </Container>
        )
}

export default Location