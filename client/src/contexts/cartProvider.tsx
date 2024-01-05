import { ReactElement, createContext, useEffect, useMemo, useReducer } from 'react';
import { CartProductType } from '../types/cart';
import { Key, decryptData, encryptData} from '../utils/Encryption';

type CartStateType = { cart: CartProductType[] };

const initCartState: CartStateType = { cart: [
    // TODO remove this mock data
    {
        "id": 1,
        "title": "Mona Lisa by Leonardo Da Vinci Transform to Wpap Pop Art Poster",
        "year": 2013,
        "thumbnailPhoto": "https://render.fineartamerica.com/images/rendered/default/poster/5.5/8/break/images/artworkimages/medium/3/mona-lisa-by-leonardo-da-vinci-transform-to-wpap-pop-art-ahmad-nusyirwan.jpg",
        "quantity": 2,
        "price": 22.35,
        "stock": 10
    },
    {
        "id": 2,
        "title": "Industrial smoke-1",
        "year": 2023,
        "thumbnailPhoto": "https://zet.gallery/storage/images/products/c3b2/a821/ac2a/4db3/b5bb/4a30/d051/0972.jpg?mode=max&bgcolor=ffffff&width=717&height=717&quality=70",
        "quantity": 1,
        "price": 2000,
        "stock": 10
    },
    {
        "id": 3,
        "title": "Sphinx",
        "year": 2012,
        "thumbnailPhoto": "https://zet.gallery/storage/images/products/443e/c7a8/6551/4bd6/b6ef/5ee1/20c9/a46d.jpg?mode=max&bgcolor=ffffff&width=717&height=717&quality=70",
        "quantity": 1,
        "price": 400,
        "stock": 10
    }
] };

const REDUCER_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    SUBMIT: 'SUBMIT',
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
    type: string;
    payload?: CartProductType;
};

const reducer = (
    state: CartStateType,
    action: ReducerAction
): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('action.payload is undefined in ADD');
            }

            const { id } = action.payload;
            const filtredCart: CartProductType[] = state.cart.filter(
                (product) => product.id !== id
            );

            return { ...state, cart: [...filtredCart, action.payload] };
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload is undefined in REMOVE');
            }

            const { id } = action.payload;
            const filtredCart: CartProductType[] = state.cart.filter(
                (product) => product.id !== id
            );

            return { ...state, cart: [ ... filtredCart] };
        }
        case REDUCER_ACTION_TYPE.CLEAR: {
            
            return { ...state, cart: [] };
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            // TODO Submit cart to backend and go to checkout page

            // for now clear cart
            return { ...state, cart: [] };
        }

        default:
            throw new Error('Unexpected reducer action type');
    }
};

const useCartContext = (initCartState: CartStateType) => {
    // Load cart state from local storage if available, else use initial state
    const savedCart = localStorage.getItem('cart');
    const parsedCart = savedCart ? JSON.parse(savedCart) : initCartState.cart;

    const [state, dispatch] = useReducer(reducer, { cart: parsedCart });

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.length;

    const subTotalPrice = new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
    }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + cartItem.price
        }, 0)
    );

    const cart = state.cart;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    return {
        dispatch,
        REDUCER_ACTIONS,
        totalItems,
        subTotalPrice,
        cart,
    };

}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 3,
    subTotalPrice: '2422.35',
    cart: initCartState.cart,
};

export const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext