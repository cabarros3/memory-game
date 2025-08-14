<!-- <script lang="ts">
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
  export let tempoRestante: string = '';

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
  

  <button
    class="bg-color4 text-white px-4 py-2 rounded-2xl shadow-lg cursor-pointer"
    on:click={handleExit}
    aria-label="Exit game"
  >
    <LogOut />
  </button>
  
</div> -->


<!-- <script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { Jogador } from "$lib/classes/jogador";
  import { LogOut, Pause, Play, Clock } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  const pathname = get(page).url.pathname;

  export let tempo: string = "00:00";
  export let nivel: number = 1;
  export let tentativas: number = 0;
  export let acertos = 0
  export let instructions: string = "Need help?"
  export let jogoPausado: boolean = false;
  export let tempoRestante: string = '';

  // ✅ Função para verificar se o tempo está ficando crítico
  function isTempoUrgente(tempoStr: string): boolean {
    if (!tempoStr || tempoStr === '00:00') return false;
    
    const [min, sec] = tempoStr.split(':').map(Number);
    const totalSeconds = min * 60 + sec;
    
    return totalSeconds <= 30; // Crítico quando restam 30s ou menos
  }

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

<div class="flex w-full gap-3 sm:gap-5 md:gap-8 px-4 py-4 justify-center font-bold text-black flex-wrap">

  <!-- Botão Pause ou Play -->
  <!-- <button
    class="bg-white text-color4 px-4 py-2 rounded-2xl cursor-pointer shadow-lg"
    on:click={handlePause}
    aria-label={jogoPausado ? "Resume game" : "Pause game"}
  >
    {#if jogoPausado}
      <Play fill="currentColor" class="w-8 h-8 sm:w-10 sm:h-10 text-color4" />
    {:else}
      <Pause fill="currentColor" class="w-8 h-8 sm:w-10 sm:h-10 text-color4" />
    {/if}
  </button> -->

  <!-- Tempo Decorrido -->
  <!-- <div class="flex bg-green-600 text-black px-3 sm:px-5 py-2 shadow-lg text-sm justify-center items-center rounded-2xl min-w-[4rem] sm:min-w-[4.5rem]">
    <span class="font-mono">{tempo}</span>
  </div> -->

  <!-- ✅ NOVO: Tempo Restante (só aparece se houver limite de tempo) -->
  <!-- {#if tempoRestante && tempoRestante !== '00:00'}
    <div 
      class="flex text-white px-3 sm:px-5 py-2 shadow-lg text-sm justify-center items-center rounded-2xl min-w-[4rem] sm:min-w-[4.5rem] transition-all duration-300"
      class:bg-red-600={isTempoUrgente(tempoRestante)}
      class:bg-blue-600={!isTempoUrgente(tempoRestante)}
      class:animate-pulse={isTempoUrgente(tempoRestante)}
    >
      <div class="flex items-center gap-1">
        <Clock class="w-3 h-3 sm:w-4 sm:h-4" />
        <span class="font-mono">{tempoRestante}</span>
      </div>
    </div>
  {/if} -->

  <!-- Tentativas -->
  <!-- <div class="bg-color1 px-3 sm:px-5 text-sm shadow-lg flex flex-col justify-center items-center rounded-2xl">
    <span class="text-xs sm:text-sm">Attempts</span>
    <span>{tentativas}</span>
  </div> -->

  <!-- Acertos -->
  <!-- <div class="bg-color2 px-3 sm:px-5 text-sm shadow-lg flex flex-col justify-center items-center rounded-2xl">
    <span class="text-xs sm:text-sm">Matches</span>
    <span>{acertos}</span>
  </div> -->

  <!-- Nível (só aparece fora do modo adventure) -->
  <!-- {#if !pathname.includes('/adventure')}
    <div class="bg-color3 px-3 sm:px-5 py-2 text-sm shadow-lg flex justify-center items-center rounded-2xl">
      <span>Level {nivel}</span>
    </div>
  {/if} -->

  <!-- Botão de Ajuda -->
  <!-- <button 
    class="bg-gray-200 px-3 sm:px-5 text-sm shadow-lg flex justify-center items-center rounded-2xl hover:cursor-pointer hover:bg-gray-300 transition-colors"
    on:click={handleAjudaClick}
  >
    {instructions}
  </button> -->

  <!-- Botão Sair -->
  <!-- <button
    class="bg-color4 text-white px-4 py-2 rounded-2xl shadow-lg cursor-pointer hover:bg-opacity-90 transition-all"
    on:click={handleExit}
    aria-label="Exit game"
  >
    <LogOut class="w-5 h-5 sm:w-6 sm:h-6" />
  </button>
   -->
<!-- </div> -->

<!-- <style>
  /* ✅ Animação personalizada para tempo crítico */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.02);
    }
  }

  .animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }

  /* ✅ Responsividade melhorada */
  @media (max-width: 640px) {
    .flex {
      gap: 0.5rem;
    }
  }
</style> --> 

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { Jogador } from "$lib/classes/jogador";
  import { LogOut, Pause, Play, Clock, Volume2, VolumeOff } from 'lucide-svelte';

  const dispatch = createEventDispatcher();

  const pathname = get(page).url.pathname;

  // export let tempo: string = "00:00"; // ✅ REMOVIDO - não usamos mais
  export let nivel: number = 1;
  export let tentativas: number = 0;
  export let acertos = 0
  export let instructions: string = "Need help?"
  export let jogoPausado: boolean = false;
  export let tempoRestante: string = '01:00'; // ✅ Padrão 60 segundos
  export let isMuted: boolean = false;

  // ✅ Função para verificar se o tempo está ficando crítico
  function isTempoUrgente(tempoStr: string): boolean {
    if (!tempoStr || tempoStr === '00:00') return false;
    
    const [min, sec] = tempoStr.split(':').map(Number);
    const totalSeconds = min * 60 + sec;
    
    return totalSeconds <= 30; // Crítico quando restam 30s ou menos
  }

  function handlePause() {
    dispatch('pause');
  }

  function handleExit() {
    dispatch('exit');
  }

  function handleAjudaClick() {
    dispatch("reabrirModal");
  }

   function handleToggleAudio() {
    dispatch('toggleAudio');
  }
</script>

<div class="flex w-full gap-3 sm:gap-5 md:gap-8 px-4 py-4 justify-center font-bold text-black flex-wrap">

  <!-- ✅ BOTÃO DE ÁUDIO -->
      <button
        class="bg-gray-200 px-3 sm:px-5 py-2 text-sm shadow-lg flex justify-center items-center rounded-2xl"
        class:border-red-500={isMuted}
        class:border-green-500={!isMuted}
        on:click={handleToggleAudio}
        title={isMuted ? 'Ativar áudio' : 'Desativar áudio'}
      >
        {#if isMuted}
          <VolumeOff />
          
        {:else}
          <Volume2 />
        {/if}
      </button>

  <!-- Botão Pause ou Play -->
  <button
    class="bg-white text-color4 px-4 py-2 rounded-2xl cursor-pointer shadow-lg"
    on:click={handlePause}
    aria-label={jogoPausado ? "Resume game" : "Pause game"}
  >
    {#if jogoPausado}
      <Play fill="currentColor" class="w-8 h-8 sm:w-10 sm:h-10 text-color4" />
    {:else}
      <Pause fill="currentColor" class="w-8 h-8 sm:w-10 sm:h-10 text-color4" />
    {/if}
  </button>

  <!-- Tempo Restante - Agora é o principal timer -->
  <div 
    class="flex text-white px-3 sm:px-5 py-2 shadow-lg text-sm justify-center items-center rounded-2xl min-w-[4rem] sm:min-w-[4.5rem] transition-all duration-300"
    class:bg-red-600={isTempoUrgente(tempoRestante)}
    class:bg-blue-600={!isTempoUrgente(tempoRestante)}
    class:animate-pulse={isTempoUrgente(tempoRestante)}
  >
    <div class="flex items-center gap-1">
      <Clock class="w-3 h-3 sm:w-4 sm:h-4" />
      <span class="font-mono font-bold">{tempoRestante}</span>
    </div>
  </div>

  <!-- Tentativas -->
  <div class="bg-color1 px-3 sm:px-5 text-sm shadow-lg flex flex-col justify-center items-center rounded-2xl">
    <span class="text-xs sm:text-sm">Attempts</span>
    <span>{tentativas}</span>
  </div>

  <!-- Acertos -->
  <div class="bg-color2 px-3 sm:px-5 text-sm shadow-lg flex flex-col justify-center items-center rounded-2xl">
    <span class="text-xs sm:text-sm">Matches</span>
    <span>{acertos}</span>
  </div>

  <!-- Nível (só aparece fora do modo adventure) -->
  {#if !pathname.includes('/adventure')}
    <div class="bg-color3 px-3 sm:px-5 py-2 text-sm shadow-lg flex justify-center items-center rounded-2xl">
      <span>Level {nivel}</span>
    </div>
  {/if}

  

  <!-- Botão de Ajuda -->
  <button 
    class="bg-gray-200 px-3 sm:px-5 text-sm shadow-lg flex justify-center items-center rounded-2xl hover:cursor-pointer hover:bg-gray-300 transition-colors"
    on:click={handleAjudaClick}
  >
    {instructions}
  </button>

  <!-- Botão Sair -->
  <button
    class="bg-red-400 text-white px-4 py-2 rounded-2xl shadow-lg cursor-pointer hover:bg-opacity-90 transition-all"
    on:click={handleExit}
    aria-label="Exit game"
  >
    <LogOut class="w-5 h-5 sm:w-6 sm:h-6" />
  </button>
  
</div>

<style>
  /* ✅ Animação personalizada para tempo crítico */

</style>