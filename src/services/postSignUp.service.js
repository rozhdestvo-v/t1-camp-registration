import axios from "axios";

const url = 'http://193.19.100.32:7000/api/sign-up';

export const SignUpService = async (dataUser) => {
  try {
    const response = await axios.post(url, dataUser).catch(err => console.log(err))
    return response.data
  } catch (err) {
    console.log(err);
  }
}
