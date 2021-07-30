import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ExpandMore  } from '@material-ui/icons'

import axios from "axios";

import useStyles from './orderStyles'

const Order = (props) => {

    const classes = useStyles();
    const fetchedUserData = props.user


    const [ clicked, setClicked ] = useState("")

    const [ bg, setBg ] = useState({
        belumDikirim: '',
        sedangDikirim: '#FFEEDD',
        terkirim: '' 
    })

    const [ belumDikirim, setBelumDikirim ] =  useState([])
    const [ sedangDikirim, setSedangDikirim ] =  useState([])
    const [ terkirim, setTerkirim ] =  useState([])


    const statuses = ['Belum dikirim', 'Sedang dikirim', 'Terkirim']


    //Fetch data from database using axios in button action
    useEffect(() => {
       axios({
           method: 'POST',
           data: {
               id: fetchedUserData._id
           },
           url: 'http://localhost:4000/orders/senduserinfo/unsent'
       })
        .then(res => setBelumDikirim(res.data))
    }, [fetchedUserData])

    useEffect(() => {
        axios({
            method: 'POST',
            data: {
                id: fetchedUserData._id
            },
            url: 'http://localhost:4000/orders/senduserinfo/beingSent'
        })
         .then(res => setSedangDikirim(res.data))
     }, [fetchedUserData])

     useEffect(() => {  
        axios({
            method: 'POST',
            data: {
                id: fetchedUserData._id
            },
            url: 'http://localhost:4000/orders/senduserinfo/sent'
        })
         .then(res => setTerkirim(res.data))
     }, [fetchedUserData])
 

     //Functions

     const toggleDescription = (id) => {
        const viewDesc = document.getElementById(id)
    
        if(viewDesc.style.display === 'none') {
          viewDesc.style.display = 'block'
        } else {
          viewDesc.style.display = 'none'
        }
      }

     const clickHandler = (status) => {
        setClicked(status)

        if(status === 'Belum dikirim'){
            setBg({belumDikirim: '#FFEEDD', sedangDikirim: '#FFFAF4', terkirim: '#FFFAF4'})
        } else if (status === 'Sedang dikirim') {
            setBg({belumDikirim: '#FFFAF4', sedangDikirim: '#FFEEDD', terkirim: '#FFFAF4'})
        } else {
            setBg({belumDikirim: '#FFFAF4', sedangDikirim: '#FFFAF4', terkirim: '#FFEEDD'})
        }
     }
     

    return(
        <Grid className={classes.container} item xs={12} sm={10} md={8}>
                    <div className={classes.statusContainer}>
                        {statuses.map(status => 
                            <div 
                            style={status === 'Belum dikirim' ? {backgroundColor: bg.belumDikirim} : status === 'Sedang dikirim' ? {backgroundColor: bg.sedangDikirim} : {backgroundColor: bg.terkirim}}
                            onClick={() => clickHandler(status)} 
                            className={classes.statusLabel}>{status}
                            </div>
                        )}
                    </div>
                    <br />

                    {
                        clicked === "Belum dikirim" ?
                        <div className={classes.orderContainer}>
                            {
                                belumDikirim.length === 0 ?
                                <h1>You have yet ordered anything</h1>
                                :
                                belumDikirim.map((order) => {
                                    return(
                                    <div  key={order._id} className={classes.orderItem}>
                                        <div className={classes.orderItemHeader} onClick={() => toggleDescription(order._id)}>
                                            <p className={`${classes.idLabel} ${classes.align}`}>Order-{order._id}</p>
                                            <ExpandMore className={classes.expand} style={{float: 'right', color: '#ffff', marginRight: '20px' }}/>
                                        </div>

                                        <div id={order._id} style={{display: 'none'}} className={classes.orderDetails}>
                                                <div className={classes.orderLabel}>
                                                    <p className={classes.p} style={{float: 'left', marginLeft: '10px', color: '#59534D'}}>{order.orderDate}</p>
                                                    <p className={classes.p} style={{float: 'right', marginRight: '10px', background: '#FFEEDD'}}>Belum dikirim</p>
                                                </div>

                                                <div>
                                                        {
                                                            order.items.map(item => {
                                                                return(
                                                                    <div className={classes.orderItemDetail}>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>{item.baseName}</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>Rp{item.basePrice}</p>
                                                                        </div>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>{item.toppingName}</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>Rp{item.toppingPrice}</p>
                                                                        </div>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>Quantity:</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>{item.quantity}</p>  
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                <div className={classes.grandTotal}>
                                                    <h2 className={`${classes.p} ${classes.pLeft}`}>Grand Total</h2>
                                                    <h2 className={`${classes.p} ${classes.pRight}`}>Rp{order.grandTotal}</h2>
                                                </div>

                                                </div>
                                        </div>
                                    </div>
                                    )
                                })
                            }                 
                        </div>

                        :
                        clicked === 'Sedang dikirim' ?
                        <div className={classes.orderContainer}>
                            {
                                sedangDikirim.length === 0 ?
                                
                                <h1>There's no order on your way</h1>
                                :
                                sedangDikirim.map((order, index) => {
                                    return(
                                    <div  key={order._id} className={classes.orderItem}>
                                        <div className={classes.orderItemHeader} onClick={() => toggleDescription(order._id)}>
                                            <p className={`${classes.idLabel} ${classes.align}`}>Order-{order._id}</p>
                                            <ExpandMore className={classes.expand} style={{float: 'right', color: '#ffff', marginRight: '20px' }}/>
                                        </div>

                                        <div id={order._id} style={{display: 'none'}} className={classes.orderDetails}>
                                                <div className={classes.orderLabel}>
                                                    <p className={classes.p} style={{float: 'left', marginLeft: '10px', color: '#59534D'}}>{order.orderDate}</p>
                                                    <p className={classes.p} style={{float: 'right', marginRight: '10px', background: '#FFEEDD'}}>Sedang dikirim</p>
                                                </div>

                                                <div>
                                                        {
                                                            order.items.map(item => {
                                                                return(
                                                                    <div className={classes.orderItemDetail}>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>{item.baseName}</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>Rp{item.basePrice}</p>
                                                                        </div>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>{item.toppingName}</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>Rp{item.toppingPrice}</p>
                                                                        </div>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>Quantity:</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>{item.quantity}</p>  
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                <div className={classes.grandTotal}>
                                                    <h2 className={`${classes.p} ${classes.pLeft}`}>Grand Total</h2>
                                                    <h2 className={`${classes.p} ${classes.pRight}`}>Rp{order.grandTotal}</h2>
                                                </div>

                                                </div>
                                        </div>
                                    </div>
                                    )
                                })
                            }                 
                        </div> 

                        :
                        <div className={classes.orderContainer}>
                            {
                                terkirim.length === 0 ?
                                <h1>You have yet ordered anything, or your order has not arrived</h1>
                                :
                                terkirim.map((order, index) => {
                                    return(
                                    <div  key={order._id} className={classes.orderItem}>
                                        <div className={classes.orderItemHeader} onClick={() => toggleDescription(order._id)}>
                                            <p className={`${classes.idLabel} ${classes.align}`}>Order-{order._id}</p>
                                            <ExpandMore className={classes.expand} style={{float: 'right', color: '#ffff', marginRight: '20px' }}/>
                                        </div>

                                        <div id={order._id} style={{display: 'none'}} className={classes.orderDetails}>
                                                <div className={classes.orderLabel}>
                                                    <p className={classes.p} style={{float: 'left', marginLeft: '10px', color: '#59534D'}}>{order.orderDate}</p>
                                                    <p className={classes.p} style={{float: 'right', marginRight: '10px', background: '#FFEEDD'}}>Terkirim</p>
                                                </div>

                                                <div>
                                                        {
                                                            order.items.map(item => {
                                                                return(
                                                                    <div className={classes.orderItemDetail}>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>{item.baseName}</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>Rp{item.basePrice}</p>
                                                                        </div>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>{item.toppingName}</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>Rp{item.toppingPrice}</p>
                                                                        </div>
                                                                        <div className={classes.orderLabel}>
                                                                            <p className={`${classes.p} ${classes.pLeft}`}>Quantity:</p>
                                                                            <p className={`${classes.p} ${classes.pRight}`}>{item.quantity}</p>  
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                <div className={classes.grandTotal}>
                                                    <h2 className={`${classes.p} ${classes.pLeft}`}>Grand Total</h2>
                                                    <h2 className={`${classes.p} ${classes.pRight}`}>Rp{order.grandTotal}</h2>
                                                </div>

                                                </div>
                                        </div>
                                    </div>
                                    )
                                })
                            }                 
                        </div> 
                    }

                    
        </Grid>
    )
}

export default Order;