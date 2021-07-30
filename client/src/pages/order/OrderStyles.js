import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    container: {
        display: 'flex',
        backgroundColor: '#fdb84d',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='46' height='46' fill-opacity='0.6' fill='%23ffa61d'/%3E%3C/svg%3E")`,
        /* background by SVGBackgrounds.com */
        [theme.breakpoints.up('lg')]: {
            padding: '0 90px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0 20px',
        }
    },
    gridContainer: {
        flex: '100%',
        padding: 0,
        margin: '5% 0'
    },
    itemsContainer: {
        textAlign: 'center',
        backgroundColor: '#ffff',
        padding: '80px 20px',
        borderRadius: '36px'
    },
    orderLabel: {
        margin: '0',
        textAlign: 'center',
        color: '#F7A72B',
        [theme.breakpoints.up('lg')]: {
            fontSize: '3vw',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '4vw',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '5vw',
        }
    },
    baseContainer: {
        display: 'flex',
        placeItems: 'center',
        maxWidth: '100%',
        padding: '0 80px'
    },
    base: {  
        [theme.breakpoints.up('md')]: {
            height: '50%',
            width: '50%',
            flex: '50%'
        },
        [theme.breakpoints.down('sm')]: {
            height: '100%',
            width: '100%'
        },
        '&:hover': {
            cursor: 'pointer'
        }
    },
    firstSequence: {
        marginTop: '80px'
    },
    sequence: {
        marginLeft: '20%',
        marginRight: '20%',
        textAlign: 'left'
    },
    baseItem: {
        height: '50%', 
        width: '50%',
    },
    toppingContainer: {
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '150px'
    },
    align: {
        width: 'fit-content',
        [theme.breakpoints.down('xs')]: {
            display: 'inline-flex'
        },
        [theme.breakpoints.up('sm')] : {
            display: 'inline-block',
        }
    },
    label: {
        width: 'fit-content',
        marginLeft: '25%',
        marginTop: '8%'
    },
    toppings: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10%',
        },
        [theme.breakpoints.up('md')]: {
            padding: '0 20%',
        }
    },
    topping: {
        [theme.breakpoints.up('md')]: {
            padding: '4% 3%',
            margin: '2% 3%'
        },
        [theme.breakpoints.down('sm')]: {
           display: 'inline-block',
           margin: '5% 20%'
        },
        '&:hover': {
            cursor: 'pointer'
        }
    },
    tooltip: {
        visibility: 'hidden'
    },
    textField: {
        width: '75%',
        color: '#0000',
        marginBottom: '40px'
    },
    orderButton: {
        background: '#FDB84D',
        borderRadius: '15px',
        color: '#fbfbfa',
        fontWeight: 'bold',
        marginTop: '50px',
        '&:hover':{
            background: '#fca51e'
        }
    },
    cartPaper: {
        borderRadius: '36px',
        width: '90%',
        [theme.breakpoints.up('md')]: {
            padding: '10% 5%',
           
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10%  5%'
        }
    },
    cartLabel: {
        textAlign: 'center',
        [theme.breakpoints.up('lg')]: {
            fontSize: '1.5vw'
        }
    },
    cartHr: {
        height: '2px',
        backgroundColor: '#aeaeae',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '100%'
        },
        [theme.breakpoints.down('lg')]: {
            maxWidth: '75%'
        }
    },
    nothing: {
        textAlign: 'center',
    },
    cartOrderSet: {
        border: '2px solid #e4e6e5',
        borderRadius: '12px',
        marginTop: '40px',
        marginBottom: '24px',
        padding: '0 10px'
    },
    cartItem: {
        width: '100%',
        display: 'flex'
    },
    cartAlign: {
        flex: '50%'
    },
    price: {
        textAlign: 'right'
    },
    delete: {
        padding: 0,
        float: 'right',
        color: '#b42819',
        border: 'none',
        fontSize: '30px',
        background: '#ffff',
        cursor: 'pointer'
    },
    cartTextField: {
        [theme.breakpoints.up('xl')]: {
            width: 300,
        },
        [theme.breakpoints.down('lg')]: {
            width: 150,
        },
        [theme.breakpoints.down('md')]: {
            width: 160,
        },
        [theme.breakpoints.down('sm')]: {
            width: 280,
        },
        [theme.breakpoints.down('xs')]: {
            width: 150,
        },
    },
    quantity: {
        width: '20px',
        height: '20px',
        margin: 0,
        textAlign: 'center'
    },
    quantityAmount: {
        placeItems: 'center',
        marginLeft: 'auto'
    },
    amountButton: {
        height: '25px',
        width: '25px',
        '&:hover': {
            cursor: 'pointer'
        },
        [theme.breakpoints.between('sm', 'md')]:{
            margin: 0
        },
        [theme.breakpoints.up('lg')]:{
            margin: '0 5px',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 5px'
        }
    },
    center: {
        alignItems: 'center'
    },
    rewriteButton: {
        [theme.breakpoints.up('lg')]:{
            marginTop: '7px'
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '5px'
        }
    },
    cartButton: {
        background: '#FDB84D',
        borderRadius: '15px',
        color: '#fbfbfa',
        fontWeight: 'bold',
        '&:hover':{
            background: '#fca51e'
        }
    },
    formControl: {
        backgroundColor: '#ffff',
        [theme.breakpoints.up('lg')]: {
            width: '300px',
        },
        [theme.breakpoints.down('md')]: {
            width: '150px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '300px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '180px',
        },
    },
    menuItem: {
        backgroundColor: '#ffff',
        textAlign: 'center'
    },
    location: {
        width: '100%',
        display: 'grid'
    },
    promo: {
        fontSize: '18px',
        width: '40%',
        border: '2px solid black',
        margin: '0 auto',
        display: 'flex',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    promoContainer: {
        width: '40%',
        margin: '0 auto',
    },
    promoItem: {
        textAlign: 'left',
        padding: '10px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#d6d3d7'
        },
    },
    expand: {
        margin: 'auto 0',
        flex: '10%',
        float: 'right'
    },
    hr: {
        width: '25%',
        float: 'left'
    },
    }
))