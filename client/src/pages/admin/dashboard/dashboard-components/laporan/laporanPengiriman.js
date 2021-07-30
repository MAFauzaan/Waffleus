import { useState } from 'react'
import { Button } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'
import moment from 'moment'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import Logo from '../../../../../resources/logo.png'

const LaporanPengiriman = (props) => {

    const classes = props.style
    const orderTerkirim = props.orderTerkirim
    const orderTerkirimLapPengiriman = props.orderTerkirimLapPengiriman
    
    const [ inputLaporanPengiriman, setInputLaporanPengiriman ] = useState({
        tanggalAwal: "", 
        tanggalAkhir: ""
      })

    const [ foundLaporanPengiriman, setFoundLaporanPengiriman ] = useState([])
    const flattenedLaporanPengiriman = foundLaporanPengiriman.flat()

  const findLaporanPengiriman =  (beginning, end) => {
    let dateArray =[];
    let currentDate = moment(beginning)
    let endDate = moment(end)
    let filteredArray;


    while( currentDate <= endDate ) {
      let curr = currentDate.format('YYYY-MM-DD')
      const foundOrder = orderTerkirimLapPengiriman.filter(order => order.orderDate === curr)
      dateArray.push(foundOrder)
      currentDate = moment(currentDate).add(1, 'days')
    }

    filteredArray = dateArray.filter(el => el.length !== 0)

    setFoundLaporanPengiriman(filteredArray)
    
  }

  const resetLaporanPengiriman = () => {
        setFoundLaporanPengiriman([])
        setInputLaporanPengiriman({
            tanggalAwal: "", 
            tanggalAkhir: ""
        })
  }

    const convert = () => {
      const unit = 'pt'
      const size = 'a4'
      const orientation = 'landscape' 

      const doc = new jsPDF(orientation, unit, size)
      doc.setFontSize(14)

      let image = new Image()
      image.src= Logo

      const title ='Laporan Pengiriman'
      const tanggalAwal = `Tanggal Awal: ${inputLaporanPengiriman.tanggalAwal}`
      const tanggalAkhir = `Tanggal Akhir: ${inputLaporanPengiriman.tanggalAkhir}`

      const day = new Date();
      const dd = String(day.getDate()).padStart(2, '0');
      const mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = day.getFullYear();

      const today = `${yyyy} - ${mm} - ${dd}`
      const header = [["No", "Order Id", "Nama Pelanggan", "Tanggal Kirim", "Alamat", "Nama Produk", "Harga(Rp)", "Kuantitas", "Total Harga(Rp)"]]
    
      const data = flattenedLaporanPengiriman.map((order, index) =>  [
        index+1,  
        order._id,
        order.user.username, 
        order.orderDate, 
        order.user.address, 
        order.items.map(item => item.baseName.concat(" ", item.toppingName)), 
        order.items.map(item => item.totalPrice), 
        order.items.map(item => item.quantity),  
        order.grandTotal
      ])

      const body = [...data, ["", "","", "", "", "", "", "GrandTotal", flattenedLaporanPengiriman.reduce((b, a) => b + +a.grandTotal, 0)]]

      doc.setFontSize(14)
      doc.setTextColor('#706F6F')
      doc.text('WAFFLE US', 380, 50)

      doc.setFontSize(10)
      doc.setTextColor("#706F6F")
      doc.text('Jl. Bahari I No.55, RT.10/RW.7, Gandaria Sel., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta, 12420', 130, 85)
      
      doc.setFontSize(14)
      doc.setTextColor("#000000")
      doc.text(title, 360, 150)

      doc.setFontSize(12)
      doc.setTextColor("#403A3A")
      doc.text(tanggalAwal, 40, 185)

      doc.setFontSize(12)
      doc.setTextColor("#403A3A")
      doc.text(tanggalAkhir, 40, 210)

      doc.setFontSize(12)
      doc.setTextColor("#403A3A")
      doc.text(today, 620, 125)

      doc.autoTable({
        startY: 230,
        head: header,
        body: body,
        didDrawPage: function(data) {
          doc.setFontSize(14);
          doc.setTextColor(40);
          doc.setFont('normal');
          doc.addImage(image, 'PNG', 40, 20, 90, 90)
          doc.line(700, 110, 100, 110);
        },  
      })
      doc.save('laporanPengiriman.pdf')
    }

    return(
        <div>
              <h1 className={classes.h1}>Laporan Pengiriman</h1>
              <hr className={classes.hr}/>
              <div className={classes.insertContainer}>
                 <div className={classes.insertItem}>
                    <h1 className={`${classes.insertComponent} ${classes.gap}`} >Tanggal Awal:</h1>
                    <input 
                        type = "date"
                        className={`${classes.insertComponent} ${classes.input}`} 
                        onChange={(e) => setInputLaporanPengiriman({...inputLaporanPengiriman, tanggalAwal: e.target.value})}
                        value={inputLaporanPengiriman.tanggalAwal}
                    />
                 </div>

                 <div className={classes.insertItem} onMouseEnter={() => "Bulan/Tanggal/Tahun"}>
                    <h1 className={`${classes.insertComponent} ${classes.gap}`} >Tanggal Akhir:</h1>
                    <input 
                        type = "date"
                        className={`${classes.insertComponent} ${classes.input}`} 
                        onChange={(e) => setInputLaporanPengiriman({...inputLaporanPengiriman, tanggalAkhir: e.target.value})}
                        value={inputLaporanPengiriman.tanggalAkhir}
                    />                 
                  </div>

                <Button 
                    className={classes.promoSubmit}
                    onClick={() => findLaporanPengiriman(inputLaporanPengiriman.tanggalAwal, inputLaporanPengiriman.tanggalAkhir)}
                >
                  Tampilkan
                </Button>
               <Button className={classes.refresh} onClick={resetLaporanPengiriman}><Refresh /></Button>
               <Button className={classes.promoSubmit} onClick={convert}>Convert to pdf</Button>
              </div>
              
              <table style={{width: '100%', background: '#ffff'}} className={classes.table}>
                <thead>
                  <tr >
                    <th className={classes.table}>No</th>
                    <th className={classes.table}>Order Id</th>
                    <th className={classes.table}>Nama Pelanggan</th>
                    <th className={classes.table}>Tanggal Kirim</th>
                    <th className={classes.table}>Alamat</th>
                    <th className={classes.table}>Nama Produk</th>
                    <th className={classes.table}>Harga(Rp)</th>
                    <th className={classes.table}>Kuantitas</th>
                    <th className={classes.table}>Total Harga(Rp)</th>
                  </tr>
                </thead>
                  {
                    flattenedLaporanPengiriman.length === 0 ?
                    <tbody>
                      {
                        orderTerkirim.map((order, index) => {
                          return(
                            <tr key={index+1}>
                              <td className={classes.table}>{index+1}</td>
                              <td className={classes.table}>{order._id}</td>
                              <td className={classes.table}>{order.user.username}</td>
                              <td className={classes.table}>{order.orderDate}</td>
                              <td className={classes.table}>{order.user.address}</td>
                              <td className={classes.table}>
                                <div>
                                {order.items.map(item => {
                                    return( 
                                      <p>{item.baseName.concat(" ", item.toppingName)}</p>
                                    )
                                })}
                                </div>
                              </td>
                              <td className={classes.table}>
                                <div>
                                  {order.items.map(item => {
                                      return(
                                        <p>{item.totalPrice}</p>
                                      )
                                  })}
                                </div>
                              </td>
                              <td className={classes.table}>
                                <div>
                                    {order.items.map(item => {
                                        return(
                                          <p>{item.quantity}</p>
                                       )
                                    })}
                                </div>
                              </td>
                              <td className={classes.table}>{`${order.grandTotal}(dsc${order.potonganHarga})`}</td>
                            </tr>
                          )
                        })
                      }
                         <tr>
                              <td colSpan="7" className={classes.tableGrandTotal}>Grand Total:</td>
                              <td colSpan="2" className={`${classes.table} ${classes.total}`}>Rp{orderTerkirim.reduce((b, a) => b + +a.grandTotal, 0)},00</td>
                          </tr>
                    </tbody>
                    :
                    <tbody>
                    {
                      flattenedLaporanPengiriman.map((order, index) => {
                        return(
                          <tr key={index+1}>
                            <td className={classes.table}>{index+1}</td>
                            <td className={classes.table}>{order._id}</td>
                            <td className={classes.table}>{order.user.username}</td>
                            <td className={classes.table}>{order.orderDate}</td>
                            <td className={classes.table}>{order.user.address}</td>
                            <td className={classes.table}>
                              <div>
                              {order.items.map(item => {
                                  return(
                                    <p>{item.baseName.concat(" ", item.toppingName)}</p>
                                  )
                              })}
                              </div>
                            </td>
                            <td className={classes.table}>
                              <div>
                                {order.items.map(item => {
                                    return(
                                      <p>{item.totalPrice}</p>
                                    )
                                })}
                              </div>
                            </td>
                            <td className={classes.table}>
                              <div>
                                  {order.items.map(item => {
                                      return(
                                        <p>{item.quantity}</p>
                                     )
                                  })}
                              </div>
                            </td>
                            <td className={classes.table}>{order.grandTotal}</td>
                          </tr>
                        )
                      })
                    }
                       <tr>
                            <td colSpan="7" className={classes.tableGrandTotal}>Grand Total:</td>
                            <td colSpan="2" className={`${classes.table} ${classes.total}`}>Rp.{flattenedLaporanPengiriman.reduce((b, a) => b + +a.grandTotal, 0)},00</td>
                        </tr>
                  </tbody>
                  } 
              </table>
            </div>
    )
}

export default LaporanPengiriman