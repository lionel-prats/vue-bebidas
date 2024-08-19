import axios from "axios" 

const api = axios.create({
    // aca definimos la ruta raiz de la API a la cual haremos todas las peticiones
    baseURL: "https://www.thecocktaildb.com/api/json/v1/1" 
})

export default api