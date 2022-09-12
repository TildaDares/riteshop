const getError = (err: any) => {
  let errRes = err.response
  return errRes && errRes.data && errRes.data.message
    ? errRes.data.message
    : err.message;
}

export { getError }
