<script lang="ts">
  // import Botao from './botao.svelte';

  import { page } from '$app/stores'; // verificar esse depracated
  import { get } from 'svelte/store';
  import { createEventDispatcher } from "svelte";
	import { DoorOpen, Pause, Settings } from 'lucide-svelte';
  

  const dispatch = createEventDispatcher();

  function handleAjudaClick() {
  dispatch("reabrirModal");
}

  // capturar caminho atual da URL
  const pathname = get(page).url.pathname;
  
  export let tempo: string = "00:00";
  export let nivel: number = 1;
  export let tentativas: number = 0;
  export const instructions = "Need help?"

   function handlePause() {
    dispatch('pause');
  }

  function handleExit() {
    dispatch('exit');
  }

</script>

<div class="flex w-full gap-5 sm:gap-8 md:gap-20 px-4 py-4 justify-center font-bold text-black">
  <!-- Botão Pause -->
  <button
    class="bg-white text-color4 px-4 py-2 rounded-2xl cursor-pointer shadow-lg"
    on:click={handlePause}
    aria-label="Pause game"
  >
    <Pause fill="currentColor" />
  </button>
  <div class="flex bg-color2 text-black px-5 py-2 shadow-lg text-sm justify-center items-center rounded-2xl">
    <span>{tempo}</span>
  </div>
  <div class="bg-color1 px-5 text-sm shadow-lg flex justify-center items-center rounded-2xl">
    <span>{tentativas}</span>
  </div>
   {#if !pathname.includes('/adventure')}
    <div class="bg-color3 px-5 py-2 text-sm shadow-lg flex justify-center items-center rounded-2xl">
    <span>Level {nivel}</span>
  </div>
  {/if}
  <button class="bg-color1 px-5 text-sm shadow-lg flex justify-center items-center rounded-2xl hover:cursor-pointer" on:click={handleAjudaClick}>{instructions}</button>
  

  <!-- Botão Sair -->
  <button
    class="bg-color4 text-white px-4 py-2 rounded-2xl shadow-lg cursor-pointer"
    on:click={handleExit}
    aria-label="Exit game"
  >
    <Settings />
  </button>
  
</div>
