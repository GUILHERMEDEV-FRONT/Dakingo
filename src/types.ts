export type CakeCategory = 'classic' | 'gourmet' | 'desserts' | 'cookies';

export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: CakeCategory;
  isBestseller?: boolean;
}

export interface CartItem {
  cake: Cake;
  quantity: number;
  flavour: string;
  weight: number; // in kg, e.g., 0.5, 1, 2
}

export interface UserReminder {
  id: string;
  name: string;
  relationship: string;
  date: string; // YYYY-MM-DD
  userId: string;
  createdAt: string;
}

export interface OrderItem {
  cakeId: string;
  cakeName: string;
  price: number;
  quantity: number;
  flavour: string;
  weight: number;
}

export interface UserOrder {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  deliveryAddress: string;
  createdAt: string;
}

export const FLAVOUR_OPTIONS = [
  'Chocolate Fudge', 
  'Vanilla Bean', 
  'Red Velvet Cream Cheese', 
  'Butterscotch Crunch', 
  'Fresh Fruit Cream'
];

export const WEIGHT_OPTIONS = [0.5, 1.0, 1.5, 2.0];

export const CAKE_MENU: Cake[] = [
  {
    id: 'cake-001',
    name: 'Rich Chocolate Truffle Cake',
    description: 'Decadent structure of sponge layered with chocolate ganache and chocolate cream.',
    price: 500,
    originalPrice: 625,
    rating: 5,
    reviewsCount: 500,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    category: 'classic',
    isBestseller: true,
  },
  {
    id: 'cake-002',
    name: 'Choco Chip Truffle Cake',
    description: 'Our chocolate truffle cake loaded with crunchy premium semi-sweet chocolate chips.',
    price: 509,
    originalPrice: 636,
    rating: 5,
    reviewsCount: 500,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    category: 'classic',
    isBestseller: true,
  },
  {
    id: 'cake-003',
    name: 'Tropical Fruit N Almond Cake',
    description: 'Topped with fresh kiwi, peach, berries and layered with almond flakes and white chocolate.',
    price: 509,
    originalPrice: 636,
    rating: 5,
    reviewsCount: 508,
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'gourmet',
    isBestseller: true,
  },
  {
    id: 'cake-004',
    name: 'Rich Butterscotch Crunch Cake',
    description: 'Vanilla genoise soaked in butterscotch syrup, filled with caramelized nut praline.',
    price: 399,
    originalPrice: 499,
    rating: 5,
    reviewsCount: 308,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80',
    category: 'classic',
    isBestseller: true,
  },
  // Extra menu items so categories feel fully fleshed out and premium when clicked!
  {
    id: 'cake-005',
    name: 'Decadent Black Forest Gateau',
    description: 'Classic German kirsch-infused chocolate cake filled with whipped cream and cherries.',
    price: 450,
    originalPrice: 562,
    rating: 4.8,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=803&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'classic',
    isBestseller: true,
  },
  {
    id: 'cake-006',
    name: 'Signature Red Velvet Heart',
    description: 'Stunning bright red velvet layers filled with velvet luxury cream cheese frosting.',
    price: 650,
    originalPrice: 750,
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://plus.unsplash.com/premium_photo-1674068280136-5801f98c685d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'gourmet',
    isBestseller: true,
  },
  {
    id: 'cake-007',
    name: 'Gourmet Salted Caramel Macaron Delight',
    description: 'Towering caramel drip cake filled with crushed French salted-caramel macarons.',
    price: 899,
    originalPrice: 1100,
    rating: 5,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&auto=format&fit=crop&q=80',
    category: 'gourmet',
    isBestseller: true,
  },
  {
    id: 'cake-008',
    name: 'Luxurious Lotus Biscoff Cake',
    description: 'Caramelised Belgian Biscoff cookie paste folded into layers of dense almond cake sponge.',
    price: 850,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1665063526345-298deea714f8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'desserts',
    isBestseller: true,
  },
  {
    id: 'cake-009',
    name: 'Creamy New York Cheesecake',
    description: 'Rich, dense cream cheese resting on a thick buttered buttery graham-cracker crust.',
    price: 599,
    originalPrice: 699,
    rating: 5,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80',
    category: 'desserts',
    isBestseller: true,
  },
  {
    id: 'cake-010',
    name: 'Classic Belgian Chocolate Brownie Box',
    description: 'Assortment of six ultra-fudgy walnuts and triple chocolate chip fudge brownies.',
    price: 350,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    category: 'desserts',
    isBestseller: true,
  },
  {
    id: 'cake-011',
    name: 'Assorted Gourmet Butter Cookies',
    description: 'Box of traditional danish butter cookies in rich vanilla, coconut and almond variants.',
    price: 250,
    originalPrice: 300,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://plus.unsplash.com/premium_photo-1672073871234-7f2de18b9e5d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'cookies',
    isBestseller: true,
  },
  {
    id: 'cake-012',
    name: 'Double Choco Chip Fudge Cookies',
    description: 'Soft, gooey center inside crispy edges filled with dark and milk Hershey chips.',
    price: 280,
    originalPrice: 350,
    rating: 4.9,
    reviewsCount: 154,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80',
    category: 'cookies',
    isBestseller: true,
  },
  {
  id: 'cake-013',
    name: 'Signature Red Velvet',
    description: 'Stunning bright red velvet layers filled with velvet luxury cream cheese frosting.',
    price: 650,
    originalPrice: 750,
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://plus.unsplash.com/premium_photo-1713920189815-876dbdf5f56e?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'gourmet',
    isBestseller: true,
  },
  {
    id: 'cake-014',
    name: 'Classic Belgian Chocolate Brownie Box',
    description: 'Assortment of six ultra-fudgy walnuts and triple chocolate chip fudge brownies.',
    price: 350,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'desserts',
    isBestseller: true,
  },
  {
    id: 'cake-015',
    name: 'Premium Almond Crunchy Cookies',
    description: 'Box of fine butter cookies topped with toasted sliced almonds and a touch of Madagascar vanilla.',
    price: 220,
    originalPrice: 260,
    rating: 4.8,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1772985763762-c079e16deab8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'cookies',
    isBestseller: true,
  },
  {
    id: 'cake-016',
    name: 'Toasted Coconut & White Chocolate Cookies',
    description: 'Traditional danish butter cookies infused with toasted coconut flakes and premium white chocolate chips.',
    price: 260,
    originalPrice: 310,
    rating: 4.6,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=687&auto=format&fit=crop',
    category: 'cookies',
    isBestseller: true,
  },
];
