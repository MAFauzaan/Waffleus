import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    grid: {
        [theme.breakpoints.down('md')]:{
            display: 'block',
            textAlign: 'center'
        }
    },
    navLabel: {
        borderRadius: '0 30px 30px 0',       
        [theme.breakpoints.down('sm')]:{
            display: 'inline-block',
            margin: '5px 10px',
            padding: '5px 10px',
            borderRadius: '30px',       
        },
        margin: '5px 0',
        paddingRight: '15px',
        fontWeight: '500',
        textAlign: 'right',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    hr: {
        border: '1px solid #d4cfd2',
        [theme.breakpoints.up('md')]:{
            width: 0        
        },
        [theme.breakpoints.down('sm')]:{
            width: '50%'
        }
    },
    
}))
