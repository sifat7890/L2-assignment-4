import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["books", "borrow"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["books"]
        }),
        getBook: builder.query({
            query: (id: string) => `/books/${id}`,
            providesTags: ["books"]
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: "/create-book",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ["books"]
        }),
        updateBook: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `/edit-book/${id}`,
                method: "PATCH",
                body: updateData
            }),
            invalidatesTags: ["books"]

        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["books"]

        }),

        borrowSummary: builder.query({
           query: () => "/borrow",
           providesTags: ["borrow"]
       }),
        borrowBook: builder.mutation({
            query: (borrowData) => ({
                url: "/borrow",
                method: "POST",
                body: borrowData
            }),
            invalidatesTags: ["books"]

        }),
    })
})

export const { useGetBooksQuery, useGetBookQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation ,useBorrowBookMutation,useBorrowSummaryQuery} = baseApi


