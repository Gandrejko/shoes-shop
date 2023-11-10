import {Data, RequestData} from './data';
import {Product} from './product';

export type Image = {
  id: number;
  url: string;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type ImageAttributes = Partial<
  Image & {
    related: RequestData<Data<Product>[]>;
  }
>;

export type ImageRequest = Partial<{
  files: any; // TODO: add correct type
}>;

export type ImageResponse = ImageAttributes;
export type ImagesResponse = ImageAttributes[];
