import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChoice } from "./ads";

interface RejectionPayload {
  adId: number;
  reason?: string;
  comment?: string;
  status: string;
}

export const useAdMutation = (adId: number) => {
  const queryClient = useQueryClient();

  const mutationFn = ({ reason, comment, status }: RejectionPayload) => {
    if (status === "reject" || status === "request-changes") {
      if (reason === "Другое" && comment) {
        return sendChoice(adId, status, reason, comment);
      }
      else if (reason) {
        return sendChoice(adId, status, reason);
      }

      throw new Error("Необходимо указать причину отклонения.");
    }

    if (status === "approve") {
      return sendChoice(adId, status);
    }

    throw new Error(`Неизвестный статус модерации: ${status}`);
  };

  return useMutation({
    mutationFn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ad", String(adId)] });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};
