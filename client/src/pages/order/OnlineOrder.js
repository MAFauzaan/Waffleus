import { Container, Grid, Button, Paper, TextField, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import {  useEffect, useState } from 'react'    
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../../store/cartSlice'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import useStyles from './OrderStyles'
import {  ShoppingCartOutlined, Notes, Create, LocationOn, ExpandMore } from '@material-ui/icons'

const OnlineOrder = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showCart = useSelector( state => state.cart.items) 
    const grandTotal = useSelector( state => state.cart.grandTotal)
    const user  = useSelector( state => state.user.user)
    const cartState = useSelector(state => state.cart)

    const [ clickedNote, setClickedNote ] = useState(false)


    const [ changeNote, setChangeNote ] = useState("")

    
    const [ order, setOrder ] = useState({
        itemId: " ",
        baseId: null,
        baseName: null,
        basePrice: 0,
        topping: null,
        toppingName: null,
        toppingPrice: 0,
        additionalNote: "",
        totalPrice: 0
        }
    )    

    const [promos, setPromos] = useState([])

    const [ chosenPromo, setChosenPromo ] = useState({
        _id: "",
        promoName: "No coupon applied",
        potongan: ""
    })

    const [ showPromoItem, setShowPromoItem ] = useState(false)

    const  {  totalPrice } = order;

    const [ base, setBase ] = useState([])
    const [ toppings ,setToppings ] = useState([])

    const [ baseBg, setBaseBg ] = useState({
        waffle: '#ffff',
        croffle: '#ffff'
    })

    const [ toppingBg, setToppingBg ] = useState({
        chocolate: '#ffff',
        cheese: '#ffff',
        caramel: '#ffff',
        oreo: '#ffff',
        milo: '#ffff'
    })

    const [ sendNewOrder, setSendNewOrder ] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:4000/item/base/get')        
            .then(res => setBase(res.data))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:4000/item/topping/get')        
            .then(res => setToppings(res.data))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:4000/promo/newpromo')
        .then(res => {
            setPromos(res.data)
        })
    }, [])

    //Input Handlers
   const BaseHandler = (id, price, name) => {
        const randomId = uuidv4();
        console.log(name)
        if(name === 'Waffle') {
            setBaseBg({waffle: '#dededf', croffle: '#ffff'})
        } else {
            setBaseBg({waffle: '#ffff', croffle: '#dededf'})
        }


        if(order.basePrice === 0) {
            setOrder({
                ...order, 
                baseId: id, 
                baseName: name, 
                basePrice: price, 
                totalPrice: totalPrice + price, 
                itemId: randomId
            })
        } else if(order.basePrice === 5000){
            setOrder({
                ...order,
                baseId: null,
                baseName: null,
                basePrice: 0,
                totalPrice: totalPrice-order.basePrice
                })
        }
   }

   const toppingHandler = (id, price, name) => {

    if(name === 'Chocolate') {
        setToppingBg({
        chocolate: '#dededf',
        cheese: '#ffff',
        caramel: '#ffff',
        oreo: '#ffff',
        milo: '#ffff'
    })
    } else if (name === 'Cheese') {
        setToppingBg({
        chocolate: '#ffff',
        cheese: '#dededf',
        caramel: '#ffff',
        oreo: '#ffff',
        milo: '#ffff'
    })
    } else if (name === 'Caramel') {
        setToppingBg({
        chocolate: '#ffff',
        cheese: '#ffff',
        caramel: '#dededf',
        oreo: '#ffff',
        milo: '#ffff'
    }) 
    } else if (name === 'Oreo') {
        setToppingBg({
        chocolate: '#ffff',
        cheese: '#ffff',
        caramel: '#ffff',
        oreo: '#dededf',
        milo: '#ffff'
    }) 
    } else if (name === 'Milo') {
        setToppingBg({
        chocolate: '#ffff',
        cheese: '#ffff',
        caramel: '#ffff',
        oreo: '#ffff',
        milo: '#dededf'
    }) 
    }
    
    if(order.baseId !== null){
       if(order.toppingPrice === 0) {   
            setOrder({
                ...order, 
                topping: id, 
                toppingName: name,  
                toppingPrice: price, 
                totalPrice: totalPrice + price
            })
           
       } else if(order.toppingPrice === 5000) {
           setOrder({
               ...order,
               topping: null,
               toppingName: null,
               toppingPrice: 0,
               totalPrice: totalPrice-order.toppingPrice
           })
          
       }
    }
   }

   const textFieldHandler = (e) => {
       setOrder({...order, additionalNote: e.target.value})
   }

   const handleSubmit = (e) => {
       e.preventDefault();

       if (order.baseId && order.topping !== null) {
            if(chosenPromo !== null) {
                dispatch(cartActions.addItemToCart([order, chosenPromo.potongan]))
            } else {
                dispatch(cartActions.addItemToCart([order]))
            }
            dispatch(cartActions.countGrandTotal())
            dispatch(cartActions.addUser(user))
       }

       setOrder({
        itemId: " ",
        baseId: null,
        baseName: null,
        basePrice: 0,
        topping: null,
        toppingName: null,
        toppingPrice: 0,
        additionalNote: "",
        totalPrice: 0
       })

       setBaseBg({
        waffle: '#ffff',
        croffle: '#ffff'
       })

       setToppingBg({
        chocolate: '#ffff',
        cheese: '#ffff',
        caramel: '#ffff',
        oreo: '#ffff',
        milo: '#ffff'
       })


    //    dispatch(cartActions.addItemToCart(order))
    if(window.innerWidth > 959) {
        document.documentElement.scrollTop = 0;
    }
   }


   const removeItem = (id) => {
        dispatch(cartActions.removeItemFromCart(id))
   }

   const viewCartTextField = (id) => {
       setClickedNote(!clickedNote)
   }

   const reduceItem = (id) => {

        const foundItem = showCart.find(item => item.itemId === id)
        const quantity = foundItem.quantity

       if(quantity > 1){
            dispatch(cartActions.reduceItem(id))
            dispatch(cartActions.countGrandTotal())
       }
   }

   const addItem = (id) => {
        dispatch(cartActions.addItem(id))
        dispatch(cartActions.countGrandTotal())
   }

   const inputChange = (id, note) => {
        dispatch(cartActions.rewriteTextField([id, note]))
   }

   const rewriteNote = (e) => {
        setChangeNote(e.target.value)
   }

   const formatCurrency = (item) => {
       return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item)
   }

   const choosePromo = (promo) => {
    setChosenPromo(promo)
    setShowPromoItem(false)
   }

   const sendOrder = () => {
    
        const setOrderDate = () => {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1; 
            let yyyy = today.getFullYear();

            let orderDate;

            mm < 10 ?
              orderDate = yyyy+'-0'+mm+'-'+dd
            :
            orderDate = yyyy+'-'+mm+'-'+dd

            return orderDate
        }

         axios({
            method: 'POST',
            data: {
                user: cartState.user,
                items: cartState.items,
                totalQuantity: cartState.totalQuantity,
                grandTotal:  cartState.grandTotal,
                orderDate: setOrderDate(),
                deliveryStatus: 'Belum dikirim',
                potonganHarga: cartState.discount
            },
            withCredentials: true,
            url: 'http://localhost:4000/order'
        })

        setSendNewOrder(true)

        setTimeout(function(){ window.location.reload() }, 1000);

        
    }



   //Component

   
    const Base = base.map(base => {
        return (
            <Grid 
                 key={base._id} 
                 style={base.baseName === 'Waffle' ? {backgroundColor: baseBg.waffle} : {backgroundColor: baseBg.croffle}}
                 item
                 className={classes.base}   
                 onClick={() => BaseHandler(base._id, base.price, base.baseName)}
            >
                <img 
                    src={base.img} 
                    className={classes.baseItem}
                    alt={base.name}
                />
                <p>{base.baseName}</p>
            </Grid>
        )
    })

    const Toppings = toppings.map(topping => {
        return (
                <div 
                    style = {
                        topping.toppingName ===  'Chocolate' ?
                        {backgroundColor: toppingBg.chocolate}
                        :
                        topping.toppingName ===  'Cheese' ?
                        {backgroundColor: toppingBg.cheese}
                        :
                        topping.toppingName ===  'Caramel' ?
                        {backgroundColor: toppingBg.caramel}
                        :
                        topping.toppingName ===  'Oreo' ?
                        {backgroundColor: toppingBg.oreo}
                        :
                        {backgroundColor: toppingBg.milo}
                    }
                    key={topping._id} 
                    className={`${classes.topping} ${classes.align}`} 
                    onClick={() => toppingHandler(topping._id, topping.price, topping.toppingName)}
                >
                    <img className={classes.align} src={topping.img} alt={topping.toppingName} />
                    <p className={`${classes.align}`}>{topping.toppingName}</p>
                 </div>
        )   
    })

    return(
        <Container className={classes.container} maxWidth={false}>
            {
                sendNewOrder === true ?
                <Snackbar open={sendNewOrder} autoHideDuration={3000} onClose={() => setSendNewOrder(false)}>
                    <Alert severity="success">Your order has been sent to the system</Alert>
                </Snackbar>
                :
                null
            }
            <Grid container className={classes.gridContainer} spacing={3}>
                {

                }
                <Grid  item className={classes.items} xs={12} md={8}>
                    <div className={classes.itemsContainer}>
                        <h2 className={classes.orderLabel}>What do you want to have?</h2>


                        {/* Base */}
                        <h2 className={`${classes.sequence} ${classes.firstSequence}`}>1. Choose the base (10k)</h2>                      
                        <Grid className={classes.baseContainer} container>
                            {Base}
                        </Grid>
                      


                        {/* Topping */}
                        <h2 className={classes.sequence}>2. Choose the topping (5k)</h2>
                        <Grid className={classes.toppingsContainer}>
                            <div className={classes.toppings}>
                                {Toppings}
                            </div>

                            {/* Additional Note */}
                            <h2 className={classes.sequence}>3. Additional note</h2>
                            <TextField 
                                className={classes.textField} 
                                color="primary" 
                                multiline 
                                rows={10} 
                                variant="outlined" 
                                autoComplete='off' 
                                placeholder= "e.g., more cheese please..."
                                value={order.additionalNote}
                                onChange={textFieldHandler}
                            />
                            <h2 className={classes.sequence} style={{marginBottom: '50px'}}>4. Enter a promo coupon:</h2>
                                <div onClick={() => setShowPromoItem(!showPromoItem)} className={classes.promo}>
                                    <p style={{flex: '50%'}}>{ chosenPromo ? chosenPromo.promoName : "Choose one promo"}</p> 
                                    <ExpandMore className={classes.expand}/>
                                </div>
                                {
                                    showPromoItem &&
                                    <Paper elevation={10} className={classes.promoContainer}>
                                        {
                                            promos.map(promo => {
                                                return(
                                                    <div key={promo._id} onClick={() => choosePromo(promo)} className={classes.promoItem}>
                                                        <h2>{promo.promoName}</h2>
                                                        <hr className={classes.hr}/>
                                                        <br/>
                                                        <p>Diskon Rp{promo.potongan} untuk total harga!</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Paper>
                                }
                            <br/>
                            <Button className={`${classes.orderButton}`} onClick={handleSubmit}><ShoppingCartOutlined style={{marginRight: '5px'}}/>Add to cart</Button>
                        </Grid>

                    </div>  
                </Grid>


                <Grid item className={classes.cart} xs={12} md={4}>
                    <Paper className={classes.cartPaper}>
                        <p className={classes.cartLabel}><ShoppingCartOutlined /> Your cart</p>
                        <hr className={classes.cartHr}/>
                        {
                         showCart.length === 0?
                            <p className={classes.nothing}>There's nothing in the cart yet</p>
                        :
                        <div>
                
                           <ul style={{padding: 0}}>
                               {
                                   showCart.map(item => {
                                       return(
                                           <div id={item.itemId} key={item.itemId} className={classes.cartOrderSet}>
                                               <button title="Remove from cart" className={classes.delete} onClick={()=> removeItem(item.itemId)}>x</button>
                                               <br />
                                               <div className={classes.cartItem}>
                                                    <h3 className={`${classes.cartAlign}`}>{item.baseName}</h3>
                                                     <p className={`${classes.cartAlign} ${classes.price}`}>{formatCurrency(item.basePrice)}</p>
                                               </div>
                                                <div className={classes.cartItem}>
                                                    <p  className={`${classes.cartAlign}`}>{item.toppingName}</p>
                                                    <p  className={`${classes.cartAlign} ${classes.price}`}>{formatCurrency(item.toppingPrice)}</p>
                                                </div>
                                                <div className={`${classes.cartItem} ${classes.center}`}>
                                                    <Button title="view note" onClick={()=> {viewCartTextField(item.itemId)}}><Notes /></Button>
                                                    {
                                                        <div>
                                                        <TextField  
                                                            className={classes.cartTextField} 
                                                            color="primary" 
                                                            variant="outlined" 
                                                            defaultValue={item.additionalNote}
                                                            onChange = {rewriteNote}
                                                        />
                                                        <Button className={classes.rewriteButton} title="rewrite note" onClick={()=> inputChange(item.itemId, changeNote)}><Create/></Button>
                                                        </div>
                                                      
                                                    }
                                                </div>
                                                <div className={classes.cartItem}>
                                                    <p className={classes.cartAlign}>Amount</p>
                                                    <div className={`${classes.cartAlign} ${classes.price} ${classes.quantityAmount}`}>
                                                        <div style={{display: 'inline-block',  position:'relative', top: '15%', transform:  'translateY(15%)'}}>
                                                            <button className={classes.amountButton} onClick={() =>reduceItem(item.itemId) }>-</button>
                                                            <input className={classes.quantity} value={item.quantity} variant='outlined'/>
                                                            <button className={classes.amountButton} onClick={() => addItem(item.itemId)}>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className={classes.cartItem}>
                                                    <h3 className={`${classes.cartAlign}`}>Item Price</h3>
                                                    <p  className={`${classes.cartAlign} ${classes.price}`}>{formatCurrency(item.totalPrice)}</p>
                                                </div>
                                           </div>
                                       )
                                   })
                               }
                           </ul>
                           <hr />
                           <div className={classes.cartItem}>
                                <h3 className={`${classes.cartAlign}`}>Coupon discount({chosenPromo.promoName})</h3>
                                {
                                    chosenPromo !== null &&
                                    <h3>-{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(chosenPromo.potongan)}</h3>
                                }
                            </div>
                            <div className={classes.cartItem}>
                               <h2 className={`${classes.cartAlign}`}>Total Price</h2>
                               <h2 className={`${classes.cartAlign} ${classes.price}`}>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(grandTotal)}</h2>
                            </div>
                            <hr />
                            <div className={classes.location}>
                               <h3><LocationOn />Send to:</h3>
                               <p style={{marginTop: 0, marginLeft: '10px'}}>{user.address}</p>
                            </div>
                            <p style={{marginTop: '50px'}}>*Harga belum termasuk ongkos kirim, per km Rp2.000,00</p>
                            <Button fullWidth className={classes.cartButton} onClick={sendOrder}>Order</Button>
                        </div>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default OnlineOrder