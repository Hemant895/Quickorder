export interface FoodData {
    filter(arg0: (item: any) => boolean): unknown;
    _id: string;
    email: string;
    data: {
      items: {
        food: {
          id: string;
          name: string;
          price: number;
          tag: string[];
          favorite: boolean;
          stars: number;
          imgurl: string;
          origins: string[];
          cooktime: string;
          _id: string;
        },
        quantity: number;
        price: number;
        _id: string;
      }[];
      totalPrice: number;
      totalCount: number;
    };
    billingaddress: {
      street: string;
      zipcode: string;
      _id: string;
    };
    __v: number;
  }
  