import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook, IBorrow, IBorrowSummaryItem, ApiResponseWrapper } from '../../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Books', 'Borrows'],

  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponseWrapper<IBook[]>, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `books?page=${page}&limit=${limit}`,
      providesTags: ['Books'],
    }),

    createBook: builder.mutation<ApiResponseWrapper<IBook>, Partial<IBook>>({
        query: (newBook) => ({
            url: 'books',
            method: 'POST',
            body: newBook,
        }),
        invalidatesTags: ['Books'],
    }),

    getBookById: builder.query<ApiResponseWrapper<IBook>, string>({
        query: (id) => `books/${id}`,
    }),

    updateBook: builder.mutation<ApiResponseWrapper<IBook>, { id: string; changes: Partial<IBook> }>({
        query: ({ id, changes }) => ({
            url: `books/${id}`,
            method: 'PUT',
            body: changes,
        }),
        invalidatesTags: ['Books'],
    }),

    deleteBook: builder.mutation<ApiResponseWrapper<null>, string>({
        query: (id) => ({
            url: `books/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Books'],
    }),

    borrowBook: builder.mutation<ApiResponseWrapper<IBorrow>, Partial<IBorrow>>({
        query: (borrowData) => ({
            url: 'borrow',
            method: 'POST',
            body: borrowData,
        }),
        invalidatesTags: ['Borrows', 'Books'],
    }),

    getBorrowSummary: builder.query<ApiResponseWrapper<IBorrowSummaryItem[]>, void>({
      query: () => 'borrow',
      providesTags: ['Borrows'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = api;