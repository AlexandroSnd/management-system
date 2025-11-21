import { useRejectAdMutation } from "@/services/mutations";
import React from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/button";
import { rejectionReasons } from "./data";
import { actions } from "@/constants/app";

interface RejectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  adId: number;
  status: string;
}

export const RejectModal = ({
  isModalOpen,
  setIsModalOpen,
  adId,
  status
}: RejectModalProps) => {
  const [selectedReason, setSelectedReason] = React.useState<string | null>(
    null
  );
  const [comment, setComment] = React.useState<string>("");
  const { mutate } = useRejectAdMutation(adId);

  const handleSend = () => {
    if (!selectedReason) return;
    mutate(
      {
        adId,
        status: status,
        reason: selectedReason,
        comment: selectedReason === "Другое" ? comment : undefined,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedReason(null);
          setComment("");
        },
      }
    );
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">{actions[status]}</h2>
        <p>Причина:</p>
        <ul className="flex flex-col pl-3 gap-2">
          {rejectionReasons.map((item, i) => {
            return (
              <li
                key={i}
                className={`cursor-pointer ${
                  selectedReason === item ? "font-bold" : ""
                }`}
                onClick={() => setSelectedReason(item)}
              >
                {item !== "Другое" ? (
                  <p>{item}</p>
                ) : (
                  <>
                    <p>{item}</p>
                    <input
                      type="text"
                      placeholder="Введите причину"
                      onChange={(e) => setComment(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 mt-1"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ul>
        <Button
          className="bg-[rgb(88,85,85)]"
          onClick={() => {
            handleSend();
          }}
        >
          Отправить
        </Button>
      </div>
    </Modal>
  );
};
