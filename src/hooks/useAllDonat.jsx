import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAllDonat = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: alldonorRequestes = [],refetch } = useQuery({
        queryKey: ['all-donor-request', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allDonor/donation/request/api/get/${user.email}`);
            return res.data;
        }
    })
return [alldonorRequestes,refetch]
};

export default useAllDonat;
