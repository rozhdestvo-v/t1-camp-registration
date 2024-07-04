import axios from "axios";
import { encode } from "base-64";

const url = 'http://193.19.100.32:7000/api/get-code?email=';

export const getCodeService = async(email) => {
  try {
    const response = await axios.get(`${url}${email}`);
    return response.data
  } catch (err) {
    console.log(err);
  }
} 

