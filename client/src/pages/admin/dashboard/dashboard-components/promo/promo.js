import axios from 'axios'
import { useState, useEffect  } from 'react'
import { Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'



const Promo = (props) => {

    const classes = props.style

    const [ promoData, setPromoData ] = useState([])

    const [ newPromo, setNewPromo ] = useState({
        name: "",
        discount: ""
      })

      useEffect(() => {
        axios.get('http://localhost:4000/promo/newpromo')
          .then(res => {
            const data = res.data
            setPromoData(data)
          })
      }, [promoData])



      //Functions
    const sendNewPromo = () => {
        axios({
          method: 'POST',
          data: {
            name: newPromo.name,
            img: newPromo.img,
            discount: newPromo.discount
          },
          withCredentials: true,
          url: 'http://localhost:4000/promo/newpromo'
        })
        setNewPromo({
          name: "",
          discount: ""
        })
      }
    
      const deletePromo = (id) => {
        const itemId = id
        axios({
          method: 'POST',
          data: {
            id: itemId
          },
          withCredentials: true,
          url: 'http://localhost:4000/promo/deletepromo'
        })
      }
    

    return(
        <div>
        <h1 className={classes.h1}>Promo</h1>
        <hr className={classes.hr}/>
        <div className={classes.insertContainer}>

           <div style={{display: 'table-row'}} className={classes.insertItem}>
              <h1 className={`${classes.insertComponent} ${classes.gap}`} >Nama promo:</h1>
              <input 
                  className={`${classes.insertComponent} ${classes.input}`} 
                  onChange={(e) => setNewPromo({...newPromo, name: e.target.value})}
                  value={newPromo.name}
              />
           </div>

           <div className={classes.insertItem}>
              <h1 className={`${classes.insertComponent} ${classes.gap}`} >Potongan:</h1>
              <input 
                  className={`${classes.insertComponent} ${classes.input}`} 
                  onChange={(e) => setNewPromo({...newPromo, discount: e.target.value})}
                  value={newPromo.discount}
              />                 
            </div>


          <Button 
              className={classes.promoSubmit}
              onClick={sendNewPromo}
          >
            Simpan
          </Button>
        </div>
      
        <table style={{width: '100%', background: '#ffff'}} className={classes.table}>
          <thead>
            <tr >
              <th className={classes.table}>No</th>
              <th className={classes.table}>Nama promo</th>
              <th className={classes.table}>Potongan(Rp)</th>
              <th className={classes.table}>Actions</th>
            </tr>
          </thead>

            <tbody>
             {
               promoData.map((data, index) => {
                 return(
                   <tr>
                     <td className={classes.table}>{index+1}</td>
                     <td className={classes.table}>{data.promoName}</td>
                     <td className={classes.table}>{data.potongan}</td>
                      <td className={classes.table}>
                        <button className={classes.action} onClick={() => deletePromo(data._id)}><Delete /></button>
                      </td>
                   </tr>
                 )
               })
             }
            </tbody>
        </table>
      </div>
    )
}

export default Promo