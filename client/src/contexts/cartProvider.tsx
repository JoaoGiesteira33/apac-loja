import {
    ReactElement,
    createContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { ProductType } from '../types/product';

type CartStateType = { cart: ProductType[] };

const initCartState: CartStateType = {
    cart: [],
};

const REDUCER_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    SUBMIT: 'SUBMIT',
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
    type: string;
    payload?: ProductType;
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

            const { _id } = action.payload;
            const filtredCart: ProductType[] = state.cart.filter(
                (product) => product._id !== _id
            );

            return { ...state, cart: [...filtredCart, action.payload] };
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload is undefined in REMOVE');
            }

            const { _id } = action.payload;
            const filtredCart: ProductType[] = state.cart.filter(
                (product) => product._id !== _id
            );

            return { ...state, cart: [...filtredCart] };
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
        return REDUCER_ACTION_TYPE;
    }, []);

    const totalItems: number = state.cart.length;

    const subTotalPrice = new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
    }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + cartItem.price;
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
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    subTotalPrice: '',
    cart: initCartState.cart,
};

export const CartContext =
    createContext<UseCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
