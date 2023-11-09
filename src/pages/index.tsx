import {Button} from '@/components/Button/Button';
import usePost from '@/hooks/usePost';
import usePut from '@/hooks/usePut';
import {ResponseData} from '@/types';
import {ProductAttributes} from '@/types/attributes';
import {Data} from '@/types/entities';
import {ProductRequest} from '@/types/requests';

// TEMPORARY: For testing purposes only
const body: ProductRequest = {
  name: 'Air Max 90',
  description:
    'Nike Air Max 90 is a classic shoe that has become very popular among sneakerheads. The shoe is made of leather and mesh, and has a rubber sole. The shoe is available in many different colors, and is a great shoe for everyday use.',
  price: 240,
  teamName: 'team-3',
  images: [1527],
  brand: 11,
  categories: [5, 6],
  color: 9,
  userID: 395,
  gender: 3,
  sizes: [14, 15],
};

export default function Home() {
  const {mutate} = usePost<
    ProductRequest,
    ResponseData<Data<ProductAttributes>>
  >('/products', {
    onSuccess: data => {
      console.log(data);
    },
  });

  return (
    <Button
      onClick={() => {
        mutate(body);
      }}
    >
      Request
    </Button>
  );
}
