import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";
const headers = { "Access-Control-Allow-Origin": "*" };

const useRequest = (verb, path, params = {}, data = {}) => {
  const [response, setResponse] = useState(null);
  const [counter, setCounter] = useState(0);

  const requestAgain = () => setCounter(counter + 1);
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
  }, [counter]);

  return [response, requestAgain];
};

const post = async (path, params = {}, data = {}) =>
  await axios.post(API_URL + path, data, { params });

const put = async (path, params = {}, data = {}) =>
  await axios.put(API_URL + path, data, { params });

const deleteR = async (path, params = {}) =>
  await axios.delete(API_URL + path, { params });

export { useRequest, post, put, deleteR };
