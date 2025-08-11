<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // 🎮 COMPONENTES
  import GameBus from './components/GameBus.svelte';
  import GameBar from '$lib/components/GameBar.svelte';
  import Modal from '$lib/components/Modal.svelte';

  // ⏱️ TEMPORIZADOR
  import { criarTemporizador } from '$lib/utils/timer';

  // 🧠 CLASSES E FUNÇÕES DO JOGO
  import { Jogador } from '$lib/classes/jogador';
  import { criarTabuleiro, virarCarta as virarCartaJogo } from '$lib/utils/game_logic';
  import type { Tabuleiro } from '$lib/classes/tabuleiro';
  import { Cartas } from '$lib/classes/Cartas';

  const pathname = get(page).url.pathname;

  // 🎮 ESTADO DO JOGO
  let jogador: Jogador;
  let tabuleiro: Tabuleiro;
  let cartas: Cartas[] = [];

  let jogoPausado: boolean = false;
  let tempo: string = '00:00';
  let totalSegundos: number = 0;
  let nivel: number = 1;
  let tentativas: number = 0;

  // ✅ CORRIGIDO: Todas as imagens na mesma pasta
  const imagensDisponiveis: string[] = [
    '/images/img1.jpg',
    '/images/img2.png',
    '/images/img3.png',
    '/images/img4.jpg',
    '/vectors/Onibus.jpg',
    '/vectors/img4.png'
  ];

  const temporizador = criarTemporizador((tempoFormatado, s) => {
    tempo = tempoFormatado;
    totalSegundos = s;
  });

  // 📋 MODAL DE INSTRUÇÕES
  let showIntroModal: boolean = true;
  let isFromHelpButton: boolean = false;

  function openFromHelpButton() {
    showIntroModal = true;
    isFromHelpButton = true;
  }

  function closeModal() {
    showIntroModal = false;
    isFromHelpButton = false;
  }

  // 🔍 FUNÇÃO DE DEBUG PARA VERIFICAR PARES
  function debugPares(cartas: Cartas[]) {
    console.log('\n🔍 === DEBUG DOS PARES ===');
    console.log('📊 Total de cartas:', cartas.length);
    
    // Agrupa cartas por pairId
    const grupos = cartas.reduce((acc, carta, index) => {
      if (!acc[carta.parId]) {
        acc[carta.parId] = [];
      }
      acc[carta.parId].push({ 
        index, 
        imagem: carta.imagem, 
        status: carta.status,
        id: carta.id 
      });
      return acc;
    }, {} as Record<string, Array<{index: number, imagem: string, status: string, id: string}>>);
    
    console.log('🧩 Grupos por pairId:');
    Object.entries(grupos).forEach(([pairId, cartas]) => {
      const mesmaImagem = new Set(cartas.map(c => c.imagem)).size === 1;
      const quantidadeCorreta = cartas.length === 2;
      
      console.log(`  ${pairId}: ${cartas.length} cartas ${quantidadeCorreta ? '✅' : '❌'} | Mesma imagem: ${mesmaImagem ? '✅' : '❌'}`);
      
      cartas.forEach(carta => {
        console.log(`    - Índice ${carta.index}: ${carta.imagem} (${carta.status}) [ID: ${carta.id}]`);
      });
    });
    
    // Verifica problemas
    const problemaPares = Object.values(grupos).some(grupo => grupo.length !== 2);
    const problemaImagens = Object.values(grupos).some(grupo => 
      new Set(grupo.map(c => c.imagem)).size !== 1
    );
    
    if (problemaPares) {
      console.error('❌ PROBLEMA: Alguns pares não têm exatamente 2 cartas!');
    }
    
    if (problemaImagens) {
      console.error('❌ PROBLEMA: Algumas cartas do mesmo par têm imagens diferentes!');
    }
    
    if (!problemaPares && !problemaImagens) {
      console.log('✅ Todos os pares estão corretos!');
    }
    
    console.log('=== FIM DEBUG DOS PARES ===\n');
    
    return grupos;
  }

  // ✅ FUNÇÃO PARA CRIAR CARTAS DE FALLBACK CORRETAMENTE
  function criarCartasFallback(): Cartas[] {
    console.log('🏗️ Criando cartas fallback...');
    
    // Garante que temos exatamente 6 imagens únicas
    const imagensUnicas = imagensDisponiveis.slice(0, 6);
    console.log('🖼️ Imagens selecionadas:', imagensUnicas);
    
    const cartasArray: Cartas[] = [];
    
    // Cria exatamente 2 cartas para cada imagem
    imagensUnicas.forEach((imagem, index) => {
      const pairId = `pair-${index}`;
      
      console.log(`🎴 Criando par ${index + 1}: ${imagem}`);
      
      // Primeira carta do par
      const carta1 = new Cartas(
        `carta-${index}-a`, // ID único para primeira carta
        imagem,
        pairId,
        'hidden'
      );
      
      // Segunda carta do par  
      const carta2 = new Cartas(
        `carta-${index}-b`, // ID único para segunda carta
        imagem,
        pairId,
        'hidden'
      );
      
      cartasArray.push(carta1, carta2);
      
      console.log(`  ✅ Criadas: ${carta1.id} e ${carta2.id} (${pairId})`);
    });
    
    console.log('📦 Cartas antes do embaralhamento:', cartasArray.length);
    
    // 🎲 EMBARALHAMENTO USANDO FISHER-YATES (mais robusto)
    const cartasEmbaralhadas = [...cartasArray];
    for (let i = cartasEmbaralhadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartasEmbaralhadas[i], cartasEmbaralhadas[j]] = [cartasEmbaralhadas[j], cartasEmbaralhadas[i]];
    }
    
    console.log('🎲 Cartas embaralhadas com sucesso!');
    
    // Debug final
    debugPares(cartasEmbaralhadas);
    
    return cartasEmbaralhadas;
  }

  // 🃏 VIRAR CARTA COM DEBUG MELHORADO
  function virarCarta(index: number) {
    console.log(`\n🎯 === VIRANDO CARTA ${index} ===`);
    
    if (!tabuleiro || !jogador) {
      console.error('❌ Tabuleiro ou jogador não inicializados!');
      return;
    }
    
    // Debug estado antes
    console.log('📋 Estado antes:');
    console.log(`  - Carta ${index}: ${cartas[index]?.status} (${cartas[index]?.imagem})`);
    console.log(`  - PairId: ${cartas[index]?.parId}`);
    
    // Encontra a carta par
    const cartaAtual = cartas[index];
    const cartaPar = cartas.find((c, i) => 
      i !== index && c.parId === cartaAtual.parId
    );
    
    if (cartaPar) {
      const indexPar = cartas.findIndex((c, i) => 
        i !== index && c.parId === cartaAtual.parId
      );
      console.log(`  - Carta par (${indexPar}): ${cartaPar.status} (${cartaPar.imagem})`);
    } else {
      console.error('❌ CARTA SEM PAR ENCONTRADO!');
      debugPares(cartas); // Debug completo quando há problema
    }
    
    const sucesso = virarCartaJogo(tabuleiro, index, jogador);
    
    if (sucesso) {
      tentativas = jogador.tentativas;
      
      // ✅ FORÇA REATIVIDADE: Cria um novo array com instâncias da classe Cartas
      cartas = tabuleiro.cartas.map(carta => new Cartas(
        carta.id,
        carta.imagem,
        carta.parId,
        carta.status
      ));
      
      // Debug estado depois
      console.log('📋 Estado depois:');
      console.log(`  - Carta ${index}: ${cartas[index]?.status}`);
      if (cartaPar) {
        const novoIndexPar = cartas.findIndex((c, i) => 
          i !== index && c.parId === cartaAtual.parId
        );
        console.log(`  - Carta par (${novoIndexPar}): ${cartas[novoIndexPar]?.status}`);
      }
      
      console.log('✅ Carta virada com sucesso!');
    } else {
      console.log('❌ virarCartaJogo retornou false');
    }
    
    console.log('=== FIM VIRAR CARTA ===\n');
  }

  function handlePause() {
    if (jogoPausado) {
      temporizador.iniciar();
    } else {
      temporizador.pausar();
    }
    jogoPausado = !jogoPausado;
  }

  function handleExit() {
    temporizador.pausar();
    if (pathname.includes('/adventure')) {
      goto('/');
    } else {
      goto('/levels');
    }
  }

  onMount(async () => {
    console.log('Montando componente Adventure...');
    
    try {
      jogador = new Jogador('Jogador');
      console.log('Jogador criado:', jogador);
      
      tabuleiro = criarTabuleiro('tabuleiro-1', 'adventure', imagensDisponiveis);
      console.log('Tabuleiro criado:', tabuleiro);
      console.log('Tabuleiro.cartas:', tabuleiro?.cartas);
      
      if (tabuleiro && tabuleiro.cartas && tabuleiro.cartas.length > 0) {
        cartas = tabuleiro.cartas;
        console.log('Cartas atribuídas:', cartas);
      } else {
        console.error('Tabuleiro ou cartas são undefined! Usando fallback...');
        // ✅ USAR FUNÇÃO CORRIGIDA
        cartas = criarCartasFallback();
        console.log('Usando cartas fallback corrigidas:', cartas);
      }
      
      temporizador.iniciar();
      console.log('Temporizador iniciado');
    } catch (error) {
      console.error('Erro ao inicializar jogo:', error);
      
      // ✅ EM CASO DE ERRO, USAR FUNÇÃO CORRIGIDA
      cartas = criarCartasFallback();
      console.log('Usando cartas de emergência:', cartas);
    }
  });

  onDestroy(() => {
    temporizador.pausar();
  });

  // Debug reativo
  $: {
    if (cartas && cartas.length > 0) {
      const statusCount = cartas.reduce((acc, carta) => {
        acc[carta.status] = (acc[carta.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('🎯 Estado atual das cartas:', statusCount);
      console.log('📊 Detalhes por carta:', cartas.map((c, i) => `${i}: ${c.status}`));
      
      // Debug dos pares
      const pares = cartas.reduce((acc, carta) => {
        if (!acc[carta.parId]) {
          acc[carta.parId] = [];
        }
        acc[carta.parId].push({ imagem: carta.imagem, status: carta.status });
        return acc;
      }, {} as Record<string, Array<{imagem: string, status: string}>>);
      
      console.log('🧩 Pares identificados:', pares);
    }
  }
</script>

<Modal
  open={showIntroModal}
  title="🧠 How to Play?"
  showCloseButton={isFromHelpButton}
  on:close={closeModal}
>
  <div class="flex flex-col gap-3">
    <p>Welcome to the MemoGame: Botafogo!</p>
    <p>Your goal is to find all the matching pairs hidden behind the bus windows.</p>
    <p>Tap or click on two cards to reveal them. If they match, they stay open. If not, they'll flip back – so try to remember their positions!</p>
    <p>Each level gets a little harder, with more cards and fewer chances.</p>
    <p>Pay attention, plan your moves, and try to complete the level with the fewest attempts possible!</p>
    <p>Good luck – and have fun discovering all the matching pairs!</p>
  </div>

  <div slot="footer">
    {#if !isFromHelpButton}
      <button
        class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        on:click={closeModal}
      >
        I'm ready!
      </button>
    {/if}
  </div>
</Modal>

<!-- GAMEBAR E JOGO -->
<div class="flex min-h-screen flex-col items-center bg-[url('/vectors/img4.png')] bg-cover bg-center">
  <GameBar
    {tempo}
    {nivel}
    {tentativas}
    {jogoPausado}
    on:reabrirModal={openFromHelpButton}
    on:pause={handlePause}
    on:exit={handleExit}
  />

  {#if cartas && cartas.length > 0}
    <GameBus cartasClasse={cartas} {virarCarta} />
  {:else}
    <div class="bg-yellow-100 p-4 rounded">
      <p>Carregando cartas... ou erro na inicialização</p>
      <p class="text-sm text-gray-600">Verifique se as imagens existem na pasta /images/</p>
    </div>
  {/if}
</div>