import { useAppDispatch } from 'shared/lib'
import { getApiError } from 'shared/api'
import { updateUserImage, useUpdateUserImageMutation } from 'entities/user'
import { useUploadFileMutation } from 'entities/file'

export const useUpdateUserImage = () => {
  const [uploadFile] = useUploadFileMutation()
  const [updateImage] = useUpdateUserImageMutation()
  const dispatch = useAppDispatch()

  return async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const uploadedFileUrl = await uploadFile(formData).unwrap()
      const res = await updateImage({
        image: uploadedFileUrl.data.filepath,
      }).unwrap()
      if (res && res.data) {
        dispatch(updateUserImage(res.data.image))
      }
    } catch (error) {
      const err = getApiError<Record<string, string>>(error)
      console.log(err)
    }
  }
}
