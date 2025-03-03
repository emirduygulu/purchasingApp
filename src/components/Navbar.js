import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSelector } from 'react-redux';


function Navbar() {
    const cartItems = useSelector((store) => store.cart.cartItems);
    const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Purchasing App</Typography>
                    <ShoppingBasketIcon sx={{ fontSize: 40 }} />
                    <div className='itemsDiv'>{quantity}</div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;



