<script setup>
    import {computed} from "vue"
    import {RouterLink, useRoute} from "vue-router"
    import {useBebidasStore} from "../stores/bebidas" // importamos el Store de Pinia (v230)
    import {useNotificacionStore} from "../stores/notificaciones"
    
    const route = useRoute()
    const storePiniaBebidas = useBebidasStore() // accedemos al Store de Pinia (v230)
    const notificacion = useNotificacionStore()

    const paginaInicio = computed(() => route.name === "inicio")

    const handleSubmit = () => {
        if(Object.values(storePiniaBebidas.busqueda).includes("")) {
            // notificacion.texto = "Todos los campos son obligatorios"
            // notificacion.show = true
            // notificacion.error = true

            // notificacion.$patch({ // v257
            //     texto: "Todos los campos son obligatorios",
            //     show: true,
            //     error: true,
            // })
            
            notificacion.$state = { // v257
                texto: "Todos los campos son obligatorios",
                show: true,
                error: true,
            }

            return
        }
        storePiniaBebidas.obtenerRecetas()
    }

</script>

<template>
    <header 
        class="bg-slate-800"
        :class="{header: paginaInicio}"    
    >
        <div class="mx-auto container px-5 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink :to="{name: 'inicio'}">
                        <img class="w-32" src="/img/logo.svg" alt="Logotipo" />
                    </RouterLink>
                </div>
                <nav class="flex gap-4 text-white">
                    <RouterLink 
                        :to="{name: 'inicio'}"
                        class="uppercase font-bold"
                        active-class="text-orange-500"
                    >Inicio</RouterLink>
                    <RouterLink 
                        :to="{name: 'favoritos'}"
                        class="uppercase font-bold"
                        active-class="text-orange-500"
                    >Favoritos</RouterLink>
                </nav>
            </div>
            <form 
                v-if="paginaInicio"
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                @submit.prevent="handleSubmit" 
            >
                <div class="space-y-4">
                    <label
                        class="block text-white uppercase font-extrabold text-lg" 
                        for="ingrediente"
                    >Nombre o Ingredientes</label>
                    <input 
                        type="text" 
                        id="ingrediente"
                        class="p-3 w-full rounded-lg focus:outline-none"    
                        placeholder="Nombre o Ingrediente: Vodka, Tequila, etc."
                        v-model="storePiniaBebidas.busqueda.nombre"
                    >
                </div>
                <div class="space-y-4">
                    <label
                        class="block text-white uppercase font-extrabold text-lg" 
                        for="categoria"
                    >Categoría</label>
                    <select 
                        id="categoria"
                        class="p-3 w-full rounded-lg focus:outline-none"  
                        v-model="storePiniaBebidas.busqueda.categoria"  
                    >
                        <option value="">-- Seleccione --</option>
                        <option 
                            v-for="categoria in storePiniaBebidas.categorias"
                            :key="categoria.strCategory"
                            :value="categoria.strCategory"
                        >{{categoria.strCategory}}</option>  
                    </select>
                </div>
                <input 
                    type="submit" 
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
                    value="Buscar Recetas"
                >
            </form>
        </div>
    </header>
</template>
<style>
    .header {
        background-image: url("/img/bg.jpg");
        background-size: cover;
        background-position: center;
    }
</style>