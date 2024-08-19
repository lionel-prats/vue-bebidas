import { ref, reactive, onMounted } from "vue"
import { defineStore } from "pinia"
import APIService from "../services/APIService"

export const useBebidasStore = defineStore("bebidas", () => {

    const categorias = ref([]) // state para almacenar consulta a la API
    const recetas = ref([]) // state para almacenar consulta a la API
    const receta = ref({}) // state para almacenar consulta a la API

    const busqueda = reactive({
        nombre: "",
        categoria: "",
    }) 

    onMounted(async function() { // v230
        try {
            const {data: {drinks}} = await APIService.obtenerCategorias()
            categorias.value = drinks
        } catch(error) {
            console.log(error)
        }
    })

    async function obtenerRecetas() {
        try {
            const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
            recetas.value = drinks
        } catch(error) {
            console.log(error)
        }
    }
    
    async function seleccionarBebida(id) {
        try {
            const {data: {drinks}} = await APIService.buscarReceta(id)
            console.log(drinks[0]);
            // recetas.value = drinks
        } catch(error) {
            console.log(error)
        }
    }

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
    }
})