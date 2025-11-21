import { fetchStats } from "@/services/ads";
import { useQuery } from "@tanstack/react-query";

export const useStatsData = (type: 'pie' | 'bar' | 'pie2') => {
    const query = useQuery({
        queryKey: ["moderatorStats", type],
        queryFn: () => fetchStats(type),
    });
    return query;
};



export const formatReviewTime = (seconds: number): string => {
    if (seconds >= 60) {
        const minutes = Math.round(seconds / 60);
        return `${minutes} мин`;
    }
    return `${Math.round(seconds)} сек`;
}