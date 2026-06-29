import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

type CartItem = {
    id_produk: number;
    nama_produk: string;
    id_varian: number;
    ukuran: string;
    warna?: string | null;
    harga: number;
    kuantitas: number;
    gambar: string;
    maksimal_stok_varian: number;
};

type CartContextValue = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (variantId: number) => void;
    updateQuantity: (variantId: number, newQty: number) => void;
    clearCart: () => void;
    cartSubtotal: number;
    cartCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = 'shopping_cart';

function getInitialCart(): CartItem[] {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
        return storedValue ? JSON.parse(storedValue) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() =>
        getInitialCart(),
    );

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cartItems),
        );
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems((currentItems) => {
            const existingIndex = currentItems.findIndex(
                (cartItem) => cartItem.id_varian === item.id_varian,
            );

            const quantityToAdd = Math.max(1, Number(item.kuantitas ?? 1));
            const maxStock = Number(item.maksimal_stok_varian ?? 1);

            if (existingIndex === -1) {
                return [
                    ...currentItems,
                    {
                        ...item,
                        kuantitas: Math.min(quantityToAdd, maxStock),
                    },
                ];
            }

            return currentItems.map((cartItem, index) => {
                if (index !== existingIndex) {
                    return cartItem;
                }

                const updatedQuantity = Math.min(
                    cartItem.kuantitas + quantityToAdd,
                    Number(cartItem.maksimal_stok_varian ?? maxStock),
                );

                return {
                    ...cartItem,
                    kuantitas: Math.max(1, updatedQuantity),
                };
            });
        });
    };

    const removeFromCart = (variantId: number) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.id_varian !== variantId),
        );
    };

    const updateQuantity = (variantId: number, newQty: number) => {
        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id_varian !== variantId) {
                    return item;
                }

                const normalizedQty = Math.max(
                    1,
                    Math.min(
                        Number(newQty),
                        Number(item.maksimal_stok_varian ?? 1),
                    ),
                );

                return {
                    ...item,
                    kuantitas: normalizedQty,
                };
            }),
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartSubtotal = useMemo(
        () =>
            cartItems.reduce(
                (sum: number, item: CartItem) =>
                    sum + Number(item.harga ?? 0) * Number(item.kuantitas ?? 0),
                0,
            ),
        [cartItems],
    );

    const cartCount = useMemo(
        () =>
            cartItems.reduce(
                (sum: number, item: CartItem) =>
                    sum + Number(item.kuantitas ?? 0),
                0,
            ),
        [cartItems],
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartSubtotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}
