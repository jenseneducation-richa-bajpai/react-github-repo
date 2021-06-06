import axios from "axios";

const API = axios.create({
  baseURL: "https://api.github.com/repos/",
});
async function fetchRepos(name) {
  const res = await API.get(`${name}`);
  const data = res.data;
  return data;
}

export { fetchRepos };
