// Centralized API configuration for safe production deployment
// Vite uses import.meta.env to access environment variables.
// Fallback to localhost if the variable is missing to ensure local dev doesn't break.

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
