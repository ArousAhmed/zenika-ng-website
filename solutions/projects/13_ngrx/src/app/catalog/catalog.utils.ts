import { Product } from './product/product.types';

export const isProductAvailable = ({ stock }: Product): boolean => stock !== 0;
