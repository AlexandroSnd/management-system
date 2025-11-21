export const getSortParams = (sort: string) => {
  let sortBy = "createdAt";
  let sortOrder = "desc";
  if (sort === "new") {
    sortBy = "createdAt";
    sortOrder = "desc";
  }
  if (sort === "old") {
    sortBy = "createdAt";
    sortOrder = "asc";
  }
  if (sort === "expensive") {
    sortBy = "price";
    sortOrder = "desc";
  }

  if (sort === "cheap") {
    sortBy = "price";
    sortOrder = "asc";
  }
  if (sort === "urgent") {
    sortBy = "urgency";
    sortOrder = "desc";
  }

  return { sortBy, sortOrder };
};
