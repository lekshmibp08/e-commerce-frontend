const BASE_URL = "https://fakestoreapi.com"

const apiCall = async (url, options = {}) => {
  try {
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
export const getCategories = () => apiCall(`${BASE_URL}/products/categories`)
export const getProductsByCategory = (category) => apiCall(`${BASE_URL}/products/category/${category}`)

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
