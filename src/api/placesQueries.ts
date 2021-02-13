import Axios from "axios"
import { selectedPlaceIdAtom } from "features/places/placesAtoms"
import { useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { useRecoilState } from "recoil"
import IProject from "types/IProject"

export const usePlaceQuery = (id?: string | null) => {
  return useQuery<IProject>(
    ["places", id],
    async () => {
      const result = await Axios.get(
        "https://gkjb8uan.apicdn.sanity.io/v1/data/query/production",
        {
          params: {
            query: `*[_id == '${id}']`,
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

export const usePlacesQuery = (options?: UseQueryOptions<IProject[]>) => {
  const [id, setId] = useRecoilState(selectedPlaceIdAtom)
  const client = useQueryClient()
  return useQuery<IProject[]>(
    "places",
    async () => {
      const result = await Axios.get(
        "https://gkjb8uan.apicdn.sanity.io/v1/data/query/production",
        {
          params: {
            query: `*[_type == 'project']`,
          },
        }
      )
      return result.data.result
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (results) => {
        results?.map((item) => {
          client.setQueryData(["places", item._id], () => item)
          client.setQueryDefaults(["places", item._id], {
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
