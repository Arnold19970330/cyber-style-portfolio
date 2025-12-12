// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || "https://cyber-style-portfolio.onrender.com",
  endpoints: {
    contact: "/contact",
  },
} as const;

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}${endpoint}`;
};

