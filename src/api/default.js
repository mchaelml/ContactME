import axios from "axios";
import { company_domain } from "./api";

export default axios.create({
  baseURL: `https://${company_domain}.pipedrive.com/v1/`
});
