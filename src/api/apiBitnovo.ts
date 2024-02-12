import axios from 'axios';
const baseUrl = 'https://payments.pre-bnvo.com/api/v1/';
const headers = { 'X-Device-Id': '4615faa0-8c71-4287-8124-17f99aac23b6' };

const axiosRequestConfig = {
  baseURL: baseUrl,
  headers,
};

const apiBitnovo = axios.create(axiosRequestConfig);

export default apiBitnovo;
