import axios from "axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API call failed:", error)
    return Promise.reject(error)
  }
)

export const getAllProducts = () => axiosInstance.get("/products")

export const getProductById = (id) => axiosInstance.get(`/products/${id}`)

export const registerUser = (userData) => axiosInstance.post("/users", userData)

export const loginUser = (credentials) => axiosInstance.post("/auth/login", credentials)









/*
const BASE_URL = process.env.REACT_APP_BASE_URL

const apiCall = async (url, options = {}) => {
  try {
    console.log('ENV',process.env.REACT_APP_BASE_URL);
    
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

export const getAllProducts = () => apiCall(`${BASE_URL}/products`)
export const getProductById = (id) => apiCall(`${BASE_URL}/products/${id}`)

export const registerUser = (userData) =>
  apiCall(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(userData),
  })

export const loginUser = (credentials) =>
  apiCall(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  })
*/