import { createApi } from '@reduxjs/toolkit/query/react';
import { Product } from "../../module/products";
import { baseQueryWithErrorHandling } from '../../api/baseAPI';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => ({ url: 'products' })
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${productId}`
    }),
  }),
});

export const { useFetchProductDetailsQuery, useFetchProductsQuery } = catalogApi;
