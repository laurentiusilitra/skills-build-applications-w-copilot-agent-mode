export const getApiBaseUrl = () => {
  const explicitCodespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (explicitCodespaceName && explicitCodespaceName.trim() !== '') {
    return `https://${explicitCodespaceName}-8000.app.github.dev/api`;
  }

  const hostname = window.location.hostname;
  const match = hostname.match(/^(.*)-5173\.app\.github\.dev$/);

  if (match && match[1]) {
    return `https://${match[1]}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export const normalizeCollection = (payload, key) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.[key])) {
    return payload[key];
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};
