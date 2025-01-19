export interface UpcResponse {
  success: string;
  barcode: string;
  title: string;
  alias: string;
  description: string;
  brand: string;
  manufacturer: string;
  mpn: string;
  msrp: string;
  ASIN: string;
  category: string;
  metadata: Metadata;
  reviews: Reviews;
}

export interface Metadata {
  size: string;
  color: string;
  gender: string;
  age: string;
  length: string;
  unit: string;
  width: string;
  height: string;
  weight: string;
  quantity: string;
  publisher: string;
  genre: string;
  author: string;
  relasedate: string;
}

export interface Reviews {
  thumbsup: number;
  thumbsdown: number;
}
