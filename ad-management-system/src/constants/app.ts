export const actions: { [key: string]: string } = {
  rejected: "Отклонено",
  reject: "Отклонено",
  approved: "Одобрено",
  approve: "Одобрено",
  "request-changes": "Доработка",
  requestChanges: "Доработка",
  draft: "Доработка",
  pending: "В ожидании",
  urgent: "Срочно",
  normal: "Обычный",
};

export const CATEGORY_COLOR_MAPPING: { [key: string]: string } = {
  Транспорт: "#009688",
  Недвижимость: "#4CAF50",
  Животные: "#FFC107",
  Услуги: "#2196F3",
  Мода: "#E91E63",
  Работа: "#9C27B0",
  Детское: "#FF5722",
};

export const CATEGORIES = [
  "Электроника",
  "Недвижимость",
  "Транспорт",
  "Работа",
  "Услуги",
  "Животные",
  "Мода",
  "Детское",
];

export const STATUSES = ["pending", "approved", "rejected", "draft"];
