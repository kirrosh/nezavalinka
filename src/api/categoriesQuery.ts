import { useQuery, useQueryClient } from "react-query"
import ICategory from "types/ICategory"
import Axios from "axios"

export const useCategoriesQuery = () => {
  const client = useQueryClient()
  return useQuery<ICategory[]>(
    "categories",
    async () => {
      const result = await Axios.get(
        "https://gkjb8uan.apicdn.sanity.io/v1/data/query/production",
        {
          params: {
            query: `*[_type == 'category']`,
          },
        }
      )
      return result.data.result
    },
    {
      refetchOnWindowFocus: true,
      onSuccess: (results) =>
        results?.map((item) => {
          client.setQueryData(["categories", item._id], () => item)
          client.setQueryDefaults(["categories", item._id], {
            staleTime: Infinity,
          })
        }),
    }
  )
}
