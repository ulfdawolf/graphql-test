import axios from "axios";

export const loadJSON = async (fileName: string) => {
  try {
    const response = await axios.get(fileName);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
