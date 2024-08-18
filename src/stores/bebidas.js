import { ref, onMounted } from "vue"
import { defineStore } from "pinia"
import axios from "axios" 

export const useBebidasStore = defineStore("bebidas", () => {
    const categorias = ref([])

    onMounted(async() => { // v230
        try {
            const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
            const {data: {drinks}} = await axios(url)
            categorias.value = drinks
        } catch(error) {
            console.log(error)
        }
    })

    return {
        categorias,
    }
})