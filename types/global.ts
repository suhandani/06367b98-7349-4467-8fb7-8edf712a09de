export interface ProductListType {
    id: string;
    title: string;
    price: string;
    discountPercentage: string;
    rating: string;
    stock: string;
    brand: string;
    category: string;
    description: string;
    thumbnail: string;
    images: string[];
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
      thumbnail: string;
      images: string[]
    };
    type: string;
  }
