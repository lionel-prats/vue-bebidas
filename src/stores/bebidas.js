import { ref, reactive, onMounted, computed } from "vue"
import { defineStore } from "pinia"
import APIService from "../services/APIService"

import {useModalStore} from "./modal"



export const useBebidasStore = defineStore("bebidas", () => {

    const storePiniaModal = useModalStore()
    
    const categorias = ref([]) // state para almacenar consulta a la API
    const recetas = ref([]) // state para almacenar consulta a la API
    const receta = ref({}) // state para almacenar consulta a la API
    const busqueda = reactive({ 
        nombre: "",
        categoria: "",
    })  // state para almacenar lo ingresado por el usuario en el form de buscar recetas

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
            return
        } catch(error) {
            console.log(error)
        }
    }
    
    async function seleccionarBebida(id) {
        try {
            const {data: {drinks}} = await APIService.buscarReceta(id)
            
            // guardo en el state el detalle de la receta luego del click en "btn.Ver Receta"
            receta.value = drinks[0] 
            
            // renderizo el componente Modal.vue (v240)
            storePiniaModal.handleClickModal() 
        
        } catch(error) {
            console.log(error)
        }
    }

    const noRecetas = computed (() => recetas.value.length === 0)

    return {
        // states
        categorias,
        busqueda,
        recetas,
        receta,

        // getters 
        noRecetas,

        // acciones
        obtenerRecetas,
        seleccionarBebida,
    }
})