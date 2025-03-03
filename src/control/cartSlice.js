import { createSlice } from '@reduxjs/toolkit';

// Başlangıç durumu
const initialState = {
    cartItems: [], // Sepetteki ürünler
    quantity: 0, // Sepetteki toplam ürün sayısı
    total: 0, // Sepetteki toplam tutar
};

// Sepet için slice oluştur
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Sepeti temizle
        clearCart: (state) => {
            state.cartItems = []; // Sepetteki ürünleri boşalt
            state.quantity = 0; // Ürün sayısını sıfırla
            state.total = 0; // Toplam tutarı sıfırla
        },
        // Ürünü sepetten çıkar
        removeItem: (state, action) => {
            const itemId = action.payload; // Silinecek ürünün ID'si
            const index = state.cartItems.findIndex(item => item.id === itemId); // Ürünün dizideki indeksini bul
            if (index !== -1) {
                state.cartItems.splice(index, 1); // Ürünü diziden çıkar
                state.quantity = state.cartItems.length; // Ürün sayısını güncelle
                state.total = state.cartItems.reduce((total, item) => total + parseFloat(item.price), 0); // Toplam tutarı güncelle
            }
        },
        // Ürünleri sepete ekle
        addItems: (state, action) => {
            const newItems = action.payload; // Yeni ürünler
            state.cartItems = newItems; // Yeni ürünleri sepete ekle
            state.quantity = newItems.length; // Sepetteki ürün sayısını güncelle
        },
        // Toplam tutarı güncelle
        updateTotal: (state, action) => {
            state.total = action.payload; // Toplam tutarı güncelle
        },
    },
});

// Eylemleri dışa aktar
export const { clearCart, removeItem, addItems, updateTotal } = cartSlice.actions;

// Reducer'ı dışa aktar
export default cartSlice.reducer;