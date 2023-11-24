import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await res.revalidate(`/products/${req.query.productId}`);
    return res.json({revalidated: true});
  } catch (err) {
    return res.status(500).send('Error happened while revalidating product');
  }
}
