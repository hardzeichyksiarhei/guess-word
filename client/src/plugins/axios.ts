import axios from "axios";

import { SERVER_API_URL } from "../config";

const instance = axios.create({ baseURL: SERVER_API_URL });

export default instance;
