import { createSlice } from '@reduxjs/toolkit'

const initState = {
   user: null,
   items: [],
   totalQuantity: 0,
   grandTotal: 0,
   discount: 0
}

 const cartSlice = createSlice({
    name: 'getData',
    initialState: initState,
    reducers: {
        addItemToCart(state, action){
            const [newOrder, potongan] = action.payload;

            //Add item
            state.totalQuantity ++;
            state.items.push({
                itemId: newOrder.itemId,
                baseId: newOrder.baseId,
                baseName: newOrder.baseName,
                basePrice: newOrder.basePrice,
                topping: newOrder.topping,
                toppingName: newOrder.toppingName,
                toppingPrice: newOrder.toppingPrice,
                additionalNote: newOrder.additionalNote,
                quantity: 1,
                totalPrice: newOrder.totalPrice
            })            
            state.discount = potongan
        },
        removeItemFromCart(state, action){
            const itemId = action.payload

            state.totalQuantity--;

            state.items = state.items.filter(item => item.itemId !== itemId)

        },
        rewriteTextField(state, action) {
          const [ itemId, value ] = action.payload

          const foundItem = state.items.find(item => item.itemId === itemId)
          foundItem.additionalNote = value
          console.log(foundItem.additionalNote)
        },
        addItem(state, action) {
            const  itemId  = action.payload

            const foundItem = state.items.find(item => item.itemId === itemId)
            foundItem.quantity++
            foundItem.totalPrice = foundItem.totalPrice + (foundItem.basePrice + foundItem.toppingPrice)
        },
        reduceItem(state, action) {
            const  itemId  = action.payload

            const foundItem = state.items.find(item => item.itemId === itemId)
            foundItem.quantity--
            foundItem.totalPrice = foundItem.totalPrice -  (foundItem.basePrice + foundItem.toppingPrice)
        },
        countGrandTotal(state, action) {
            const cart = state.items

            const countPrice = cart.reduce((accumulator, current) => accumulator + current.totalPrice, 0)

            state.grandTotal = countPrice - state.discount;
        },
        addUser(state, action){
            const newUser = action.payload

            state.user = newUser
        },
        logout(state, action) {
            Object.assign(state, initState)
        },
        setOrderDate(state, action) {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1; 
            let yyyy = today.getFullYear();
            let orderDate = dd+'-'+mm+'-'+yyyy;

            state.orderDate = orderDate
        },
        resetItems(state) {
            return state => initState()
        }
    }
})

export const cartActions = cartSlice.actions


export default cartSlice
