import { makeStyles  } from "@material-ui/core";

const drawerWidth = 240;


export default makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#253238'
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      logoContainer: {
        display: 'inline-block',
        width: '100%'
      },
      logo: {
        width: '100%',
        height: '100%'
      },
      sideBarMenu: {
        backgroundColor: '#3F4F55',
        margin: '10px 0 0 0 ',
        color: '#ffff',
        fontSize: '24px',
        '&:hover': {
          cursor: 'pointer'
        }
      },
      main: {
        display: 'inline-block',
        width: '100%',
        height: '100%',
        padding: '0 20px',
        backgroundColor: '#DCDCDC',
        minHeight: '1000px'
      },
      sideBarLabel:{
        display: 'inline-block',
        marginLeft: '5px'
      },
      expandMore: {
        float: 'right',
        display: 'inline-block',
        margin: '29px 20px'
      },
      orderDropdown: {
        color: '#ffff'
      },
      dropdownItem: {
        backgroundColor: '#637A83',
        fontSize: '20px',
        padding: '10px 5px',
        '&:hover': {
          backgroundColor: '#566a71',
          cursor: 'pointer'
        }
      },
      h1: {
        fontSize: '36px',
        marginBottom: '5px'
      },
      hr: {
        float: 'left',
        width: '200px',
        height: '3px',
        backgroundColor: 'black'
      },
      orderData: {
        marginBottom: '50px'
      },
      orderDataMain: {
        height: '70px',
        backgroundColor: '#676767',
        marginTop: '20px',
        '&:hover': {
          cursor: 'pointer'
        }
      },
      orderDataMainP: {
        fontSize: '18px',
        margin: '0 0 0 20px',
        float: 'left',
        color: '#ffff',   
      },
      alignCenter: {
        position: 'relative',
        top:'50%',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)'
      },
      orderDetails: {
        backgroundColor: '#ffff',
        display: 'flex',
        height: '500px'
      },
      leftDetails: {
        display: 'inline-block',
        flex: '50%',
        borderRight: '1px solid black'
      },
      rightDetails: {
        display: 'inline-block',
        flex: '50%',
        borderLeft: '1px solid black'
      },
      orderItemContainer: {
        height: '80%',
        borderBottom: '2px solid black',
        overflowY: 'scroll',
      },
      orderItem: {
        border: '2px solid #e4e6e5',
        borderRadius: '12px',
        width:'90%',
        margin: '20px auto',
        padding: '20px 30px'
      },
      grandTotal: {
        height:'20%',
        padding: '10px'
      },
      cartItem: {
        width: '100%',
        display: 'flex',
        fontSize: '20px'
      },
      cartAlign: {
        flex: '50%'
      },
      price: {
        textAlign: 'right'
      },
      sendingStatus: {
        height: '50%',
        borderBottom: '2px solid black',
        padding: '20px 20px'
      },
      statusTextContainer: {
        height: '40px',
        margin: '10px 0',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '10px 5px',
        '&:hover': {
          cursor: 'pointer'
        }
      },
      userAddress: {
        padding: '0 20px'
      },
      insertContainer: {
        display: 'flex',
        margin: '40px 0 20px',
        backgroundColor: '#C1C1C1',
        flexWrap: 'wrap',
        placeItems: 'center',
        padding: '20px 40px',
        width: '100%'
      },
      insertItem: {
        flex: '50%'
      },
      insertComponent: {
        display: 'inline-block'
      },
      gap: {
        marginRight: '12px'
      },
      input: {
        height: '30px',
        width: '250px'
      },
      promoSubmit: {
        marginTop: '20px',
        backgroundColor: '#ffff',
        width: '200px',
        '&:hover': {
          backgroundColor: '#DCDCDC'
        }
      },
      table:{
        border: '1px solid black',
        borderCollapse: 'collapse',
        textAlign: 'center',
        padding: '10px 8px'
      },
      action: {
        margin: '0 18px',
        '&:hover':{
          cursor: 'pointer'
        }
      },
      refresh: {
        position: 'relative',
        top: '8px',
        marginLeft: '5px'
      },
      tableGrandTotal: {
        border: '1px solid black',
        borderCollapse: 'collapse',
        textAlign: 'right',
        padding: '10px 8px',
        fontSize: '24px'
      },
      total: {
        fontSize: '24px',
        fontWeight: 'bold'
      },
      inputContainer: {
        height: '10%',
        backgroundColor: ''
      },
      itemInputInsert: {
        flex: '100%'
      },
      alignItemsH1: {
        display: 'table-cell'
      },
      alignItemsInput: {
        display: 'table-cell'
      },
      logout: {
        color: '#ffff',
         textAlign: 'center', 
         '&:hover':{
           cursor: 'pointer'
         }
      },
      select: {
        border: 'none',
        fontSize: '36px',
        marginLeft: '5px',
        background: '#DCDCDC',
        fontWeight: '600',
        '&:hover': {
          cursor: 'pointer'
        }
      },
      cetakNota: {
        marginLeft: '20px',
        fontSize: '16px',
        '&:hover': {
          cursor: 'pointer'
        }
      }
}))