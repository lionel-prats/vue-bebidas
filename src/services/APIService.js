// https://www.thecocktaildb.com/api.php

import api from "../lib/axios"

export default {
    obtenerCategorias() {
        return api.get("/list.php?c=list")
    },
    buscarRecetas({categoria, nombre}) {
        // const url = `/filter.php?c=${categoria}`
        // const url = `/filter.php?i=${nombre}`
        // const url = `/filter.php?i=${nombre}&c=${categoria}`
        const url = `/filter.php?c=${categoria}&i=${nombre}`
        // console.log(url);
        return api.get(url)
    },
    buscarReceta(id) {
        const url = `/lookup.php?i=${id}`
        return api.get(url)
    },
}