export const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (+page - 1) * limit : 0;

  return { limit, offset };
};

export const getPagingData = (message, data, page, limit) => {
  const { count, rows } = data;
  const current_page = page ? +page : 0;
  const total_pages = Math.ceil(count / limit);

  return { message, total_count: count, total_pages, current_page, data: rows };
};