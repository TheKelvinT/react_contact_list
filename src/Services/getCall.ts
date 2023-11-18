import apiCall from "./apiCall";

export default (url: string, useBaseUrl = true) => apiCall({ url, useBaseUrl });
