export interface SaleDetail {
  product: string;
  quantity: number;
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  subtotal_with_discount: number;
}

export interface Sale {
  id: number;
  total: number;
  total_discount: number;
  created_at: string;
  details: SaleDetail[];
}

export interface CreateSaleItem {
  product_id: number;
  quantity: number;
  discount_percent: number;
}

export interface CreateSaleRequest {
  user_id: number;
  items: CreateSaleItem[];
}

export interface CreateSaleResponse {
  message: string;
  sale_id: number;
  total: number;
}

export interface DeleteSaleResponse {
  message: string;
}