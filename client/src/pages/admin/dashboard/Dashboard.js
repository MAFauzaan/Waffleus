import { Drawer, CssBaseline } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { ExpandMore  } from '@material-ui/icons'
import { useDispatch } from 'react-redux';
import { adminActions } from '../../../store/adminSlice';
import axios from 'axios';


import Logo from '../../../resources/logo.png'

import BelumDikirim from './dashboard-components/pengiriman/belumDikirim'
import SedangDikirim from './dashboard-components/pengiriman/sedangDikirim'
import Terkirim from './dashboard-components/pengiriman/terkirim'
import LaporanPenjualan from './dashboard-components/laporan/laporanPenjualan'
import LaporanPemesanan from './dashboard-components/laporan/laporanPemesanan';


import useStyles from './DashboardStyles'
import LaporanPengiriman from './dashboard-components/laporan/laporanPengiriman';
import Input from './dashboard-components/base-topping-input/input';
import Promo from './dashboard-components/promo/promo';

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [ orderDropdown, setOrderDropdown] = useState(false)
  const [ reportDropdown, setReportDropdown] = useState(false)

  //Order hooks
  const [ orders, setOrders ] = useState([])

  const [ orderTerkirim, setOrderTerkirim ] = useState([])

  const [ orderTerkirimLapPengiriman, setOrderTerkirimLapPengiriman ] = useState([])

  const [ orderTerkirimLapPenjualan, setOrderTerkirimLapPenjualan ] = useState([])



  //UI Static data

  const [ status, setStatus ] = useState({
    belumDikirim: false,
    sedangDikirim: false,
    terkirim: false,
    lapPenjualan: false,
    lapPemesanan: false,
    lapPengiriman: false,
    promo: false,
    input: false
  })

  const { belumDikirim, sedangDikirim, terkirim, lapPenjualan, lapPemesanan, lapPengiriman, promo, input } = status

  const orderItems = ['Belum Dikirim', 'Sedang Dikirim', 'Terkirim']
  const reportItems = ['Laporan Penjualan', 'Laporan Pemesanan', 'Laporan Pengiriman']

//UseEffects
  useEffect(() => {
    axios.get('http://localhost:4000/orders')
    .then((res) => {
      const data = res.data
      setOrders(data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [orders])


  useEffect(() => {
    const filterOrderTerkirim = orders.filter(order => order.deliveryStatus === 'Terkirim')
    
    setOrderTerkirim(filterOrderTerkirim)
    setOrderTerkirimLapPengiriman(filterOrderTerkirim)
    setOrderTerkirimLapPenjualan(filterOrderTerkirim)
  }, [orders])

  


  //Functions
  const clickDropdownItem = (item) => {
    if(item === 'Belum Dikirim') {
      setStatus({
        belumDikirim: true,
        sedangDikirim: false,
        terkirim: false,
        lapPenjualan: false,
        lapPemesanan: false,
        lapPengiriman: false,
        promo: false,
        input: false
      })
    } else if(item === 'Sedang Dikirim') {
      setStatus({
        belumDikirim: false,
        sedangDikirim: true,
        terkirim: false,
        lapPenjualan: false,
        lapPemesanan: false,
        lapPengiriman: false,
        promo: false,
        input: false
      })
    } else if(item === 'Terkirim') {
      setStatus({
        belumDikirim: false,
        sedangDikirim: false,
        terkirim: true,
        lapPenjualan: false,
        lapPemesanan: false,
        lapPengiriman: false,
        promo: false,
        input: false 
      })
    } else if(item === 'Laporan Penjualan') {
      setStatus({
        belumDikirim: false,
        sedangDikirim: false,
        terkirim: false,
        lapPenjualan: true,
        lapPemesanan: false,
        lapPengiriman: false,
        promo: false,
        input: false
      })
    } else if(item === 'Laporan Pemesanan') {
      setStatus({
        belumDikirim: false,
        sedangDikirim: false,
        terkirim: false,
        lapPenjualan: false,
        lapPemesanan: true,
        lapPengiriman: false,
        promo: false,
        input: false 
      })
    } else if(item === 'Laporan Pengiriman') {
      setStatus({
        belumDikirim: false,
        sedangDikirim: false,
        terkirim: false,
        lapPenjualan: false,
        lapPemesanan: false,
        lapPengiriman: true,
        promo: false,
        input: false 
      })
    } else if(item === 'Promo') {
      setStatus({
        belumDikirim: false,
        sedangDikirim: false,
        terkirim: false,
        lapPenjualan: false,
        lapPemesanan: false,
        lapPengiriman: false,
        promo: true,
        input: false 
      })
    } else if(item === 'Input') {
      setStatus({
        belumDikirim: false,
        sedangDikirim: false,
        terkirim: false,
        lapPenjualan: false,
        lapPemesanan: false,
        lapPengiriman: false,
        promo: false,
        input: true 
      })
    }
  }

  const formatCurrency = (item) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item)
}

  const toggleDescription = (id) => {
    const viewDesc = document.getElementById(id)

    if(viewDesc.style.display === 'none') {
      viewDesc.style.display = 'flex'
    } else {
      viewDesc.style.display = 'none'
    }
  }

  const logout = async () => {
     dispatch(adminActions.userLogout())

  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
            <div className={classes.logoContainer}>
              <img className={classes.logo} src={Logo} alt="waffleus"/>
            </div>
        </div>      
        
      <div style={{overflow: 'hidden'}}>
        <div onClick={() => setOrderDropdown(!orderDropdown)} className={classes.sideBarMenu}>
          <p className={classes.sideBarLabel}>Pemesanan</p>
          <ExpandMore className={classes.expandMore}/>
        </div>

        {
          orderDropdown &&
          <div className={classes.orderDropdown}>
            {
              orderItems.map((item, index) => {
                return(
                  <div key={index} onClick={() => clickDropdownItem(item)} className={classes.dropdownItem}> 
                    {item}
                  </div>
                )
              })
            }
          </div>
        }

        <div onClick={() => setReportDropdown(!reportDropdown)} className={classes.sideBarMenu}>
          <p className={classes.sideBarLabel}>Cetak Laporan</p>
            <ExpandMore className={classes.expandMore}/>
        </div>

        {
          reportDropdown &&
          <div className={classes.orderDropdown}>
            {
              reportItems.map((item, index) => {
                return(
                  <div key={index} onClick={() => clickDropdownItem(item)} className={classes.dropdownItem}> 
                    {item}
                  </div>
                )
              })
            }
        </div>
        }

        <div className={classes.sideBarMenu} onClick={() => clickDropdownItem('Promo')}>
          <p className={classes.sideBarLabel}>Input Promo</p>
        </div>

        <div className={classes.sideBarMenu} onClick={() => clickDropdownItem('Input')}>
          <p className={classes.sideBarLabel}>Input Item</p>
        </div>

        <h2 onClick={logout} className={classes.logout}>LOG OUT</h2>
      </div>
      </Drawer>



        <main className={classes.main}>


          {
            belumDikirim === true ?
            <BelumDikirim 
              style={classes} 
              ordersArray={orders}
              status={orderItems}
              format={formatCurrency}
              toggle={toggleDescription}
            />
  
           
  
  
  
  
          :
            sedangDikirim === true ?
            <SedangDikirim 
              style={classes} 
              ordersArray={orders}
              status={orderItems}
              format={formatCurrency}
              toggle={toggleDescription}
            />
            
            
            
            
            
            :
            terkirim === true ?
            <Terkirim 
              style={classes} 
              ordersArray={orders}
              status={orderItems}
              format={formatCurrency}
              toggle={toggleDescription}
          />
            
           
           
           
           
            :
            lapPenjualan === true ?
            <LaporanPenjualan 
              style={classes} 
              orderTerkirimLapPenjualan={orderTerkirimLapPenjualan}
              orderTerkirim={orderTerkirim}
            />
        



            :
            lapPemesanan === true ?
            <LaporanPemesanan 
              style={classes} 
              orderTerkirim={orderTerkirim}
            />

            
            
            
            
            :
            lapPengiriman === true ?
            <LaporanPengiriman 
              style={classes} 
              orderTerkirim={orderTerkirim}
              orderTerkirimLapPengiriman={orderTerkirimLapPengiriman}
            />
            
            
            
            
            :
            promo === true ?
           <Promo 
              style={classes} 
           />

            

            :
            input === true ?
            <Input 
              style={classes} 
            />


            :
           <h1 style={{fontSize: '48px'}}>Let's do our best today!</h1>
          }
        </main>
    
    </div>
  );
}
