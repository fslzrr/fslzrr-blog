import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";
const headers = { "Access-Control-Allow-Origin": "*" };

const useRequest = (verb, path, params = {}, data = {}) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios[verb](API_URL + path, {
        params,
        data,
        headers,
      });
      setResponse(response.data);
    }

    fetchData();
  }, []);

  return [response, setResponse];
};

const post = async (path, params = {}, data = {}) =>
  await axios.post(API_URL + path, data, { params });

export { useRequest, post };
