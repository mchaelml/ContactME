import axios from "axios";
import { company_domain } from "./api";
import { api_tokken } from "./api";

export default axios.create({
  baseURL: `https://${company_domain}.pipedrive.com/v1/`,
  params: {
    api_token: api_tokken
  }
});
