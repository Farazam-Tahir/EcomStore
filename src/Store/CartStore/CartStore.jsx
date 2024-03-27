import {create} from 'zustand';

const useCartStore = create((set)=>({
    cartItems : 0,
    setCartItems : (item)=> set({cartItems : item})
}));

export default useCartStore;