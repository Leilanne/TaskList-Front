import axios from 'axios';

/* eslint-disable import/prefer-default-export */
export const http = axios.create({
  baseURL: 'http://localhost:8080/api/',
});
