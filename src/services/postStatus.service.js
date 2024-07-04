import axios from "axios";

const url = 'http://193.19.100.32:7000/api/set-status';

export const statusService = async (userData) => {
  try {
    const response = await axios.post(url, userData).catch(err => console.log(err))
    return response.data
  } catch (err) {
    console.log(err);
  }
}
