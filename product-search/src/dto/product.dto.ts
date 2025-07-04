export class ProductDto {
  name: string;
  description?: string;
  sku: string;
  brand: string;
  category: string;
  attributes?: Record<string, string>;
  tags?: string[];
  price: number;
}
