export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type Props = {
    children: React.ReactNode;
};

export type Lang = {
    lang: "en" | "ar" | string;
    setLang: (lang: "en" | "ar" | string) => void;
    toggleLanguage: () => void;
}

export type Theme = {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export interface Category {
    id: string | number;
    name: string;
    image: string;
}

export type CategoriesContextType = {    
    categories: Category[];
    setCategories: (categories: Category[]) => void;
}

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  description?: string;
  category?: Category;
};


export type ProductsContextType = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    filters: { categoryId: string, title: string, price_min: number, price_max: number };
    setFilters: React.Dispatch<React.SetStateAction<{ categoryId: string, title: string, price_min: number, price_max: number }>>;
}

export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
};