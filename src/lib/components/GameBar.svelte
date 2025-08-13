<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { Jogador } from "$lib/classes/jogador";
  import { LogOut, Pause, Play } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  const pathname = get(page).url.pathname;

  export let tempo: string = "00:00";
  export let nivel: number = 1;
  export let tentativas: number = 0;
  export let acertos = 0
  export let instructions: string = "Need help?"
  export let jogoPausado: boolean = false;

  function handlePause() {
    dispatch('pause');
  }

  function handleExit() {
    dispatch('exit');
  }

  function handleAjudaClick() {
    dispatch("reabrirModal");
  }
</script>


<div class="flex w-full gap-5 sm:gap-8 md:gap-20 px-4 py-4 justify-center font-bold text-black">


<!-- Botão Pause ou Play -->
  <button
    class="bg-white text-color4 px-4 py-2 rounded-2xl cursor-pointer shadow-lg"
    on:click={handlePause}
    aria-label={jogoPausado ? "Resume game" : "Pause game"}
  >
    {#if jogoPausado}
      <Play fill="currentColor" class="w-10 h-10 text-color4" />
    {:else}
      <Pause fill="currentColor" class="w-10 h-10 text-color4" />
    {/if}
  </button>

 <div class="flex bg-green-600 text-black px-5 py-2 shadow-lg text-sm justify-center items-center rounded-2xl w-[4.5rem]">
  <span class="font-mono">{tempo}</span>
</div>
  <div class="bg-color1 px-5 text-sm shadow-lg flex flex-col justify-center items-center rounded-2xl">
    <span>Attempts</span>
    <span>{tentativas}</span>
  </div>
  <div class="bg-color2 px-5 text-sm shadow-lg flex flex-col justify-center items-center rounded-2xl">
    <span>Matches</span>
    <span>{acertos}</span>
  </div>
   {#if !pathname.includes('/adventure')}
    <div class="bg-color3 px-5 py-2 text-sm shadow-lg flex justify-center items-center rounded-2xl">
    <span>Level {nivel}</span>
  </div>
  {/if}
  <button class="bg-gray-200 px-5 text-sm shadow-lg flex justify-center items-center rounded-2xl hover:cursor-pointer" on:click={handleAjudaClick}>{instructions}</button>
  

  <!-- Botão Sair -->
  <button
    class="bg-color4 text-white px-4 py-2 rounded-2xl shadow-lg cursor-pointer"
    on:click={handleExit}
    aria-label="Exit game"
  >
    <LogOut />
  </button>
  
</div>
