import { CATEGORIES } from "@/constants/app";
import { getSortParams } from "@/lib/getSortParams";
import axios from "axios";

const BASE_URL = "/api/v1";

export const sendChoice = async (
  adId: number,
  status: string,
  reason?: string,
  comment?: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/ads/${adId}/${status}`, {
      reason,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending rejection reason:", error);
    return undefined;
  }
};

export const fetchAllAds = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ads?limit=150`);
    console.log(response.data);
    return response.data.ads;
  } catch (error) {
    console.error("Error fetching all advertisements:", error);
    return undefined;
  }
};

export const fetchPageAds = async (
  currentPage: number,
  sort: string,
  search: string,
  category?: string,
  minPrice?: string,
  maxPrice?: string,
  statuses?: Array<string>,
) => {
  const { sortBy, sortOrder } = getSortParams(sort);
  const categoryIdParam = category
    ? `&categoryId=${CATEGORIES.indexOf(category)}`
    : "";
  const minPriceParam = minPrice ? `&minPrice=${minPrice}` : "";
  const maxPriceParam = maxPrice ? `&maxPrice=${maxPrice}` : "";
  const statusesParam = statuses && statuses.length > 0 ? statuses.map(status => `&status=${status}`).join('') : "";

  try {
    const response = await axios.get(
      `${BASE_URL}/ads?limit=10&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}` +
        `${categoryIdParam}${minPriceParam}${maxPriceParam}${statusesParam}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    return undefined;
  }
};

export const fetchItem = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/ads/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisement:", error);
    return undefined;
  }
};

export const fetchUser = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return undefined;
  }
};

export const fetchStats = async (type: "pie" | "bar" | "pie2") => {
  let URL;
  switch (type) {
    case "pie":
      URL = "summary";
      break;
    case "bar":
      URL = "chart/activity";
      break;
    case "pie2":
      URL = "/chart/categories";
      break;
  }
  try {
    const response = await axios.get(`${BASE_URL}/stats/${URL}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    return undefined;
  }
};
