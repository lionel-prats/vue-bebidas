import {ref, watch, onMounted, computed} from "vue"
import { defineStore } from "pinia"

import {useBebidasStore} from "./bebidas"
import {useModalStore} from "./modal"
import {useNotificacionStore} from "./notificaciones"

export const useFavoritosStore = defineStore("favoritos", () => {
    
    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificacion = useNotificacionStore()
    const favoritos = ref([])

    // apenas se carga el store seteo el state favoritos con lo que pueda haber almacenado en localStorage (v246)
    onMounted( () => favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [] )

    // bloque para que cada vez que cambie el state favoritos se ejecute el codigo del watch aplicado a este estate y se guarde en localStorage su contenido (v245)
    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })
    function sincronizarLocalStorage() {
        localStorage.setItem("favoritos", JSON.stringify(favoritos.value))
    }
    // fin bloque

    function existeFavorito() {
        // const favoritosLocalStorage = JSON.parse(localStorage.getItem("favoritos"))
        // return favoritosLocalStorage.some(favorito => favorito.idDrink === id)
        return favoritos.value.some(favorito => favorito.idDrink === bebidas.receta.idDrink)
    }

    function activarNotificacion(texto) { // v256
        notificacion.show = true
        notificacion.texto = texto
        // setTimeout(() => { // v255
        //     notificacion.$reset()
        // }, 3000);
    }
    
    function agregarFavorito() {
        favoritos.value.push(bebidas.receta)
        activarNotificacion("Se agregó a favoritos")
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink)
        activarNotificacion("Eliminado de favoritos")
    }

    function handleClickFavorito(/* eventoJSPasadodesdeModal */) {
        if(existeFavorito()) {
            eliminarFavorito()
        } else {
            agregarFavorito()
        }
        // console.log(eventoJSPasadodesdeModal.target.textContent);
        modal.handleClickModal()
    }
    
    const noFavoritos = computed (() => favoritos.value.length === 0)

    return {
        // state
        favoritos,

        // getters
        noFavoritos,
        
        // acciones
        handleClickFavorito,
        existeFavorito,
    }
})