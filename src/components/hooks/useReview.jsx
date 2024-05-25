import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";


const useReview = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { refetch, data: review = [] } = useQuery({
        queryKey: ['review', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get("/review")
            return res.data;
        }

    })
    return [review, refetch];
};

export default useReview;