import {Image} from './image';
import {ProductAttributes} from './product';

export type User = {
  id: number;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber?: string | null;
  avatar?: Partial<Image> | null;
};

export type UserAttributes = Partial<
  User & {
    products: ProductAttributes[];
  }
>;

export type UserRequest = User & {
  identifier?: string;
  password: string;
};

export type UserResponse = UserAttributes;
export type UsersResponse = UserAttributes[];
