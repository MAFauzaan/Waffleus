import FileBase from 'react-file-base64';
import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import axios from 'axios'


const Input = (props) => {
    

    const classes = props.style

    const [ base, setBase ] = useState([])
    const [ topping, setTopping ] = useState([])

    const [ inputBase, setInputBase ] = useState({
        id: "",
        baseName: "",
        hargaWaffle: "",
        img: ""
      })
    
      const [ inputTopping, setInputTopping ] = useState({
        id:"",
        toppingName: "",
        hargaTopping: "",
        img: ""
      })

      useEffect(() => {
        axios.get('http://localhost:4000/item/base/get')
          .then(res => setBase(res.data))
      }, [ base ])
    
      useEffect(() => {
        axios.get('http://localhost:4000/item/topping/get')
          .then(res => setTopping(res.data))
      }, [ topping ])
      
      //Functions
      
    const sendNewBase = (input) => {
    const { id, baseName, hargaWaffle, img } = input;
  
    axios({
      method: 'POST',
      data: {
        id: id,
        baseName: baseName,
        price: hargaWaffle,
        img: img
      },
      withCredentials: true,
      url: 'http://localhost:4000/item/base/input'
    })
  
    setInputBase({
      id: "",
      baseName: "",
      hargaWaffle: "",
      img: ""
    })
    }
  
    const deleteBase = (id) => {
    const itemId = id
    axios({
      method: 'POST',
      data: {
        id: itemId
      },
      withCredentials: true,
      url: 'http://localhost:4000/item/base/delete'
    })
    }
  
    const sendNewTopping = (input) => {
    const { id, toppingName, hargaTopping, img } = input;
  
    axios({
      method: 'POST',
      data: {
        id: id,
        toppingName: toppingName,
        price: hargaTopping,
        img: img
      },
      withCredentials: true,
      url: 'http://localhost:4000/item/topping/input'
    })
  
    setInputTopping({
      id: "",
      toppingName: "",
      hargaTopping: ""
    })
    }
  
    const deleteTopping = (id) => {
    const itemId = id
    axios({
      method: 'POST',
      data: {
        id: itemId
      },
      withCredentials: true,
      url: 'http://localhost:4000/item/topping/delete'
    })
    }
  

    return(
        <div style={{width: '100%'}}>
              <h1 className={classes.h1}>Input Base dan Topping</h1>
              <hr className={classes.hr}/>
              <br />
              <div  style={{display: 'flex'}}>

                  <div title="input base" style={{flex: '50%', padding: '0 40px'}}>
                        <form className={classes.insertContainer}>

                            <div style={{display: 'table-row'}} className={classes.itemInputInsert}>
                              <h1 className={`${classes.insertComponent} ${classes.gap} ${classes.alignItemsH1}`}>Id:</h1>
                              <input  
                                  className={`${classes.insertComponent} ${classes.input} ${classes.alignItemsInput}`} 
                                  onChange={(e) => setInputBase({...inputBase, id: e.target.value})}
                                  value={inputBase.id}
                              />
                            </div>

                            <div style={{display: 'table-row'}} className={classes.itemInputInsert}>
                                <h1 className={`${classes.insertComponent} ${classes.gap} ${classes.alignItemsH1}`}>Base:</h1>
                              <input 
                                  className={`${classes.insertComponent} ${classes.input} ${classes.alignItemsInput}`} 
                                  onChange={(e) => setInputBase({...inputBase, baseName: e.target.value})}
                                  value={inputBase.baseName}
                              />
                            </div>

                            <div style={{display: 'table-row'}} className={classes.itemInputInsert}>
                                <h1 className={`${classes.insertComponent} ${classes.gap} ${classes.alignItemsH1}`}>Harga:</h1>
                              <input 
                                  className={`${classes.insertComponent} ${classes.input} ${classes.alignItemsInput}`} 
                                  onChange={(e) => setInputBase({...inputBase, hargaWaffle: e.target.value})}
                                 value={inputBase.hargaWaffle}
                              />
                            </div>

                            <div style={{display: 'table-row'}}>
                              <h1 className={`${classes.insertComponent} ${classes.gap} ${classes.alignItemsH1}`}>Gambar:</h1>
                              <FileBase type="file" multiple={false} onDone={({ base64 }) => setInputBase({ ...inputBase, img: base64 })}/>            
                            </div>

                            <Button 
                                className={classes.promoSubmit} 
                                onClick={() => sendNewBase(inputBase)}
                            >
                              Simpan
                            </Button>
                        </form>
                      <table style={{width: '100%', background: '#ffff'}} className={classes.table}>
                          <thead>
                              <td className={classes.table}>No</td>
                              <td className={classes.table}>Id</td>
                              <td className={classes.table}>Nama base</td>
                              <td className={classes.table}>Harga(Rp)</td>
                              <td className={classes.table}>Actions</td>
                          </thead>
                      <tbody>
                          {
                            base.map((item, index) => {
                              return(
                                <tr className={classes.table}>
                                    <td className={classes.table}>{index+1}</td>
                                    <td className={classes.table}>{item._id}</td>
                                    <td className={classes.table}>{item.baseName}</td>
                                    <td className={classes.table}>{item.price}</td>
                                    <td className={classes.table}>
                                      <button className={classes.action} onClick={() => deleteBase(item._id)}><Delete /></button>
                                    </td>
                                </tr>
                              )
                            })
                          }
                      </tbody>
                      </table>
                  </div>
      
                  <div title="input topping" style={{flex: '50%', padding: '0 40px'}}>
                      <div style={{flex: '50%', padding: '0 40px'}}>
                        <form className={classes.insertContainer}>
                            <div style={{display: 'table-row'}} className={classes.itemInputInsert}>
                              <h1 className={`${classes.insertComponent} ${classes.gap} ${classes.alignItemsH1}`}>Id:</h1>
                              <input  
                                  className={`${classes.insertComponent} ${classes.input} ${classes.alignItemsInput}`} 
                                  onChange={(e) => setInputTopping({...inputTopping, id: e.target.value})}
                                  value={inputTopping.id}
                              />
                            </div>

                            <div style={{display: 'table-row'}} className={classes.itemInputInsert}>
                                <h1 className={`${classes.insertComponent} ${classes.gap} ${classes.alignItemsH1}`}>Topping:</h1>
                              <input 
                                  className={`${classes.insertComponent} ${classes.input} ${classes.alignItemsInput}`} 
                                  onChange={(e) => setInputTopping({...inputTopping, toppingName: e.target.value})}
                                  value={inputTopping.toppingName}
                              />
                            </div>

                            <div style={{display: 'table-row'}} className={classes.itemInputInsert}>
                                <h1 className={`${classes.insertComponent} ${classes.gap} ${classes.alignItemsH1}`}>Harga:</h1>
                              <input 
                                  className={`${classes.insertComponent} ${classes.input} ${classes.alignItemsInput}`} 
                                  onChange={(e) => setInputTopping({...inputTopping, hargaTopping: e.target.value})}
                                 value={inputTopping.hargaTopping}
                              />
                            </div>

                            <div style={{display: 'table-row'}}>
                              <h1 className={`${classes.insertComponent} ${classes.gap} ${classes.alignItemsH1}`}>Gambar:</h1>
                              <FileBase type="file" multiple={false} onDone={({ base64 }) => setInputTopping({ ...inputTopping, img: base64 })}/>            
                            </div>

                            <Button 
                                className={classes.promoSubmit} 
                                onClick={() => sendNewTopping(inputTopping)}
                            >
                              Simpan
                            </Button>
                        </form>
                      <table style={{width: '100%', background: '#ffff'}} className={classes.table}>
                          <thead>
                              <td className={classes.table}>No</td>
                              <td className={classes.table}>Id</td>
                              <td className={classes.table}>Nama Topping</td>
                              <td className={classes.table}>Harga(Rp)</td>
                              <td className={classes.table}>Actions</td>
                          </thead>
                      <tbody>
                          {
                            topping.map((item, index) => {
                              return(
                                <tr className={classes.table}>
                                    <td className={classes.table}>{index+1}</td>
                                    <td className={classes.table}>{item._id}</td>
                                    <td className={classes.table}>{item.toppingName}</td>
                                    <td className={classes.table}>{item.price}</td>
                                    <td className={classes.table}>
                                      <button className={classes.action} onClick={() => deleteTopping(item._id)}><Delete /></button>
                                    </td>
                                </tr>
                              )
                            })
                          }
                      </tbody>
                      </table>
                  </div>

                  </div>
              </div>
              
            </div>
    )
}

export default Input