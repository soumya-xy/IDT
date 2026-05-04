import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'dispatched'
  | 'delivered'
  | 'disputed'
  | 'resolved';

export interface Order {
  id: string;
  productId?: number;
  retailer: string;
  tier: string;
  items: string;
  status: OrderStatus;
  time: string;
  issueReason?: string;
  timeline: {
    placedAt: string;
    acceptedAt?: string;
    dispatchedAt?: string;
    deliveredAt?: string;
  };
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (productName: string, productId: number) => void;
  updateOrderStatus: (id: string, status: OrderStatus, issueReason?: string) => void;
}

const initialOrders: Order[] = [
  {
    id: 'ORD-8419',
    productId: 1,
    retailer: 'Corner Mart',
    tier: 'Gold',
    items: 'Premium Assam Tea 500g x 50',
    status: 'pending',
    time: '10 mins ago',
    timeline: { placedAt: '10 mins ago' },
  },
  {
    id: 'ORD-8420',
    productId: 3,
    retailer: 'Gupta Stores',
    tier: 'Bronze',
    items: 'Maggi 2-Minute Noodles 12-Pack x 120',
    status: 'accepted',
    time: '1 hour ago',
    timeline: { placedAt: '1 hour ago', acceptedAt: '45 mins ago' },
  },
  {
    id: 'ORD-8421',
    productId: 5,
    retailer: 'Fresh Point',
    tier: 'Silver',
    items: 'Tata Salt 1kg x 200',
    status: 'dispatched',
    time: '2 hours ago',
    timeline: { placedAt: '2 hours ago', acceptedAt: '95 mins ago', dispatchedAt: '40 mins ago' },
  },
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const placeOrder = (productName: string, productId: number) => {
    const orderTime = 'Just now';
    const newOrder: Order = {
      id: `ORD-${Math.floor(8422 + Math.random() * 1000)}`,
      productId,
      retailer: 'Corner Mart',
      tier: 'Gold',
      items: `${productName} x 50`,
      status: 'pending',
      time: orderTime,
      timeline: {
        placedAt: orderTime,
      },
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: OrderStatus, issueReason?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) {
          return order;
        }

        const nextTimeline = { ...order.timeline };
        if (status === 'accepted') nextTimeline.acceptedAt = 'Now';
        if (status === 'dispatched') nextTimeline.dispatchedAt = 'Now';
        if (status === 'delivered' || status === 'resolved') nextTimeline.deliveredAt = 'Now';

        return {
          ...order,
          status,
          issueReason,
          timeline: nextTimeline,
        };
      })
    );
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
