import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useAdminDashboard = () => {
    const axiosPublic = useAxiosPublic()

    const { adminData: adminAllInfo = [], refetch } = useQuery({
        queryKey: ['admin-all-data',],
        queryFn: async () => {
            const res = await axiosPublic.get('/admin/dashboard');
            return res.data;
        }
    })
    return [adminAllInfo, refetch]
};

export default useAdminDashboard;
