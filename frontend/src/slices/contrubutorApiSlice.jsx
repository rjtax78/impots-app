import { CONTRIBUTEURS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const contributorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContributors: builder.query({
      query: () => ({
        url: CONTRIBUTEURS_URL,
      }),
      providesTags: ["Contributeur"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetContributorsQuery } = contributorApiSlice;
