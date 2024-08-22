import {ref/* , watch */, watchEffect} from "vue"
import { defineStore } from "pinia"

export const useNotificacionStore = defineStore("notificacion", () => {

    const texto = ref("")
    const error = ref(false)
    const show = ref(false)

    // watch(show, () => { 
    watchEffect( () => { 
        if(show.value) {
            setTimeout(() => {
                texto.value = ""
                error.value = false
                show.value = false
            }, 3000);
        }
    })

    // function $reset() { // v255
    //     texto.value = ""
    //     error.value = false
    //     show.value = false
    // }

    return {
        // states
        texto,
        error,
        show,
        
        // getters

        // acciones
        // $reset,
    }
})