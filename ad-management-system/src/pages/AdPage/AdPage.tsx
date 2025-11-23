import { RejectModal } from "@/components/RejectModal/RejectModal";
import { Button } from "@/components/ui/button";
import { actions } from "@/constants/app";
import { AppRoutes } from "@/constants/routes";
import { formatTimestamp } from "@/lib/formatTimestamp";
import { fetchAllAds, fetchItem } from "@/services/ads";
import { useAdMutation } from "@/services/mutations";
import type { Ad } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdGallery } from "./components/Gallery";

export const AdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("rejected");
  const {
    data: ads,
    isLoading,
    isFetching,
  } = useQuery<Ad[]>({
    queryKey: ["ads"],
    queryFn: () => fetchAllAds(),
  });

  const { data: ad } = useQuery<Ad>({
    queryKey: ["ad", id],
    queryFn: () => fetchItem(Number(id)),
  });

  const { mutate } = useAdMutation(Number(id));

  const handleApprove = useCallback(() => {
    mutate({ adId: Number(id), status: "approve" });
  }, [id, mutate]);

  const user = ad?.seller;

  const nextAdIndex = ads
    ? ads.findIndex((ad) => ad.id === Number(id)) + 1
    : -1;
  const prevAdIndex = ads
    ? ads.findIndex((ad) => ad.id === Number(id)) - 1
    : -1;
  const nextPageLink =
    nextAdIndex !== -1 ? `/ads/${ads?.[nextAdIndex].id}` : "#";
  const prevPageLink =
    prevAdIndex !== -1 ? `/ads/${ads?.[prevAdIndex].id}` : "#";

  const characteristics = ad ? Object.keys(ad.characteristics) : [];

  const onModalOpen = useCallback((newStatus: string) => {
    setIsModalOpen(true);
    setStatus(newStatus);
  }, []);

  const goToNextAd = useCallback(() => {
    if (nextPageLink !== "#") {
      navigate(nextPageLink);
    }
  }, [nextPageLink, navigate]);

  const goToPrevAd = useCallback(() => {
    if (prevPageLink !== "#") {
      navigate(prevPageLink);
    }
  }, [prevPageLink, navigate]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isModalOpen && event.key !== "Escape") {
        return;
      }

      switch (event.key) {
        case "a":
        case "A":
          event.preventDefault();
          handleApprove();
          break;
        case "d":
        case "D":
          event.preventDefault();
          onModalOpen("rejected");
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNextAd();
          break;
        case "ArrowLeft":
          event.preventDefault();
          goToPrevAd();
          break;
        case "Escape":
          if (isModalOpen) {
            setIsModalOpen(false);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    isModalOpen,
    id,
    nextPageLink,
    prevPageLink,
    handleApprove,
    onModalOpen,
    navigate,
    goToNextAd,
    goToPrevAd,
  ]);

  if (!ad || !user || isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[1000px]">
      <h1 className="text-3xl mb-5 font-bold">{ad.title}</h1>
      <div className="text-2xl mb-10 flex justify-center gap-10">
        <h2>{ad.category}</h2>
        <h2>{ad.price} ₽</h2>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <AdGallery images={ad.images} />
        <div className="border-purple-700 border p-5 rounded-2xl">
          <span className="text-xl font-bold">История модерации</span>
          <div className="flex flex-col mt-5 overflow-auto max-h-[250px] gap-5">
            {ad.moderationHistory.length === 0 && (
              <span>Нет истории модерации</span>
            )}
            {ad.moderationHistory.map((step) => (
              <div className="flex flex-col gap-2 border-b pb-2" key={step.timestamp}>
                <span>- Модератор: {step.moderatorName}</span>
                <span>Дата: {formatTimestamp(step.timestamp)}</span>
                <span>{actions[step.action]}</span>
                {step.comment && <span>Комментарий: {step.comment}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 border-purple-300 border p-5 rounded-2xl flex flex-col gap-6">
          <span>{ad.description}</span>
          <table className="w-full mt-3">
            <thead>
              <tr>
                {characteristics.map((characteristic) => (
                  <th key={characteristic} className="p-2 border-b">
                    {characteristic}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {characteristics.map((characteristic) => (
                  <td key={characteristic} className="p-2 border-b">
                    {ad.characteristics[characteristic]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col">
            <span className="font-bold">
              Продавец: {user.name} | Рейтинг: {user.rating}★
            </span>
            <span className="font-bold">
              {user.totalAds} объявлений | На сайте с:{" "}
              {formatTimestamp(user.registeredAt).slice(0, -6)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-7">
        <Button onClick={() => handleApprove()} className="bg-green-600 p-5">
          Одобрить
        </Button>
        <Button
          onClick={() => onModalOpen("reject")}
          className="bg-red-600 p-5"
        >
          Отклонить
        </Button>
        <Button
          onClick={() => onModalOpen("request-changes")}
          className="bg-yellow-600 p-5"
        >
          Доработка
        </Button>
      </div>
      <div className="mt-10 flex justify-between">
        <Link to={AppRoutes.LIST}>
          <Button>К списку объявлений</Button>
        </Link>
        <div className="flex justify-center gap-10">
          <Link to={prevPageLink}>
            <Button>Прошлое объявление</Button>
          </Link>
          <Link to={nextPageLink}>
            <Button>Следующее объявление</Button>
          </Link>
        </div>
      </div>
      <RejectModal
        status={status}
        adId={Number(id)}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
