<!-- modalWinner.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Modal from '$lib/components/Modal.svelte';
  
  const dispatch = createEventDispatcher();
  
  export let open: boolean = false;
  // export let jogadorNome: string = '';
  export let acertos: number = 0;
  export let tentativas: number = 0;
  export let precisao: number = 0;
  export let nivel: number = 1;
  export let tempoEsgotado: boolean = false; // ✅ Nova prop
  export let totalPares: number = 6; // ✅ Nova prop
  export let isAdventure: boolean = false;
  
  // ✅ Determina se foi vitória ou derrota
  $: isVitoria = acertos >= totalPares && !tempoEsgotado;
  $: isDerrota = tempoEsgotado || (open && acertos < totalPares);
  
  function handlePlayAgain() {
    dispatch('playAgain');
  }
  
  function handleGoHome() {
    dispatch('goHome');
  }
</script>

<Modal
  {open}
  showCloseButton={false}
  on:close={() => {}}
>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col items-center justify-center gap-4 text-center">
    
    {#if isVitoria}
      <!-- ✅ MODAL DE VITÓRIA -->
      <div class="text-6xl mb-4">🏆</div>
      <h2 class="text-2xl font-bold text-green-600 mb-2">
        Great job!
      </h2>
      <p class="text-gray-600 mb-4">
        You’ve completed the {isAdventure ? 'challenge' : `level ${nivel}`}!
      </p>
      
    {:else}
      <!-- ✅ MODAL DE DERROTA -->
      <div class="text-6xl mb-4">⏰</div>
      <h2 class="text-2xl font-bold text-red-600 mb-2">
        Time’s up!
      </h2>
      <p class="text-gray-600 mb-4">
        You failed to complete the game in time.
      </p>
    {/if}
    
    <!-- ✅ ESTATÍSTICAS -->
    <div class="bg-gray-50 rounded-lg p-4 w-full max-w-sm">
      <div class="grid grid-cols-2 gap-4 text-sm">
        
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{acertos}</div>
          <div class="text-gray-600">of {totalPares} pairs</div>
        </div>
        
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600">{tentativas}</div>
          <div class="text-gray-600">attempts</div>
        </div>
        
        <div class="text-center col-span-2">
          <div class="text-2xl font-bold text-green-600">{precisao}%</div>
          <div class="text-gray-600">Accuracy</div>
        </div>
        
      </div>
    </div>
    
    {#if isVitoria}
      <p class="text-sm text-gray-500 mt-2">
        🎯 You matched all the pairs! Impressive memory! 
      </p>
    {:else}
      <p class="text-sm text-gray-500 mt-2">
        🧠 Keep practicing!
      </p>
    {/if}
    
  </div>

  <div class="flex flex-row justify-center gap-3">
    
    <button
      class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      on:click={handlePlayAgain}
    >
      {#if isVitoria}
        🔄 Play Again
      {:else}
        🔄 Try Again
      {/if}
    </button>
    
    <button
      class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
      on:click={handleGoHome}
    >
      🏠 Menu
    </button>
    
  </div>
  </div>
</Modal>