import { Container, Grid, Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'


import useStyles from './HomeStyles'

import Poster from '../../resources/cov-1.jpg'
import Ingredients from '../../resources/ingredients.png'
import Cheese from '../../resources/cheese.jpg'
import Choco from '../../resources/choco.jpg'
import Milo from '../../resources/milo.jpg'
import Oreo from '../../resources/oreo.jpg'
import GoFoodLogo from '../../resources/gofood.png' 
import ShopeeLogo from '../../resources/shopee.png'

const Home = () => {

    const classes = useStyles();
    const user = useSelector(state => state.user.user)

    return(
        // HERO
        <Container className={classes.hero} maxWidth={false}>
            <Grid>  
                <img className={classes.posterImg} src={Poster} alt="Poster" />
            </Grid>
        {console.log(user)}
        {/* TEXT */}
            <Grid style={{marginTop: '32px', marginBottom:'32px'}}>
                <p className={classes.specialText}>What's so special about our waffles?</p>
            </Grid>

        {/* INGREDIENTS */}
            <Grid container justify='center' alignItems='center'>      
                <Paper className={classes.ingredients}>
                    <div className={classes.imgContainer}>
                        <img className={classes.img} src={Ingredients} alt="Ingredients"/>
                    </div>
                    <div className={classes.imgDesc}>
                        <p style={{width: '90%'}}>Our Waffles are made from scratch using selected ingredients.</p>
                    </div>
                </Paper> 
            </Grid>

        {/* TEXT */}
            <Grid>
                <p className={classes.various}>
                    <span style={{color: '#f7a72c'}}>Various selections </span>  
                    <span style={{color: '#000000'}}>of toppings </span>
                    <span style={{color: '#7b3f00'}}>to choose from!</span>
                </p>
            </Grid>  

        {/* VARIATION */}
            <Grid style={{marginBottom: '80px'}}>
                <img className={classes.variousImg} src={Cheese} alt="cheese"/>
                <img className={classes.variousImg} src={Oreo} alt="oreo"/>
                <img className={classes.variousImg} src={Milo} alt="milo"/>
                <img className={classes.variousImg} src={Choco} alt="choco"/>
            </Grid>

        {/* TEXT */}
            <Grid style={{marginTop: '32px'}}>
                <p className={classes.specialText}>Order through your favourite delivery Apps!</p>
            </Grid>

            <Grid className={classes.deliveryContainer}>
                <div className={classes.deliveryOptions}>
                    <img  src={GoFoodLogo} alt="gofood"/>
                </div>
                <div className={classes.deliveryOptions}>
                    <img className={classes.shopeelogo} src={ShopeeLogo} alt="shopee"/>
                </div>
            </Grid>

        </Container>        
    )
}

export default Home;