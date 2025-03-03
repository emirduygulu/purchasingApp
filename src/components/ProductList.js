import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import getGames from '../ProductItems';
import ProductItem from './ProductItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { clearCart, removeItem } from '../control/cartSlice';

function ProductList() {
    const { total, cartItems } = useSelector((store) => store.cart);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getGames();
            //console.log('Fetched Products:', fetchedProducts);
            setProducts(fetchedProducts);
            dispatch({ type: 'cart/addItems', payload: fetchedProducts });

            const total = fetchedProducts.reduce((acc, item) => acc + Math.floor(parseFloat(item.price)), 0);
            dispatch({ type: 'cart/updateTotal', payload: total });
        };
        fetchProducts();
    }, [dispatch]);

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id));
        setProducts((prevProducts) => prevProducts.filter((item) => item.id !== id));
    };

    const handleIncrease = (id) => {
        const product = products.find(item => item.id === id);
        if (product) {
            const updatedQuantity = product.quantity + 1;
            const updatedTotal = total + product.price; // Toplamı güncelle

            // Ürünü güncelle
            const updatedProducts = products.map(item => 
                item.id === id ? { ...item, quantity: updatedQuantity } : item
            );

            // Redux'a yeni ürünleri ekle
            dispatch({ type: 'cart/addItems', payload: updatedProducts });
            dispatch({ type: 'cart/updateTotal', payload: updatedTotal });
            setProducts(updatedProducts); // Ürünleri güncelle
        }
    };

    const handleDecrease = (id) => {
        const product = products.find(item => item.id === id);
        if (product && product.quantity > 1) {
            const updatedQuantity = product.quantity - 1;
            const updatedTotal = total - product.price; // Toplamı güncelle

            // Ürünü güncelle
            const updatedProducts = products.map(item => 
                item.id === id ? { ...item, quantity: updatedQuantity } : item
            );

            // Redux'a yeni ürünleri ekle
            dispatch({ type: 'cart/addItems', payload: updatedProducts });
            dispatch({ type: 'cart/updateTotal', payload: updatedTotal });
            setProducts(updatedProducts); // Ürünleri güncelle
        }
    };

    return (
        <>
            {cartItems.length < 1 ? (
                <section>
                    
                    <span className='sptHeader'>Sepetteki Ürünlerim</span>
                        <p className='sptHeaderAlt' >Sepetinizde ürün bulunmamaktadır.</p>
                   
                </section>
            ) : (
                <section>
                    
                        <p className='sptHeader'>Sepetteki Ürünlerim</p>
                    
                    <div className='productArea'>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2} columns={4}>
                                {products.map((item) => (
                                    <Grid item xs={2} sm={2} md={1} key={item.id}>
                                        <ProductItem 
                                            {...item} 
                                            onRemove={handleRemoveItem} 
                                            onIncrease={() => handleIncrease(item.id)} 
                                            onDecrease={() => handleDecrease(item.id)} 
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </div>
                    <footer className="footer">
                        <hr />
                        <div>
                            <h4 className="total">Toplam Sepet Tutarı: <span>{total} TL</span></h4>
                        </div>
                        <Button className="clear-button" variant="outlined" onClick={() => {
                            dispatch(clearCart());
                            setProducts([]);
                            dispatch({ type: 'cart/updateTotal', payload: 0 });
                        }} startIcon={<DeleteIcon />}>Temizle</Button>
                    </footer>
                </section>
            )}
        </>
    );
}

export default ProductList;
