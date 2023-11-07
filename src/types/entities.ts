export type Data<T> = {
  id: number;
  attributes: DefaultAttributes & T;
};

type DefaultAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Product = {
  name: string;
  description: string;
  price: number;

  uniquID: string;
  teamName: 'fb-team' | 'ea-team';
};
