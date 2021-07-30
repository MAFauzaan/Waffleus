import { Container, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import useStyles from './FooterStyles'
import Links from '../Links'

import Logo from '../../resources/logo.png'
import Instagram from '../../resources/instagram.png'
import Whatsapp from '../../resources/whatsapp.png'

const Footer = () => {
    const classes = useStyles();

    const sitemap = () => {

        const filteredArray = Links.filter(link => link.id !== 6 && link.id !== 7)

        return filteredArray.map(link => {
            return <Link key={link.id} to={link.linkTo} className={classes.link}>{link.name}</Link>
        })
    } 

    
    const goToTop = () => {
         window.scrollTo({
             top: 0,
             behavior: 'smooth'
         })
    }


    return( 
        <Container className={classes.container} maxWidth={false}>
            <Grid container>
                    <Grid item md={7} sm={12} className={classes.left}>
                        <div className={classes.identity}>
                            <div className={`${classes.logoContainer} ${classes.inlineBlock}`}><img style={{width: '100%', height: '100%'}} src={Logo} alt="logo" /></div>
                            <p className={`${classes.vision} ${classes.inlineBlock}`}>Delivering our very best in all we do, and holding ourselves accountable for results.</p>
                        </div>
                        <p className={classes.address}>12, RT.10/RW.7, Gandaria Sel., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12420</p>
                    </Grid>

                    <Grid item md={5} sm={12} className={classes.right}>
                        <div className={classes.line} />
                        <div className={classes.sitemap}>
                            {sitemap()}
                        </div>
                        <div className={classes.socMed}>
                            <p>Follow us on:</p>
                            <a target="_blank" rel="noopener noreferrer"  href="https://www.instagram.com/waffle_us/?hl=en"><img className={classes.socMedIcon} src={Instagram} alt="instagram"/></a>
                            <a target="_blank" rel="noopener noreferrer" href="//api.whatsapp.com/send?phone=6289689913982"><img className={classes.socMedIcon} src={Whatsapp} alt="whatsapp"/></a>
                            <button className={classes.goTop} onClick={goToTop}><KeyboardArrowUpIcon/></button>
                        </div>
                    </Grid>
            </Grid>
        </Container>
    )
}

export default Footer