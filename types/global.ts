export interface ProductListType {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    description: string;
    thumbnail: string;
  }

  export interface ProductModal{
    data: {
      title: string;
      price: string;
      rating: string;
      stock: string;
      brand: string;
      category: string;
      description: string;
    };
    type: string;
  }