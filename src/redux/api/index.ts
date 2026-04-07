import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/helper";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/`;

export const nhoruApi = createApi({
  reducerPath: "nhoruApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["MetaData", "Admin"],
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; admin: any }, { email: string; password: string }>({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
    }),
    getAdmin: builder.query<{ admin: any }, void>({
      query: () => "user/admin",
      providesTags: ["Admin"],
    }),
    getMetaData: builder.query<{ metaData: any }, void>({
      query: () => "metadata",
      providesTags: ["MetaData"],
    }),
    createMetaData: builder.mutation<{ metaData: any }, any>({
      query: (body) => ({
        url: "metadata",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MetaData"],
    }),
    updateMetaData: builder.mutation<{ metaData: any }, any>({
      query: (body) => ({
        url: "metadata",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["MetaData"],
    }),
    deleteMetaData: builder.mutation<void, void>({
      query: () => ({
        url: "metadata",
        method: "DELETE",
      }),
      invalidatesTags: ["MetaData"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAdminQuery,
  useGetMetaDataQuery,
  useCreateMetaDataMutation,
  useUpdateMetaDataMutation,
  useDeleteMetaDataMutation,
} = nhoruApi;

