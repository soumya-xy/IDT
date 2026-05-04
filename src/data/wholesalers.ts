export type StockSignal = 'green' | 'orange' | 'red';

export interface RetailerProfile {
  tier: 'Gold' | 'Silver' | 'Bronze';
  typicalOrderSize: number;
  reorderFrequencyDays: number;
}

export interface WholesalerItem {
  id: number;
  name: string;
  category: string;
  price: number;
  availableUnits: number;
  imageUrl: string;
}

export interface WholesalerProfile {
  slug: string;
  name: string;
  score: number;
  city: string;
  specialty: string;
  summary: string;
  tierAcceptance: string;
  metrics: {
    fulfilledOrders: number;
    accuracy: number;
    onTime: number;
    disputes: number;
  };
  items: WholesalerItem[];
}

export const currentRetailerProfile: RetailerProfile = {
  tier: 'Gold',
  typicalOrderSize: 500,
  reorderFrequencyDays: 3,
};

export const wholesalers: WholesalerProfile[] = [
  {
    slug: 'sharma-bros',
    name: 'Sharma Bros',
    score: 4.6,
    city: 'Jaipur',
    specialty: 'FMCG, tea and staples',
    summary:
      'High consistency wholesaler with strong fulfillment discipline and transparent dispute handling for recurring retailers.',
    tierAcceptance: 'Gold Preferred',
    metrics: {
      fulfilledOrders: 780,
      accuracy: 95.4,
      onTime: 90.2,
      disputes: 3.7,
    },
    items: [
      {
        id: 1,
        name: 'Premium Assam Tea 500g',
        category: 'Beverages',
        price: 240,
        availableUnits: 3200,
        imageUrl:
          'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 2,
        name: 'Tata Salt 1kg',
        category: 'Groceries',
        price: 25,
        availableUnits: 1800,
        imageUrl:
          'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 3,
        name: 'Maggi 2-Minute Noodles 12-Pack',
        category: 'FMCG',
        price: 168,
        availableUnits: 420,
        imageUrl:
          'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 4,
        name: 'Sunflower Refined Oil 1L',
        category: 'Groceries',
        price: 138,
        availableUnits: 760,
        imageUrl:
          'https://images.unsplash.com/photo-1515442261605-65987783cb6a?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  {
    slug: 'ramesh-distributors',
    name: 'Ramesh Distributors',
    score: 4.3,
    city: 'Kota',
    specialty: 'Cleaning products and packaged foods',
    summary:
      'Value-focused supplier with broad assortment and improving SLA performance for mixed-tier retailers.',
    tierAcceptance: 'Silver & Bronze Friendly',
    metrics: {
      fulfilledOrders: 540,
      accuracy: 92.1,
      onTime: 87.3,
      disputes: 5.2,
    },
    items: [
      {
        id: 5,
        name: 'Parle-G Gold 1kg',
        category: 'FMCG',
        price: 120,
        availableUnits: 960,
        imageUrl:
          'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 6,
        name: 'Surf Excel Matic 2kg',
        category: 'Cleaning',
        price: 450,
        availableUnits: 280,
        imageUrl:
          'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 7,
        name: 'Aashirvaad Atta 5kg',
        category: 'Groceries',
        price: 210,
        availableUnits: 640,
        imageUrl:
          'https://images.unsplash.com/photo-1603048719539-9ecb7f1bbf2f?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 8,
        name: 'Dettol Handwash Refill 750ml',
        category: 'Cleaning',
        price: 152,
        availableUnits: 120,
        imageUrl:
          'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
];

export const computeStockSignal = (itemUnits: number, retailer: RetailerProfile): StockSignal => {
  const demandWindow = retailer.typicalOrderSize / Math.max(1, retailer.reorderFrequencyDays);
  const coverage = itemUnits / demandWindow;

  if (coverage >= 12) return 'green';
  if (coverage >= 5) return 'orange';
  return 'red';
};

