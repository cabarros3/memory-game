<!-- VictoryModal.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Trophy, Clock, Target, TrendingUp, RotateCcw, Home } from 'lucide-svelte';
  
  const dispatch = createEventDispatcher();
  
  export let open = false;
  export let jogadorNome = '';
  export let tempo = '00:00';
  export let acertos = 0;
  export let tentativas = 0;
  export let precisao = 0;
  export let nivel = 1;
  export let isAdventure = false;
  
  function handlePlayAgain() {
    dispatch('playAgain');
    open = false;
  }
  
  function handleGoHome() {
    dispatch('goHome');
    open = false;
  }
  
  function handleNextLevel() {
    dispatch('nextLevel');
    open = false;
  }
  
  // Calcula estrelas baseado na precisão
  $: stars = precisao >= 90 ? 3 : precisao >= 70 ? 2 : 1;
  
  // Mensagens baseadas na performance
  $: performanceMessage = 
    precisao >= 95 ? "Perfect!" :
    precisao >= 80 ? "Excelent!" :
    precisao >= 60 ? "Cool!" :
    "Keep praticing!";
</script>

{#if open}
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-[url('/vectors/img4.png')] bg-cover bg-center z-50 flex items-center justify-center p-4">
    <!-- Modal -->
    <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
              <!-- Header com troféu animado -->
      <div class="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-t-2xl p-4 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-400/20"></div>
        
        <!-- Confetti effect (opcional) -->
        <div class="absolute top-2 left-4 w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
        <div class="absolute top-6 right-8 w-1 h-1 bg-white rounded-full animate-bounce delay-300"></div>
        <div class="absolute top-4 right-4 w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-500"></div>
        
        <div class="relative z-10 flex flex-col justify-center">
          <Trophy class="w-12 h-12 text-white mx-auto mb-2 animate-pulse" />
          <h2 class="text-xl font-bold text-white mb-1">🎉 Congrats!</h2>
          <p class="text-white font-medium text-sm">{performanceMessage}</p>
        </div>
      </div>
      
      <!-- Conteúdo principal -->
      <div class="p-4">
        <!-- Estrelas de performance -->
        <div class="flex justify-center mb-4">
          {#each Array(3) as _, i}
            <div class="mx-1">
              {#if i < stars}
                <svg class="w-6 h-6 text-yellow-400 animate-pulse" style="animation-delay: {i * 200}ms" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              {:else}
                <svg class="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              {/if}
            </div>
          {/each}
        </div>
        
        <!-- Estatísticas -->
        <div class="grid grid-cols-2 gap-3 mb-4">
          <!-- Tempo -->
          <div class="bg-blue-50 rounded-xl p-3 text-center">
            <Clock class="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p class="text-xs text-blue-600 font-medium">Time</p>
            <p class="text-lg font-bold text-blue-800">{tempo}</p>
          </div>
          
          <!-- Acertos -->
          <div class="bg-green-50 rounded-xl p-3 text-center">
            <Target class="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p class="text-xs text-green-600 font-medium">Matches</p>
            <p class="text-lg font-bold text-green-800">{acertos} pairs</p>
          </div>
          
          <!-- Tentativas -->
          <div class="bg-purple-50 rounded-xl p-3 text-center">
            <TrendingUp class="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p class="text-xs text-purple-600 font-medium">Attempts</p>
            <p class="text-lg font-bold text-purple-800">{tentativas}</p>
          </div>
          
          <!-- Precisão -->
          <div class="bg-orange-50 rounded-xl p-3 text-center">
            <div class="w-5 h-5 mx-auto mb-1 flex items-center justify-center">
              <span class="text-orange-600 font-bold text-sm">%</span>
            </div>
            <p class="text-xs text-orange-600 font-medium">Accuracy</p>
            <p class="text-lg font-bold text-orange-800">{precisao}%</p>
          </div>
        </div>
        
        <!-- Informação adicional -->
        <div class="bg-gray-50 rounded-xl p-3 mb-4 text-center">
          <p class="text-gray-600 text-sm">
            {#if isAdventure}
              Adventure completed!
            {:else}
              Nível {nivel} concluído!
            {/if}
          </p>
          {#if jogadorNome && jogadorNome !== 'Jogador'}
            <p class="text-gray-800 font-medium mt-1">{jogadorNome}</p>
          {/if}
        </div>
      </div>
      
      <!-- Botões de ação -->
      <div class="p-4 pt-0">
        <div class="flex gap-2">
          {#if isAdventure}
            <!-- Botões para Adventure mode -->
            <button
              on:click={handlePlayAgain}
              class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <RotateCcw class="w-4 h-4" />
              Play again
            </button>
            
            <button
              on:click={handleGoHome}
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <Home class="w-4 h-4" />
              Menu
            </button>
          {:else}
            <!-- Botões para Level mode -->
            <button
              on:click={handleNextLevel}
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <Trophy class="w-4 h-4" />
              Próximo Nível
            </button>
            
            <button
              on:click={handlePlayAgain}
              class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <RotateCcw class="w-4 h-4" />
              Repetir
            </button>
            
            <button
              on:click={handleGoHome}
              class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <Home class="w-4 h-4" />
              Menu
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes confetti-fall {
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
  
  /* .confetti {
    animation: confetti-fall 3s linear infinite;
  } */
</style>