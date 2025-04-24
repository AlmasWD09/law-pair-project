import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie";
import useAxiosPublic from "./useAxiosPublic";





const useCategorieData = (id) => {
const axiosPublic = useAxiosPublic()
  
    const adminToken = Cookies.get("adminToken");
  
    const { data: singleCategorieData ={} ,refetch } = useQuery({
      queryKey: ['single-categorie',id],
      queryFn: async () => {
        const response = await axiosPublic.get(`/admin/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
                "Accept": "application/json"
                // ✅ Send token in Authorization header
            }

        })
        return response.data?.category
      },
    })
  
  
    return [singleCategorieData,refetch]
  }

export default useCategorieData;