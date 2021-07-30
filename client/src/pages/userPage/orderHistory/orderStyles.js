import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    container: {
        margin: '50px 60px',
        textAlign: 'center',
        display: 'inline    '
    },
    statusContainer: {
        flex: '100%'
    },
    statusLabel: {
        borderRadius: '30px',
        display: 'inline-block',
        padding: '8px 10px',
        margin: '0 5px',
        fontSize: '24px',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    orderContainer: {
        [theme.breakpoints.up('lg')]: {
            width: '50%',
        },
        [theme.breakpoints.down('md')]: {
            width: '70%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },  
        textAlign: 'center',
        margin: '70px auto',
        flex: '100%'
    },
    orderItem: {
        margin: '40px 0'
    },
    orderItemHeader: {
        height: '80px',
        width: '100%',
        background: '#F7A72C',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    idLabel: {
        textAlign: 'left',
        paddingLeft: '20px',
        display: 'block',   
        margin: 'auto'
    },
    align: {
        position: 'relative',
        top:'50%',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)'
    },
    expand:{
        position: 'relative',
        top: '5px'
    },
    orderLabel: {
        display: 'flex',
    },
    p: {
        display: 'inline-block',
        flex: '50%'
    },
    pLeft: {
        float: 'left'
    },
    pRight: {
        float: 'right'
    },
    orderDetails: {
        backgroundColor: '#ffff',
        border: '3px solid #F7A72C'
    },
    orderItemDetail: {
        borderRadius: '15px',
        margin: '30px 20% ',
        border: '3px solid #F7A72C',
    },
    grandTotal: {
        display: 'flex'
    }
}))