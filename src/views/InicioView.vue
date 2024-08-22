<script setup>
    import {useBebidasStore} from "../stores/bebidas" // importamos el Store de Pinia (v235)
    import Receta from "../components/Receta.vue";

    const storePiniaBebidas = useBebidasStore() // accedemos al Store de Pinia (v235)
</script>
<template>
    <h1 class="text-6xl font-extrabold">Recetas</h1>
    <p 
        v-if="storePiniaBebidas.noRecetas" 
        class="my-10 text-center text-2xl"
    >No hay Resultados, utiliza el formulario paar buscar recetas</p>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
        <Receta 
            v-for="receta in storePiniaBebidas.recetas"
            :key="receta.idDrink"
            :receta="receta"
        />
    </div>
</template>