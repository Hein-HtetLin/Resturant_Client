// types/index.ts
export interface Category {
    _id: string;
    name: {
      en: string;
      my?: string;
      th?: string;
    };
    image?: string;
  }

  export interface Menu {
    _id: string;
    name: {
      en: string;
      my?: string;
      th?: string;
    };
    description?: {
      en: string;
      my?: string;
      th?: string;
    };
    price: number;
    image?: string;
    category?: Category;
    availableFrom?: string; // ISO time like "08:00"
    availableTo?: string; // ISO time like "18:00"
  }
  