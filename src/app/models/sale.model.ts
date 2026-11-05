export interface SaleDetail {
  product: string;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  id: number;
  total: number;
  created_at: string;
  details: SaleDetail[];
}

export interface CreateSaleItem {
  product_id: number;
  quantity: number;
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