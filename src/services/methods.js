import AxiosCreator from "./httpServices";

export const GET = async (url, options) => {
  try {
    const res = await AxiosCreator.get(url, {
      ...options,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const POST = async (url, payload) => {
  try {
    const res = await AxiosCreator.post(url, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};
