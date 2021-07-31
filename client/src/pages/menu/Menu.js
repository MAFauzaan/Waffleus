import { Container, Grid } from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { useEffect, useState } from 'react';

import useStyles from './MenuStyles'
import { Croffle } from './CroffleData'
import { Waffle } from './WaffleData'

import Banner from '../../resources/menuBanner.png'
import Banner2 from '../../resources/banner2.jpeg'

import WaffleImg from '../../resources/waffleOri.png'

const Menu = () => {
    const classes = useStyles();

    const banner = [Banner, Banner2]

    const [ state, setState ] = useState({
        croffleIsClicked: false,
        waffleIsClicked: false,
    })

    const [ currBanner, setCurrBanner ] = useState(0)
    const [ currCroffle, setCurrCroffle] = useState(0)
    const [ currWaffle, setCurrWaffle] = useState(0)

    const { croffleIsClicked, waffleIsClicked } = state

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrBanner(currBanner => currBanner + (currBanner > 0 ? -1 : 1));
        }, 3500);
        return () => { 
            clearInterval(timer);
        };
    }, []); 
    

    const clickCroffle = () => {
        setState({croffleIsClicked: !croffleIsClicked})
        setCurrCroffle(0)
        console.log(croffleIsClicked)
    }

    const clickWaffle = () =>{
        setState({waffleIsClicked: !waffleIsClicked})
        setCurrWaffle(0)
        console.log(waffleIsClicked)
    }

    return(
        <Container className={classes.container} maxWidth={false}>
            <Grid xs={12} className={classes.heroSection}>
                 <img className={classes.banner} src={banner[currBanner]} alt="new menu" />
            </Grid>

            <hr className={classes.hr}/>


            {
                croffleIsClicked?
                <Grid container xs={12} className={classes.menuContainer} >
                    <Grid item md={6} className={`${classes.grid} ${classes.itemClicked}`} >
                        <div className={`${classes.left}`} onClick={() => {currCroffle > 0 && setCurrCroffle(currCroffle - 1)}}><ArrowBackIos/></div>
                        <div className={classes.imgContainer}>
                        <img className={`${classes.align} ${classes.image}`} src={`${Croffle[currCroffle].img}`} alt="croffle" onClick={clickCroffle}/>
                        </div>
                        <div className={`${classes.right}`} onClick={() => {currCroffle < Croffle.length -1 && setCurrCroffle(currCroffle + 1)}}><ArrowForwardIos/></div>
                    </Grid>

                    <Grid item md={6} className={`${classes.center} ${classes.descriptionContainer}`}>
                        <div className={classes.croffleDescription}>
                            <h2 className={classes.croffleName}>{Croffle[currCroffle].name}</h2>
                            <hr className={classes.hrImg}/>
                            <p className={classes.paragraph}>{Croffle[currCroffle].description}</p>
                        </div>
                    </Grid>
                </Grid>







                :waffleIsClicked ?
            <Grid container xs={12} className={classes.menuContainer}>
                      <Grid item md={6} className={`${classes.center} ${classes.descriptionContainer}`}>
                        <div className={classes.croffleDescription}>
                            <h2 className={classes.croffleName}>{Waffle[currWaffle].name}</h2>
                            <hr className={classes.hrImg}/>
                            <p className={classes.paragraph}>{Waffle[currWaffle].description}</p>
                        </div>
                    </Grid>

                    <Grid item md={6} className={`${classes.grid} ${classes.reClick} ${classes.itemClicked}`}>
                        <div className={`${classes.left}`} onClick={() => {currWaffle > 0 && setCurrWaffle(currWaffle - 1)}}><ArrowBackIos/></div>
                        <div className={classes.imgContainer}>
                        <img className={`${classes.align} ${classes.image}`} src={Waffle[0].img} alt="croffle" onClick={clickWaffle}/>
                        </div>
                        <div className={`${classes.right}`} onClick={() => {currWaffle < Waffle.length -1 && setCurrWaffle(currWaffle + 1)}}><ArrowForwardIos/></div>

                    </Grid>
              </Grid>






                :
                <Grid container xs={12} className={classes.menuContainer}>
                    <Grid item md={6} className={`${classes.grid} ${classes.reClick}`} onClick={clickCroffle}>
                        <div className={classes.imgContainer}>
                            <img className={`${classes.align} ${classes.image}`} src={`${Croffle[0].img}`} alt="croffle" />
                            <p className={`${classes.name} ${classes.align}`}>Croffle</p>
                        </div>
                    </Grid>
                    <Grid item md={6} className={`${classes.grid} ${classes.reClick}`} onClick={clickWaffle}>
                        <div className={classes.imgContainer}>
                            <img className={`${classes.align} ${classes.image}`} src={WaffleImg} alt="croffle" />
                        <p className={`${classes.name} ${classes.align}`}>Waffle</p>
                        </div>
                    </Grid>
                </Grid>
            }
           

        </Container>
    )
}

export default Menu;