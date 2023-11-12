import {Data, RequestData} from './data';
import {Image} from './image';
import {Product} from './product';

export type User = {
  id: number;
  email: string;
  username: string;
  phoneNumber?: string | null;
  avatar?: Image | null;
};

export type UserAttributes = Partial<
  User & {
    firstName: string | null;
    lastName: string | null;
    avatar: RequestData<Data<Image>> | null;
    products: RequestData<Data<Product>[]>;
  }
>;

export type UserRequest = User & {
  identifier?: string;
  password: string;
};

export type UserResponse = UserAttributes;
export type UsersResponse = UserAttributes[];
