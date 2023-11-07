import {
  Product,
  Data,
  Category,
  Size,
  Brand,
  Color,
  Gender,
  Image,
  User,
} from './entities';

export type ProductAttributes = Partial<
  Product & {
    images: Data<Image>[];
    categories: Data<Category>[];
    sizes: Data<Size>[];

    brand: Data<Brand> | null;
    color: Data<Color> | null;
    gender: Data<Gender> | null;
    userID: Data<User> | null;
  }
>;

export type UserAttributes = Partial<
  User & {
    firstName: string | null;
    lastName: string | null;
    avatar: Data<Image> | null;
    prodcuts: Data<Product>[];
  }
>;

export type BrandAttributes = Partial<
  Brand & {
    products: Data<Product>[];
  }
>;

export type CategoryAttributes = Partial<
  Category & {
    products: Data<Product>[];
  }
>;

export type ColorAttributes = Partial<
  Color & {
    products: Data<Product>[];
  }
>;

export type GenderAttributes = Partial<
  Gender & {
    products: Data<Product>[];
  }
>;

export type SizeAttributes = Partial<
  Size & {
    products: Data<Product>[];
  }
>;

export type ImageAttributes = Partial<
  Image & {
    related: Data<Product>[];
  }
>;
