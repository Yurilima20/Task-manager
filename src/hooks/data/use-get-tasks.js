import { useQuery } from "@tanstack/react-query"

import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data } = await api.get("/tasks")
      // Normalize response shape:
      // - If backend returns an array (e.g. [..]) -> return it
      // - If backend wraps the array: { tasks: [...] } -> return the inner array
      // - Fallback to empty array
      if (Array.isArray(data)) return data
      if (data && Array.isArray(data.tasks)) return data.tasks
      return []
    },
  })
}
