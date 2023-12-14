export type RestaurantResultType = {
  response: Restaurant[];
};

export type Restaurant = {
  id: string;
  title: string;
  text: string;
  type: string;
  images: [
    {
      itemType: string;
      itemId: string;
      imageSize: string;
      base64: string;
      storeId: string;
    }
  ];
  location: {
    type: string;
    coordinates: [number];
  };
  isDinner: boolean;
  isDelivery: boolean;
  storeInfo: StoreInfo;
  categoryId: string;
};
export type StoreInfo = {
  id: string;
  geoLocation: {
    approve: boolean;
    latitude: number;
    longitude: number;
  };
  userPoint: number;
  workingHours: [
    {
      day: number;
      open: string;
      close: string;
      closed: boolean;
    }
  ];
  status: string;
  rate: number;
  minOrderPrice: number;
};
