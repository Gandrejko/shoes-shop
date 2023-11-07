import ProductForm from '@/components/ProductForm/ProductForm';
import React from 'react';

const AddProduct = () => {
  return <ProductForm onSubmit={() => console.log('kek')} />;
};

export default AddProduct;
