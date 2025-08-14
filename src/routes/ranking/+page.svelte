<!-- src/routes/ranking/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { RankingManager, type RankingEntry, type RankingStats } from '$lib/utils/ranking';
  
  // Estado da página
  let ranking: RankingEntry[] = [];
  let estatisticas: RankingStats = {
    totalJogadores: 0,
    melhorTempo: 0,
    maiorPontuacao: 0,
    melhorPrecisao: 0
  };
  let filtroAtual: 'todos' | 'hoje' | 'semana' = 'todos';
  let carregando = true;

  // Carrega dados ao montar o componente
  onMount(() => {
    carregarRanking();
  });

  function carregarRanking() {
    carregando = true;
    
    setTimeout(() => {
      ranking = RankingManager.obterTopJogadores(20);
      estatisticas = RankingManager.obterEstatisticas();
      carregando = false;
      
      console.log('📊 Ranking carregado:', ranking.length, 'entradas');
    }, 300);
  }

  function filtrarRanking(filtro: typeof filtroAtual) {
    filtroAtual = filtro;
    const agora = new Date();
    const ranking_completo = RankingManager.obterRanking();
    
    switch (filtro) {
      case 'hoje':
        const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
        ranking = ranking_completo.filter((entry: { data: string | number | Date; }) => 
          new Date(entry.data) >= hoje
        ).slice(0, 20);
        break;
        
      case 'semana':
        const semanaAtras = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
        ranking = ranking_completo.filter((entry: { data: string | number | Date; }) => 
          new Date(entry.data) >= semanaAtras
        ).slice(0, 20);
        break;
        
      default:
        ranking = ranking_completo.slice(0, 20);
    }
  }

  function formatarData(isoString: string): string {
    const data = new Date(isoString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function obterCorPosicao(posicao: number): string {
    switch (posicao) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-blue-400 to-blue-600';
    }
  }

  function limparRanking() {
    if (confirm('⚠️ Tem certeza que deseja limpar todo o ranking? Esta ação não pode ser desfeita.')) {
      RankingManager.limparRanking();
      carregarRanking();
    }
  }

  function voltarInicio() {
    goto('/');
  }

  function jogarNovamente() {
    goto('/adventure'); // ou a rota do seu jogo
  }
</script>

<svelte:head>
  <title>🏆 Ranking - Jogo da Memória</title>
</svelte:head>

<main class="min-h-screen ">
  <div class="container mx-auto px-4 py-8">
    
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-5xl font-bold text-black mb-4 flex items-center justify-center gap-3">
        🏆 Hall of Fame
      </h1>
      <p class="text-xl text-black">The best players of MemoGame: BotaFire!</p>
    </div>

    <!-- Estatísticas Rápidas -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-black">{estatisticas.totalJogadores}</div>
        <div class="text-sm text-black">Players</div>
      </div>
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-black">{estatisticas.melhorPrecisao}%</div>
        <div class="text-sm text-black">Best Accuracy</div>
      </div>
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-black">{RankingManager.formatarTempo(estatisticas.melhorTempo)}</div>
        <div class="text-sm text-black">Best Time</div>
      </div>
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-black">{estatisticas.maiorPontuacao}</div>
        <div class="text-sm text-black">Highest Score</div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <button
        class="px-6 py-3 rounded-full font-semibold transition-all {filtroAtual === 'todos' 
          ? 'bg-white text-purple-600' 
          : 'bg-white/20 text-black hover:bg-white/30'}"
        on:click={() => filtrarRanking('todos')}
      >
        🌟 All Time
      </button>
      <button
        class="px-6 py-3 rounded-full font-semibold transition-all {filtroAtual === 'semana' 
          ? 'bg-white text-purple-600' 
          : 'bg-white/20 text-black hover:bg-white/30'}"
        on:click={() => filtrarRanking('semana')}
      >
        📅 This Week
      </button>
      <button
        class="px-6 py-3 rounded-full font-semibold transition-all {filtroAtual === 'hoje' 
          ? 'bg-white text-purple-600' 
          : 'bg-white/20 text-black hover:bg-white/30'}"
        on:click={() => filtrarRanking('hoje')}
      >
        🔥 Today
      </button>
    </div>

    <!-- Ranking Principal -->
    <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <h2 class="text-2xl font-bold text-white text-center">
          🎯 Top {ranking.length} Players
        </h2>
      </div>

      {#if carregando}
        <div class="p-12 text-center">
          <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p class="text-gray-600">Loading ranking...</p>
        </div>
      {:else if ranking.length === 0}
        <div class="p-12 text-center">
          <div class="text-6xl mb-4">🎮</div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Nenhuma pontuação ainda!</h3>
          <p class="text-gray-500 mb-6">Seja o primeiro a aparecer no ranking!</p>
          <button
            class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            on:click={jogarNovamente}
          >
            🚀 Start Play
          </button>
        </div>
      {:else}
        <div class="divide-y divide-gray-100">
          {#each ranking as entrada, index (entrada.id)}
            <div class="p-6 hover:bg-gray-50 transition-colors">
              <div class="flex items-center justify-between">
                
                <!-- Posição e Nome -->
                <div class="flex items-center gap-4">
                  <div class="flex-shrink-0">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-r {obterCorPosicao(index + 1)} flex items-center justify-center text-white font-bold text-lg">
                      {index + 1 <= 3 ? RankingManager.obterMedalha(index + 1) : index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-800">{entrada.nome}</h3>
                    <p class="text-sm text-gray-500">{formatarData(entrada.data)}</p>
                  </div>
                </div>

                <!-- Estatísticas -->
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div>
                    <div class="text-xl font-bold text-green-600">{entrada.pontuacaoFinal}</div>
                    <div class="text-xs text-gray-500">Pontos</div>
                  </div>
                  <div>
                    <div class="text-lg font-semibold text-blue-600">{entrada.acertos}</div>
                    <div class="text-xs text-gray-500">Acertos</div>
                  </div>
                  <div>
                    <div class="text-lg font-semibold text-purple-600">{entrada.precisao}%</div>
                    <div class="text-xs text-gray-500">Precisão</div>
                  </div>
                  <div>
                    <div class="text-lg font-semibold text-orange-600">{RankingManager.formatarTempo(entrada.tempoDecorrido)}</div>
                    <div class="text-xs text-gray-500">Tempo</div>
                  </div>
                  <div class="hidden md:block">
                    <div class="text-lg font-semibold text-red-600">{entrada.tentativas}</div>
                    <div class="text-xs text-gray-500">Tentativas</div>
                  </div>
                </div>
              </div>

              <!-- Barra de Progresso da Pontuação (opcional) -->
              {#if index < 3}
                <div class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full bg-gradient-to-r {obterCorPosicao(index + 1)}" 
                      style="width: {Math.min(100, (entrada.pontuacaoFinal / estatisticas.maiorPontuacao) * 100)}%"
                    ></div>
                  </div>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Ações -->
    <div class="flex flex-wrap justify-center gap-4 mt-8">
      <button
        class="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        on:click={jogarNovamente}
      >
        🎮 Jogar Novamente
      </button>
      <button
        class="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        on:click={voltarInicio}
      >
        🏠 Menu Principal
      </button>
      <button
        class="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
        on:click={limparRanking}
      >
        🗑️ Limpar Ranking
      </button>
    </div>

  </div>
</main>

<style>
  /* Animações personalizadas */
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .container > * {
    animation: slideUp 0.6s ease-out forwards;
  }
</style>