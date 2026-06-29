export interface Product {
    id: number;
    name: string;
}

export interface TransactionItem {
    id: number;
    product_id: number;
    product_variant_id: number;
    quantity: number;
    price: number;
    product?: Product | null;
}

export interface ProductTransaction {
    id: number;
    transaction_code: string;
    total_price: number;
    shipping_cost: number;
    grand_total: number;
    shipping_address: string;
    status: string;
    transactionItems: TransactionItem[];
    created_at: string;
}
