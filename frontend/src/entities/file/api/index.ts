import { createApi } from '@reduxjs/toolkit/query/react'
import { ApiResponse, baseQuery, UploadFileResponseDTO } from 'shared/api'

const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: baseQuery('files'),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<ApiResponse<UploadFileResponseDTO>, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export default fileApi
export const { useUploadFileMutation } = fileApi
