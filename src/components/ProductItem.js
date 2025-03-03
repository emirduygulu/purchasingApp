import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Rating from '@mui/material/Rating';

function ProductItem({ id, title, img, price, rating, quantity, onRemove, onIncrease, onDecrease }) {

    return (
        <Card sx={{ maxWidth: 400 }} alt={id}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="270"
                    image={img}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Rating name="product-rating" value={rating} readOnly />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Fiyat: {price} TL
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div className='quantityArea'>
                <Button onClick={onDecrease}>{<RemoveIcon />}</Button>
                <p>{quantity}</p>
                <Button onClick={onIncrease}>{<AddIcon />}</Button>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => {
                    onRemove(id);
                }}>Sil</Button>
            </div>
        </Card>
    );
}

export default ProductItem;
