import CartContext, { UseCartContextType } from '../contexts/cartProvider';
import { useContext } from 'react';

const useCart = (): UseCartContextType => {
    return useContext(CartContext);
};

export default useCart;
