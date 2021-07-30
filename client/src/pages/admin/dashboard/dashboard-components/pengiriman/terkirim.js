import { useState, useEffect } from 'react'
import { ExpandMore } from '@material-ui/icons'


const Terkirim = (props) => {

    const classes = props.style
    const orders = props.ordersArray
    const orderItems = props.status
    const formatCurrency = props.format
    const toggleDescription = props.toggle

    const [ orderSent, setOrderSent ] = useState([])


    useEffect(()=> {
        const sent = orders.filter( order => order.deliveryStatus === 'Terkirim')
        setOrderSent(sent)
      }, [orders])

    return(
        <div>
        <h1 className={classes.h1}>Terkirim</h1>
        <hr className={classes.hr} />
        <br />
        {
          orderSent.map(order => {
            return(
              <div key={order._id} className={classes.orderData}>
                <div className={classes.orderDataMain} onClick={()=>toggleDescription(order._id)}>
                  <p className={`${classes.orderDataMainP} ${classes.alignCenter}`}>Order-{order._id}</p>
                  <ExpandMore style={{float: 'right', color: '#ffff', marginRight: '20px' }} className={`${classes.alignCenter}`} />
                </div>
                <div id={order._id} style={{display: 'none'}} className={classes.orderDetails}>
                  <div className={classes.leftDetails}>
                      <div className={classes.orderItemContainer}>
                        <h1 style={{marginLeft:'10px'}}>Detil pesanan:</h1>
                          {
                            order.items.map(item => {
                              return(
                                <div key={item.itemId} className={classes.orderItem}>
                                  <h1>Kombinasi: </h1>
                                    <div className={classes.cartItem} style={{marginBottom: 0}}>
                                              <h3 className={`${classes.cartAlign}${classes.right}`}>{item.baseName}</h3>
                                               <p className={`${classes.cartAlign} ${classes.price} ${classes.left}`}>{formatCurrency(item.basePrice)}</p>
                                         </div>
                                          <div className={classes.cartItem}>
                                              <p  className={`${classes.cartAlign}`}>{item.toppingName}</p>
                                              <p  className={`${classes.cartAlign} ${classes.price}`}>{formatCurrency(item.toppingPrice)}</p>
                                          </div>
                                          <hr />
                                          <h1 style={{marginBottom: 0}}>Catatan tambahan:</h1>
                                          <div className={classes.cartItem}>
                                              <p>{item.additionalNote}</p>
                                          </div>
                                          <hr />
                                          <h1>Jumlah: {item.quantity}</h1>
                                          <hr />
                                          <h1>Subtotal: {formatCurrency(item.totalPrice)}</h1>
                                </div>
                              )
                            })
                          }
                      </div>
                      <div className={classes.grandTotal}>
                             <h2 style={{margin: 0}}>Discount: {formatCurrency(order.potonganHarga)}</h2>
                            <h2 style={{margin: 0, fontSize: '27px'}}>Grand Total : {formatCurrency(order.grandTotal)}</h2>                      </div>
                      </div>
                  <div className={classes.rightDetails}>
                    <div className={classes.sendingStatus}>
                      <h1 style={{margin: 0}}>Status Pengiriman:</h1>
                        {
                          orderItems.map((item, index) => {
                            return(
                              <div key={index} className={classes.statusTextContainer} style={item === 'Terkirim' ? {backgroundColor: '#EBC154'} : {backgroundColor: '#ffff'}}>
                                {item}
                              </div>
                            )
                          })
                        }
                    </div>
                    <div className={classes.userAddress}>
                        <h1>Pelanggan: {order.user.username}</h1>
                        <h1 style={{marginBottom: 0}}>Alamat:</h1>
                        <br />
                        <p style={{marginTop: 0, fontSize: '16px'}}>{order.user.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
}

export default Terkirim;