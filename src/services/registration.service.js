import axios from "axios";

const url = 'http://193.19.100.32:7000/api/get-roles';

export const RolesService = async () => {
  try {
    const response = await axios.get(url).catch(err => console.log(err));
    const roles = [];

    for (let i = 0; i < response.data.roles.length; i++) {
      roles.push({
        value: response.data.roles[i],
        label: response.data.roles[i],
      })
    }
    return roles
  } catch (err) {
    console.log(err);
  }
}