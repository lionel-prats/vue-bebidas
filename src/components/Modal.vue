<script setup>
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import {useBebidasStore} from "../stores/bebidas"
    import {useModalStore} from "../stores/modal"
    import {useFavoritosStore} from "../stores/favoritos"

    const storePiniaBebidas = useBebidasStore()
    const storePiniaModal = useModalStore()
    const favoritos = useFavoritosStore()

    const formatearIngredientes = () => {
      const ingredientesDiv = document.createElement("DIV")
      for(let i = 1; i <= 15; i++ ) {
        if(storePiniaBebidas.receta[`strIngredient${i}`]){

          const ingrediente = storePiniaBebidas.receta[`strIngredient${i}`]
          const cantidad = storePiniaBebidas.receta[`strMeasure${i}`]
          
          const ingredientesCantidad = document.createElement("P")
          ingredientesCantidad.classList.add("text-lg", "text-gray-500")
          ingredientesCantidad.textContent = `${ingrediente} - ${cantidad}`

          ingredientesDiv.appendChild(ingredientesCantidad)
        }
      }
      return ingredientesDiv
    }
</script>

<template>
    <TransitionRoot as="template" :show="storePiniaModal.modal" >
      <Dialog as="div" class="relative z-10" @close="storePiniaModal.handleClickModal()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                <div>
                  <div class="mt-3">
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">{{ storePiniaBebidas.receta.strDrink }}</DialogTitle>  
                    <img 
                      :src="storePiniaBebidas.receta.strDrinkThumb" 
                      :alt="`Imagen de ${storePiniaBebidas.receta.strDrink}`"
                      class="mx-auto w-96"
                    >
                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">Ingredientes y Cantidades</DialogTitle>  

                    <!-- v242 -->
                    <div v-html="formatearIngredientes().outerHTML"></div>

                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">Instrucciones</DialogTitle>  
                    <p class="text-lg text-gray-500">
                      {{ storePiniaBebidas.receta.strInstructions }}
                    </p>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                  <button
                    type="button"
                    class="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
                    @click="storePiniaModal.handleClickModal()"
                  >Cerrar</button>
                  <button
                    type="button"
                    class="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500"
                    @click="favoritos.handleClickFavorito(/* $event */)"
                  >{{ storePiniaModal.textoBoton }}</button>
                </div> 
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
  