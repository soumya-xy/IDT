import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type OrderStatus = 'pending' | 'accepted' | 'declined';

export interface Order {
  id: string;
  productId?: number;
  retailer: string;
  tier: string;
  items: string;
  status: OrderStatus;
  time: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (productName: string, productId: number) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

const initialOrders: Order[] = [
  { id: 'ORD-8419', productId: 1, retailer: 'Corner Mart', tier: 'Gold', items: 'Premium Assam Tea 500g x 50', status: 'pending', time: '10 mins ago' },
  { id: 'ORD-8420', productId: 3, retailer: 'Gupta Stores', tier: 'Bronze', items: 'Maggi 2-Minute Noodles 12-Pack x 120', status: 'pending', time: '1 hour ago' },
  { id: 'ORD-8421', productId: 5, retailer: 'Fresh Point', tier: 'Silver', items: 'Tata Salt 1kg x 200', status: 'pending', time: '2 hours ago' },
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const placeOrder = (productName: string, productId: number) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(8422 + Math.random() * 1000)}`,
      productId,
      retailer: 'Corner Mart',
      tier: 'Gold',
      items: `${productName} x 50`,
      status: 'pending',
      time: 'Just now',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
