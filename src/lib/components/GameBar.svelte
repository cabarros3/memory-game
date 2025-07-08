<script lang="ts">
  // import Botao from './botao.svelte';

  import { page } from '$app/stores'; // verificar esse depracated
  import { get } from 'svelte/store';
  import { createEventDispatcher } from "svelte";

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

</script>

<div class="flex w-full gap-10 sm:gap-8 md:gap-20 px-4 py-4 justify-center font-bold text-black">
  <div class="flex bg-color2 px-5 py-2 text-sm justify-center items-center rounded-2xl">
    <span>{tempo}</span>
  </div>
  <div class="bg-color1 px-5 text-sm flex justify-center items-center rounded-2xl">
    <span>{tentativas}</span>
  </div>
   {#if !pathname.includes('/adventure')}
    <div class="bg-color3 px-5 py-2 text-sm flex justify-center items-center rounded-2xl">
    <span>Level {nivel}</span>
  </div>
  {/if}
  <button class="bg-color1 px-5 text-sm flex justify-center items-center rounded-2xl hover:cursor-pointer" on:click={handleAjudaClick}>{instructions}</button>
  
</div>
