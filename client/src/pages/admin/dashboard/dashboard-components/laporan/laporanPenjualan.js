import { useState } from 'react'
import { Button } from '@material-ui/core'
import { Refresh } from '@material-ui/icons'
import moment from 'moment'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import Logo from '../../../../../resources/logo.png'


const LaporanPenjualan = (props) => {

    const classes = props.style
    const [ opt, setOpt ] = useState("")
    const orderTerkirimLapPenjualan = props.orderTerkirimLapPenjualan
    const orderTerkirim = props.orderTerkirim


    const [ inputLaporanPenjualan, setInputLaporanPenjualan ] = useState({
        tanggalAwal: "", 
        tanggalAkhir: ""
    })
    
    const [ inputLaporanPenjualanTopping, setInputLaporanPenjualanTopping ] = useState({
        tanggalAwal: "", 
        tanggalAkhir: ""
    })



    const [ foundLaporanPenjualan, setFoundLaporanPenjualan ] = useState([])
    const flattenedLaporanPenjualan = foundLaporanPenjualan.flat()

    const [ foundLaporanPenjualanTopping, setFoundLaporanPenjualanTopping ] = useState([])
    const flattenedLaporanPenjualanTopping = foundLaporanPenjualanTopping.flat()


    //Functions
    const handleChange =(e) =>{
        setOpt(e.target.value)
    }
  
    const findLaporanPenjualan =  (beginning, end) => {
    let dateArray =[];
    let currentDate = moment(beginning)
    let endDate = moment(end)
    let filteredArray;


    while( currentDate <= endDate ) {
      let curr = currentDate.format('YYYY-MM-DD')
      const foundOrder = orderTerkirimLapPenjualan.filter(order => order.orderDate === curr)
      dateArray.push(foundOrder)
      currentDate = moment(currentDate).add(1, 'days')
    }

    filteredArray = dateArray.filter(el => el.length !== 0)

    setFoundLaporanPenjualan(filteredArray)

  }

    const findLaporanPenjualanTopping =  (beginning, end) => {
    let dateArray =[];
    let currentDate = moment(beginning)
    let endDate = moment(end)
    let filteredArray;


    while( currentDate <= endDate ) {
      let curr = currentDate.format('YYYY-MM-DD')
      const foundOrder = orderTerkirimLapPenjualan.filter(order => order.orderDate === curr)
      dateArray.push(foundOrder)
      currentDate = moment(currentDate).add(1, 'days')
    }

    filteredArray = dateArray.filter(el => el.length !== 0)

    setFoundLaporanPenjualanTopping(filteredArray)

    
  }

  const resetLaporanPenjualan = () => {
    setFoundLaporanPenjualan([])
    setInputLaporanPenjualan({
     tanggalAwal: "", 
     tanggalAkhir: ""
   })
  }
  
  const resetLaporanPenjualanTopping = () => {
    setFoundLaporanPenjualanTopping([])
    setInputLaporanPenjualanTopping({
     tanggalAwal: "", 
     tanggalAkhir: ""
   })
  }

  
const findGrandTotalPenjualanBase = () => {
    const array = orderTerkirim.map(order => {
      return (order.items)
    })
  
    const flattenedArray = array.flat()
    const multiplyAmount = flattenedArray.map(item => item.basePrice * item.quantity)
  
    return multiplyAmount.reduce( (a,b) => (a+b), 0)
  
  }
  
  const findGrandTotalPenjualanBaseFiltered = () => {
    const array = flattenedLaporanPenjualan.map(order => {
      return (order.items)
    })
  
    const flattenedArray = array.flat()
    const multiplyAmount = flattenedArray.map(item => item.basePrice * item.quantity)
  
    return multiplyAmount.reduce((a,b) => (a+b), 0).toString()
  
  }
  
  const findGrandTotalPenjualanTopping = () => {
    const array = orderTerkirim.map(order => {
      return (order.items)
    })
  
    const flattenedArray = array.flat()
    const multiplyAmount = flattenedArray.map(item => item.toppingPrice * item.quantity)
  
    return multiplyAmount.reduce( (a,b) => (a+b), 0)
  
  }
  
  const findGrandTotalPenjualanToppingFiltered = () => {
    const array = flattenedLaporanPenjualanTopping.map(order => {
      return (order.items)
    })
  
    const flattenedArray = array.flat()
    const multiplyAmount = flattenedArray.map(item => item.toppingPrice * item.quantity)
  
    return multiplyAmount.reduce( (a,b) => (a+b), 0).toString()
  
  }

  const convert = () => {
    const unit = 'pt'
    const size = 'a4'
    const orientation = 'landscape' 
    let tanggalAwal
    let tanggalAkhir
    let header
    let data
    let grandTotal


    const doc = new jsPDF(orientation, unit, size)
    doc.setFontSize(14)

    let image = new Image()
    image.src= Logo

    const title = `Laporan Penjualan ${opt}`

    if(opt === 'base') {
       tanggalAwal = `Tanggal Awal: ${inputLaporanPenjualan.tanggalAwal}`
       tanggalAkhir = `Tanggal Akhir: ${inputLaporanPenjualan.tanggalAkhir}`
       header = [["No", "Tanggal Pemesanan", "Nama Base", "Harga Produk", "Kuantitas", "Total(Rp)"]]
       data =   flattenedLaporanPenjualan.map((order, index) =>  [
        index+1,  
        order.orderDate, 
        order.items.map(item => item.baseName), 
        order.items.map(item => item.basePrice), 
        order.items.map(item => item.quantity),  
        order.items.map(item => item.basePrice * item.quantity),  
      ]) 
      grandTotal = findGrandTotalPenjualanBaseFiltered()
    } else {
       tanggalAwal = `Tanggal Awal: ${inputLaporanPenjualanTopping.tanggalAwal}`
       tanggalAkhir = `Tanggal Akhir: ${inputLaporanPenjualanTopping.tanggalAkhir}`
       header = [["No", "Tanggal Pemesanan", "Nama Topping", "Harga Produk", "Kuantitas", "Total(Rp)"]]
       data = flattenedLaporanPenjualanTopping.map((order, index) =>  [
        index+1,  
        order.orderDate, 
        order.items.map(item => item.toppingName), 
        order.items.map(item => item.toppingPrice), 
        order.items.map(item => item.quantity),  
        order.items.map(item => item.toppingPrice * item.quantity),  
      ])   
      grandTotal = findGrandTotalPenjualanToppingFiltered()
    }



    const body = [...data, ["", "","", "", "GrandTotal", grandTotal ]]
    

    const day = new Date();
    const dd = String(day.getDate()).padStart(2, '0');
    const mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = day.getFullYear();

    const today = `${yyyy} - ${mm} - ${dd}`


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
      didDrawPage: function() {
        doc.setFontSize(14);    
        doc.setTextColor(40);
        doc.setFont('normal');
        doc.addImage(image, 'PNG', 40, 20, 90, 90)
        doc.line(700, 110, 100, 110);
      },  
    })
    doc.save(`laporanPenjualan${opt}.pdf`)
  }

    return(
        <div>
                <div title="Header">
                   <h1 className={classes.h1}>
                      Laporan Penjualan 
                    <select className={classes.select} name="items" onChange={handleChange}>
                          <option>(Pilih Laporan)</option>
                           <option value="base">Base</option>
                          <option value="topping">Topping</option>
                      </select>
                   </h1>
                   <hr className={classes.hr}/>
                </div>

              {
                opt === 'base' ?

             <div title="base">
              <div className={classes.insertContainer}>
                   <div className={classes.insertItem}>
                    <h1 className={`${classes.insertComponent} ${classes.gap}`} >Tanggal Awal:</h1>
                    <input 
                        type = "date"
                        className={`${classes.insertComponent} ${classes.input}`} 
                        onChange={(e) => setInputLaporanPenjualan({...inputLaporanPenjualan, tanggalAwal: e.target.value})}
                        value={inputLaporanPenjualan.tanggalAwal}
                    />
                 </div>

                 <div className={classes.insertItem} onMouseEnter={() => "Bulan/Tanggal/Tahun"}>
                    <h1 className={`${classes.insertComponent} ${classes.gap}`} >Tanggal Akhir:</h1>
                    <input 
                        type = "date"
                        className={`${classes.insertComponent} ${classes.input}`} 
                        onChange={(e) => setInputLaporanPenjualan({...inputLaporanPenjualan, tanggalAkhir: e.target.value})}
                        value={inputLaporanPenjualan.tanggalAkhir}
                    />                 
                  </div>

                <Button 
                    className={classes.promoSubmit}
                    onClick={() => findLaporanPenjualan(inputLaporanPenjualan.tanggalAwal, inputLaporanPenjualan.tanggalAkhir)}
                >
                  Tampilkan
                </Button>
               <Button className={classes.refresh} onClick={resetLaporanPenjualan}><Refresh /></Button>
               <Button className={classes.promoSubmit} onClick={convert}>Convert to pdf</Button>

              </div>
           
              <table style={{width: '100%', background: '#ffff'}} className={classes.table}>
                <thead>
                  <tr >
                    <th className={classes.table}>No</th>
                    <th className={classes.table}>Tanggal Pemesanan</th>
                    <th className={classes.table}>Nama Base</th>
                    <th className={classes.table}>Harga Produk(Rp)</th>
                    <th className={classes.table}>Kuantitas</th>
                    <th className={classes.table}>Total(Rp)</th>
                  </tr>
                </thead>
                      {
                        flattenedLaporanPenjualan.length === 0 ?

                        <tbody>
                            {orderTerkirim.map((order, index) => {
                              return(
                                <tr key={index+1} className={classes.table}>
                                    <td className={classes.table}>{index + 1}</td>
                                    <td className={classes.table}>{order.orderDate}</td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.baseName}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.basePrice}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.quantity}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.basePrice * item.quantity}</p>
                                          })
                                      }
                                    </td>
                                </tr>
                              )
                            })}
                            <tr className={classes.table}>
                              <td className={classes.tableGrandTotal} colSpan="5">Grand total:</td>
                              <td className={classes.total} colSpan="1">Rp{findGrandTotalPenjualanBase()},00</td>
                            </tr>
                        </tbody>

                            :

                        <tbody>
                            {flattenedLaporanPenjualan.map((order, index) => {
                              return(
                                <tr key={index+1} className={classes.table}>
                                    <td className={classes.table}>{index + 1}</td>
                                    <td className={classes.table}>{order.orderDate}</td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.baseName}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.basePrice}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.quantity}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.basePrice * item.quantity}</p>
                                          })
                                      }
                                    </td>
                                </tr>
                              )
                            })}
                              <tr className={classes.table}>
                              <td className={classes.tableGrandTotal} colSpan="5">Grand total:</td>
                              <td className={classes.total} colSpan="1">Rp{findGrandTotalPenjualanBaseFiltered()},00</td>
                            </tr>
                          </tbody>
                      }
              </table>
           </div>

                :
                
              <div title="topping">
                  <div className={classes.insertContainer}>
                   <div className={classes.insertItem}>
                    <h1 className={`${classes.insertComponent} ${classes.gap}`} >Tanggal Awal:</h1>
                    <input 
                        type = "date"
                        className={`${classes.insertComponent} ${classes.input}`} 
                        onChange={(e) => setInputLaporanPenjualanTopping({...inputLaporanPenjualanTopping, tanggalAwal: e.target.value})}
                        value={inputLaporanPenjualanTopping.tanggalAwal}
                    />
                 </div>

                 <div className={classes.insertItem} onMouseEnter={() => "Bulan/Tanggal/Tahun"}>
                    <h1 className={`${classes.insertComponent} ${classes.gap}`} >Tanggal Akhir:</h1>
                    <input 
                        type = "date"
                        className={`${classes.insertComponent} ${classes.input}`} 
                        onChange={(e) => setInputLaporanPenjualanTopping({...inputLaporanPenjualanTopping, tanggalAkhir: e.target.value})}
                        value={inputLaporanPenjualanTopping.tanggalAkhir}
                    />                 
                  </div>

                <Button 
                    className={classes.promoSubmit}
                    onClick={() => findLaporanPenjualanTopping(inputLaporanPenjualanTopping.tanggalAwal, inputLaporanPenjualanTopping.tanggalAkhir)}
                >
                  Tampilkan
                </Button>
               <Button className={classes.refresh} onClick={resetLaporanPenjualanTopping}><Refresh /></Button>
               <Button className={classes.promoSubmit} onClick={convert}>Convert to pdf</Button>
              </div>
                  <table style={{width: '100%', background: '#ffff'}} className={classes.table}>
                    <thead>
                         <tr >
                            <th className={classes.table}>No</th>
                            <th className={classes.table}>Tanggal Pemesanan</th>
                            <th className={classes.table}>Nama Topping</th>
                            <th className={classes.table}>Harga Produk</th>
                            <th className={classes.table}>Kuantitas</th>
                            <th className={classes.table}>Total(Rp)</th>
                        </tr>
                    </thead>
                    {
                      flattenedLaporanPenjualanTopping.length === 0 ?

                        <tbody>
                             {orderTerkirim.map((order, index) => {
                              return(
                                <tr key={index+1} className={classes.table}>
                                    <td className={classes.table}>{index + 1}</td>
                                    <td className={classes.table}>{order.orderDate}</td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.toppingName}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.toppingPrice}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.quantity}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.toppingPrice * item.quantity}</p>
                                          })
                                      }
                                    </td>
                                </tr>
                              )
                            })}
                            <tr className={classes.table}>
                              <td className={classes.tableGrandTotal} colSpan="5">Grand total:</td>
                              <td className={classes.total} colSpan="1">Rp{findGrandTotalPenjualanTopping()},00</td>
                            </tr>
                        </tbody>

                        :

                        <tbody>
                            {flattenedLaporanPenjualanTopping.map((order, index) => {
                              return(
                                <tr key={index+1} className={classes.table}>
                                    <td className={classes.table}>{index + 1}</td>
                                    <td className={classes.table}>{order.orderDate}</td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.toppingName}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.toppingPrice}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.quantity}</p>
                                          })
                                      }
                                    </td>
                                    <td className={classes.table}>
                                      {
                                          order.items.map((item, idx) => {
                                              return <p key={idx}>{item.toppingPrice * item.quantity}</p>
                                          })
                                      }
                                    </td>
                                </tr>
                              )
                            })}
                              <tr className={classes.table}>
                              <td className={classes.tableGrandTotal} colSpan="5">Grand total:</td>
                              <td className={classes.total} colSpan="1">Rp{findGrandTotalPenjualanToppingFiltered()},00</td>
                            </tr>
                          </tbody>

                    }
                  </table>
             </div>
              }
             
            </div>
    )
}

export default LaporanPenjualan;