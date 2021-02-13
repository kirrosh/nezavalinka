import Axios from "axios"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import { useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { useRecoilState } from "recoil"
import IPlace from "types/IPlace"

export const usePlaceQuery = (id?: string | null) => {
  return useQuery<IPlace>(
    ["projects", id],
    async () => {
      const result = await Axios.get(
        "https://gkjb8uan.apicdn.sanity.io/v1/data/query/production",
        {
          params: {
            query: `*[_id == '${id}']{
                    ...,
                    "photoUrl": photo.asset->url
                  }`,
          },
        }
      )
      return result.data.result[0]
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
}

export const usePlacesQuery = (
  categoryId?: string,
  options?: UseQueryOptions<IPlace[]>
) => {
  const [id, setId] = useRecoilState(selectedPlaceIdAtom)
  const client = useQueryClient()
  return useQuery<IPlace[]>(
    ["projects", categoryId],
    async () => {
      const result = await Axios.get(
        "https://gkjb8uan.apicdn.sanity.io/v1/data/query/production",
        {
          params: {
            query: categoryId
              ? `*[_type == 'project' && references('${categoryId}')]{
                  ...,
                  "photoUrl": photo.asset->url
                }`
              : `*[_type == 'project']{
                  ...,
                  "photoUrl": photo.asset->url
                }`,
          },
        }
      )
      return result.data.result
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (results) => {
        results?.map((item) => {
          client.setQueryData(["projects", item._id], () => item)
          client.setQueryDefaults(["projects", item._id], {
            staleTime: Infinity,
          })
        })
        if (!id && results) {
          setId(results[0]._id)
        }
      },
      ...options,
    }
  )
}
