export interface Product {
    id: number;
    name: string;
}

export interface ProductVariant {
    id: number;
    color_name?: string | null;
    size?: string | null;
}

export interface TransactionItem {
    id: number;
    product_id: number;
    product_variant_id: number;
    quantity: number;
    price: number;
    product?: Product | null;
    productVariant?: ProductVariant | null;
    product_variant?: ProductVariant | null;
}

export interface ProductTransaction {
    id: number;
    transaction_code: string;
    total_price: number;
    shipping_cost: number;
    notes: string | null;
    grand_total: number;
    shipping_address: string;
    status: 'pending' | 'paid' | 'shipping' | 'completed' | 'cancelled';
    payment_proof?: string | null;
    transactionItems?: TransactionItem[];
    transaction_items?: TransactionItem[];
    created_at: string;
}
