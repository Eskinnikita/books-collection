const prepareParams = (params) => {
  const urlParams = new URLSearchParams(params).toString();
  return urlParams.length ? `?${urlParams}` : '';
};

export {
  prepareParams,
};
