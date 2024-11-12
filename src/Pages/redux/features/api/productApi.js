import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: ['products']
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['products']
    }),
   
    addProducts: builder.mutation({
      query: (newProducts) => ({
        url: 'products',
        method: "POST",
        body: newProducts,
      }),
      // invalidatesTags: ["products"]
    })

  }),
});

export const { useGetProductsQuery, useDeleteProductMutation, useAddProductsMutation} = productApi;

