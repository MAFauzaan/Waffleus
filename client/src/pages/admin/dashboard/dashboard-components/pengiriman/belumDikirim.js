import { useState, useEffect } from 'react'
import { ExpandMore } from '@material-ui/icons'
import axios from 'axios'
import jsPDF from 'jspdf'


import Logo from '../../../../../resources/logo.png'


const BelumDikirim = (props) => {

    const classes = props.style
    const orders = props.ordersArray
    const orderItems = props.status
    const formatCurrency = props.format
    const toggleDescription = props.toggle

    //Hook
    const [ unsentOrder, setUnsentOrder ] = useState([])

    //UseEffect
    useEffect(()=>{
        const unsent = orders.filter(order => order.deliveryStatus === 'Belum dikirim')
        setUnsentOrder(unsent)
      }, [orders])

    //Functions
    const changeToBeingSent = (id) => {
        const itemId = id
        axios({
          method: 'POST',
          data: {
            id: itemId
          },
          url: 'http://localhost:4000/deliverystatus/beingsent'
        })
    }

    const cetakNota = (id) => {

      const foundOrder =  unsentOrder.find(order => order._id === id)

      const unit = 'pt'
      const size = 'a6'
      const orientation = 'portrait' 

      const doc = new jsPDF(orientation, unit, size)
      doc.setFontSize(14)

      let image = new Image()
      image.src= Logo

      const title ='Detil Pesanan'

      const date = foundOrder.orderDate
          
      const header = [["Order Item(s)", " "]]
    
      const data = foundOrder.items.map((order) =>  [
        order.baseName.concat(" ", order.toppingName, " ", `x(${order.quantity})`),
        `Rp${(order.basePrice + order.toppingPrice)*order.quantity}`
      ])

      const processedData = [...data,  ["", ""], ["Discount", `Rp${foundOrder.potonganHarga}`], ["Grand Total",  `Rp${foundOrder.grandTotal}`]]

      doc.setFontSize(16)
      doc.setTextColor('#F7A72C')
      doc.text('WAFFLE US', 60, 30)

      doc.setFontSize(6)
      doc.setTextColor("#706F6F")
      doc.text('Jl. Bahari I No.55, RT.10/RW.7,Gandaria Sel., Kec. Cilandak,Kota Jakarta Selatan', 60, 42 )

      doc.setFontSize(6)
      doc.setTextColor("#706F6F")
      doc.text('Daerah Khusus Ibukota Jakarta, 12420', 60, 52 ) 
      
      doc.setFontSize(14)
      doc.setTextColor("#000000")
      doc.text(title, 13, 130)

      doc.setFontSize(10)
      doc.setTextColor("#403A3A")
      doc.text(`Order-`, 13, 80)

      doc.setFontSize(10)
      doc.setTextColor("#403A3A")
      doc.text(`${id}`, 13, 90)

      
      doc.setFontSize(10)
      doc.setTextColor("#403A3A")
      doc.text(date, 220, 80)

      doc.setFontSize(7)
      doc.setTextColor("red")
      doc.text('*Grand Total belum termasuk ongkos kirim COD', 13, 390)

      doc.setFontSize(7)
      doc.setTextColor("red")
      doc.text('*Ongkos pengiriman bertarif Rp 2,000 / km (dari lokasi fisik usaha)', 13, 400)



      doc.autoTable({
        theme: 'plain',
        startY: 145,
        head: header,
        body: processedData,
        didDrawPage: function(data) {
          doc.setFontSize(14);
          doc.setTextColor(40);
          doc.setFont('normal');
          doc.addImage(image, 'PNG', 0, 0, 70, 70)
        },  
      })
      doc.save(`invoice-${id}.pdf`)
    }

    return(
        <div>
              <h1 className={classes.h1}>Belum dikirim</h1>
              <hr className={classes.hr} />
              <br />
              {
                unsentOrder.map(order => {
                  return(
                    <div key={order._id} className={classes.orderData}>
                      <div className={classes.orderDataMain} onClick={()=>toggleDescription(order._id)}>
                        <p className={`${classes.orderDataMainP} ${classes.alignCenter}`}>Order-{order._id}</p>
                        <button className={`${classes.cetakNota} ${classes.alignCenter}`}  onClick={() => cetakNota(order._id )}>Cetak Nota</button>
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
                                <h2 style={{margin: 0, fontSize: '27px'}}>Grand Total : {formatCurrency(order.grandTotal)}</h2>
                            </div>
                        </div>
                        <div className={classes.rightDetails}>
                          <div className={classes.sendingStatus}>
                            <h1 style={{margin: 0}}>Status Pengiriman:</h1>
                              {
                                orderItems.map((item, index) => {
                                  return(
                                    <div key={index}>
                                      {
                                        item === 'Sedang Dikirim' ?
                                          <div 
                                            id={index}
                                            className={classes.statusTextContainer} 
                                            style={item === 'Belum Dikirim' ? {backgroundColor: '#EBC154'} : {backgroundColor: '#ffff'}}
                                            onClick={() => changeToBeingSent(order._id)}
                                          >
                                            {item}
                                         </div>
                                         :
                                         <div 
                                            key={index}
                                            id={index}
                                            className={classes.statusTextContainer} 
                                            style={item === 'Belum Dikirim' ? {backgroundColor: '#EBC154'} : {backgroundColor: '#ffff'}}
                                          >
                                          {item}
                                          </div>
                                      }
                                    
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

export default BelumDikirim

