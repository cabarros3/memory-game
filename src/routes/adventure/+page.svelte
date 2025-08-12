<!-- <script lang="ts">
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
  import { incrementarAcertosJogador, Jogador } from '$lib/classes/jogador';
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
  let acertos: number = 0;

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

  // ✅ FUNÇÃO CORRIGIDA PARA INICIALIZAR ACERTOS
function inicializarJogo() {
  jogador = new Jogador('Jogador');
  acertos = jogador.acertos; // Sincroniza com o objeto jogador
  tentativas = jogador.tentativas;
  console.log('🎮 Jogo inicializado - Acertos:', acertos, 'Tentativas:', tentativas);
}

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
    temporizador.iniciar()
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

  function fimDeJogo() {
  temporizador.pausar();

  console.log('🏆 Fim de jogo!');

  alert(`🏆 Parabéns, ${jogador.nome}!
⏱️ Tempo: ${tempo}
🎯 Acertos: ${jogador.acertos} pares
📊 Tentativas: ${jogador.tentativas}`);
  
  // Aqui você pode redirecionar ou abrir um modal de "fim de jogo"
  // goto('/levels'); // exemplo
}

  // 🃏 VIRAR CARTA COM DEBUG MELHORADO
  function virarCarta(index: number) {
  console.log(`\n🎯 === VIRANDO CARTA ${index} ===`);

  if (!tabuleiro || !jogador) {
    console.error('❌ Tabuleiro ou jogador não inicializados!');
    return;
  }

  const sucesso = virarCartaJogo(tabuleiro, index, jogador);

  if (sucesso) {
    tentativas = jogador.tentativas;

    // Atualiza array de cartas com nova instância para forçar reatividade
    cartas = tabuleiro.cartas.map(carta => new Cartas(
      carta.id,
      carta.imagem,
      carta.parId,
      carta.status
    ));

    // ✅ Verifica se o par encontrado foi marcado como 'matched'
    const cartasMatchedAgora = cartas.filter(c => c.status === 'matched').length;
    const totalAcertosAnterior = jogador.acertos;

    // Cada par tem 2 cartas — logo, se matched aumentou, houve acerto
    if (cartasMatchedAgora / 2 > totalAcertosAnterior) {
      incrementarAcertosJogador(jogador);
      console.log(`🎯 Novo acerto! Total: ${jogador.acertos}`);
    }

    // ✅ Checa se todas as cartas estão matched
    const todasEncontradas = cartas.every(c => c.status === 'matched');
    if (todasEncontradas) {
      fimDeJogo();
    }

  } else {
    console.log('❌ virarCartaJogo retornou false');
  }
}
// 🃏 VIRAR CARTA COM DETECÇÃO CORRETA DE ACERTOS
// function virarCarta(index: number) {
//   console.log(`\n🎯 === VIRANDO CARTA ${index} ===`);

//   if (!tabuleiro || !jogador) {
//     console.error('❌ Tabuleiro ou jogador não inicializados!');
//     return;
//   }

//   // Guarda o número de acertos ANTES da jogada
//   const acertosAntes = jogador.acertos;
//   console.log(`📊 Acertos antes da jogada: ${acertosAntes}`);

//   const sucesso = virarCartaJogo(tabuleiro, index, jogador);

//   if (sucesso) {
//     // Atualiza tentativas
//     tentativas = jogador.tentativas;

//     // Atualiza array de cartas com nova instância para forçar reatividade
//     cartas = tabuleiro.cartas.map(carta => new Cartas(
//       carta.id,
//       carta.imagem,
//       carta.parId,
//       carta.status
//     ));

//     // ✅ DETECÇÃO CORRETA DE NOVOS ACERTOS
//     // Verifica se houve aumento no número de acertos do jogador
//     const acertosDepois = jogador.acertos;
//     console.log(`📊 Acertos depois da jogada: ${acertosDepois}`);
    
//     if (acertosDepois > acertosAntes) {
//       const novosAcertos = acertosDepois - acertosAntes;
//       console.log(`🎯 ${novosAcertos} novo(s) acerto(s)! Total: ${jogador.acertos}`);
      
//       // Atualiza a variável reativa local para o template
//       acertos = jogador.acertos;
//     }

//     // ✅ Verifica fim de jogo
//     const todasEncontradas = cartas.every(c => c.status === 'matched');
//     if (todasEncontradas) {
//       console.log('🏆 Todas as cartas foram encontradas!');
//       fimDeJogo();
//     }

//   } else {
//     console.log('❌ virarCartaJogo retornou false');
//   }
// }

// Alternativa mais simples - apenas force a reatividade
// function virarCarta(index: number) {
//   console.log(`\n🎯 === VIRANDO CARTA ${index} ===`);

//   if (!tabuleiro || !jogador) {
//     console.error('❌ Tabuleiro ou jogador não inicializados!');
//     return;
//   }

//   const acertosAntes = jogador.acertos;
//   console.log(`📊 Acertos antes da jogada: ${acertosAntes}`);

//   const sucesso = virarCartaJogo(tabuleiro, index, jogador);

//   if (sucesso) {
//     // ✅ FORÇA REATIVIDADE ATUALIZANDO TODAS AS VARIÁVEIS
//     tentativas = jogador.tentativas;
//     acertos = jogador.acertos; // ← Esta linha é crucial!

//     // Força reatividade com uma nova atribuição
//     jogador = { ...jogador }; // Cria uma nova referência do objeto

//     // Atualiza cartas
//     cartas = tabuleiro.cartas.map(carta => new Cartas(
//       carta.id,
//       carta.imagem,
//       carta.parId,
//       carta.status
//     ));

//     // Log para debug
//     console.log(`📊 Acertos atualizados: ${acertos}`);
//     console.log(`📊 Tentativas atualizadas: ${tentativas}`);

//     // Verifica fim de jogo
//     const todasEncontradas = cartas.every(c => c.status === 'matched');
//     if (todasEncontradas) {
//       console.log('🏆 Todas as cartas foram encontradas!');
//       fimDeJogo();
//     }

//   } else {
//     console.log('❌ virarCartaJogo retornou false');
//   }
// }


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

  // onMount(async () => {
  //   console.log('Montando componente Adventure...');
    
  //   try {
  //     jogador = new Jogador('Jogador');
  //     console.log('Jogador criado:', jogador);
      
  //     tabuleiro = criarTabuleiro('tabuleiro-1', 'adventure', imagensDisponiveis);
  //     console.log('Tabuleiro criado:', tabuleiro);
  //     console.log('Tabuleiro.cartas:', tabuleiro?.cartas);
      
  //     if (tabuleiro && tabuleiro.cartas && tabuleiro.cartas.length > 0) {
  //       cartas = tabuleiro.cartas;
  //       console.log('Cartas atribuídas:', cartas);
  //     } else {
  //       console.error('Tabuleiro ou cartas são undefined! Usando fallback...');
  //       // ✅ USAR FUNÇÃO CORRIGIDA
  //       cartas = criarCartasFallback();
  //       console.log('Usando cartas fallback corrigidas:', cartas);
  //     }
      
  //     // temporizador.iniciar();
  //     console.log('Temporizador iniciado');
  //   } catch (error) {
  //     console.error('Erro ao inicializar jogo:', error);
      
  //     // ✅ EM CASO DE ERRO, USAR FUNÇÃO CORRIGIDA
  //     cartas = criarCartasFallback();
  //     console.log('Usando cartas de emergência:', cartas);
  //   }
  // });

onMount(async () => {
  console.log('🚀 Montando componente Adventure...');
  
  try {
    // ✅ USA FUNÇÃO DE INICIALIZAÇÃO
    inicializarJogo();
    console.log('✅ Jogador criado:', jogador);
    
    tabuleiro = criarTabuleiro('tabuleiro-1', 'adventure', imagensDisponiveis);
    console.log('✅ Tabuleiro criado:', tabuleiro);
    console.log('📋 Tabuleiro.cartas:', tabuleiro?.cartas);
    
    if (tabuleiro && tabuleiro.cartas && tabuleiro.cartas.length > 0) {
      cartas = tabuleiro.cartas;
      console.log('✅ Cartas atribuídas do tabuleiro:', cartas.length);
    } else {
      console.warn('⚠️ Tabuleiro ou cartas são undefined! Usando fallback...');
      cartas = criarCartasFallback();
      console.log('✅ Usando cartas fallback:', cartas.length);
    }
    
    // ✅ GARANTE QUE ACERTOS ESTÁ SINCRONIZADO
    acertos = jogador.acertos;
    tentativas = jogador.tentativas;
    
    console.log(`📊 Estado inicial - Acertos: ${acertos}, Tentativas: ${tentativas}`);
    console.log('⏱️ Temporizador será iniciado quando modal for fechado');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar jogo:', error);
    
    // ✅ EM CASO DE ERRO, AINDA INICIALIZA O JOGADOR
    if (!jogador) {
      inicializarJogo();
    }
    
    cartas = criarCartasFallback();
    console.log('🆘 Usando cartas de emergência:', cartas.length);
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

<!-- GAMEBAR E JOGo -->
<!-- <div class="flex min-h-screen flex-col items-center bg-[url('/vectors/img4.png')] bg-cover bg-center">
  <GameBar
    {tempo}
    {nivel}
    {tentativas}
    {acertos}
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
</div> --> 


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
  import { incrementarAcertosJogador, Jogador } from '$lib/classes/jogador';
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
  let acertos: number = 0;

  // ✅ NOVA VARIÁVEL DE CONTROLE
  let jogoFinalizado: boolean = false;

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

  // ✅ FUNÇÃO CORRIGIDA PARA INICIALIZAR ACERTOS
  function inicializarJogo() {
    jogador = new Jogador('Jogador');
    acertos = jogador.acertos; // Sincroniza com o objeto jogador
    tentativas = jogador.tentativas;
    jogoFinalizado = false; // ✅ RESET DA FLAG
    console.log('🎮 Jogo inicializado - Acertos:', acertos, 'Tentativas:', tentativas);
  }

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
    temporizador.iniciar()
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

  // ✅ FUNÇÃO FIM DE JOGO COM PROTEÇÃO
  function fimDeJogo() {
    if (jogoFinalizado) {
      console.log('⚠️ Fim de jogo já foi executado, ignorando...');
      return;
    }
    
    jogoFinalizado = true; // ✅ MARCA COMO FINALIZADO
    temporizador.pausar();

    console.log('🏆 Fim de jogo!');
    
    // ✅ DEBUG DETALHADO DO ESTADO FINAL
    const cartasMatched = cartas.filter(c => c.status === 'matched').length;
    console.log(`📊 Estado final: ${cartasMatched}/${cartas.length} cartas matched`);
    console.log(`🎯 Acertos do jogador: ${jogador.acertos}`);
    console.log(`📊 Tentativas: ${jogador.tentativas}`);

    // ✅ DELAY PARA GARANTIR QUE TUDO FOI PROCESSADO
    setTimeout(() => {
      alert(`🏆 Parabéns, ${jogador.nome}!
⏱️ Tempo: ${tempo}
🎯 Acertos: ${jogador.acertos} pares
📊 Tentativas: ${jogador.tentativas}
🏅 Precisão: ${jogador.tentativas ? Math.round((jogador.acertos * 2 / jogador.tentativas) * 100) : 0}%

Você completou o nível!`);
      
      // Aqui você pode redirecionar ou abrir um modal de "fim de jogo"
      // goto('/levels'); // exemplo
    }, 300);
  }

  // ✅ FUNÇÃO VIRAR CARTA COM DETECÇÃO MELHORADA
  function virarCarta(index: number) {
    // ✅ PROTEÇÃO CONTRA JOGO JÁ FINALIZADO
    if (jogoFinalizado) {
      console.log('🛑 Jogo já finalizado, ignorando jogada');
      return;
    }
    
    console.log(`\n🎯 === VIRANDO CARTA ${index} ===`);

    if (!tabuleiro || !jogador) {
      console.error('❌ Tabuleiro ou jogador não inicializados!');
      return;
    }

    // ✅ VALIDAÇÃO DO ÍNDICE
    if (index < 0 || index >= cartas.length) {
      console.error(`❌ Índice inválido: ${index}. Total de cartas: ${cartas.length}`);
      return;
    }

    // ✅ VERIFICA SE A CARTA PODE SER VIRADA
    const carta = cartas[index];
    if (carta.status === 'matched' || carta.status === 'visible') {
      console.log(`⚠️ Carta ${index} já está ${carta.status}, ignorando`);
      return;
    }

    const sucesso = virarCartaJogo(tabuleiro, index, jogador);

    if (sucesso) {
      console.log('✅ Carta virada com sucesso');
      
      // ✅ ATUALIZA VARIÁVEIS REATIVAS
      tentativas = jogador.tentativas;
      acertos = jogador.acertos; // ✅ SINCRONIZA ACERTOS

      // Atualiza array de cartas com nova instância para forçar reatividade
      cartas = tabuleiro.cartas.map(carta => new Cartas(
        carta.id,
        carta.imagem,
        carta.parId,
        carta.status
      ));

      console.log(`📊 Após jogada: Acertos ${acertos}, Tentativas ${tentativas}`);

      // ✅ VERIFICAÇÃO MÚLTIPLA DE FIM DE JOGO
      
      // Método 1: Todas as cartas estão matched
      const todasMatched = cartas.every(c => c.status === 'matched');
      console.log(`🔍 Método 1 - Todas matched: ${todasMatched}`);
      
      // Método 2: Contagem de cartas matched
      const cartasMatchedAgora = cartas.filter(c => c.status === 'matched').length;
      const fimPorContagem = cartasMatchedAgora === cartas.length && cartas.length > 0;
      console.log(`🔍 Método 2 - Por contagem: ${cartasMatchedAgora}/${cartas.length} = ${fimPorContagem}`);
      
      // Método 3: Por acertos do jogador
      const totalPares = cartas.length / 2;
      const fimPorAcertos = jogador.acertos >= totalPares;
      console.log(`🔍 Método 3 - Por acertos: ${jogador.acertos}/${totalPares} = ${fimPorAcertos}`);
      
      // ✅ FIM DE JOGO SE PELO MENOS 2 MÉTODOS CONCORDAREM
      const metodosPositivos = [todasMatched, fimPorContagem, fimPorAcertos].filter(Boolean).length;
      
      if (metodosPositivos >= 2) {
        console.log(`🏆 ${metodosPositivos}/3 métodos detectaram fim de jogo!`);
        setTimeout(() => {
          if (!jogoFinalizado) { // ✅ PROTEÇÃO DUPLA
            fimDeJogo();
          }
        }, 200);
      } else {
        console.log(`⏳ Apenas ${metodosPositivos}/3 métodos detectaram fim. Continuando...`);
      }

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
    console.log('🚀 Montando componente Adventure...');
    
    try {
      // ✅ USA FUNÇÃO DE INICIALIZAÇÃO (que já reseta jogoFinalizado)
      inicializarJogo();
      console.log('✅ Jogador criado:', jogador);
      
      tabuleiro = criarTabuleiro('tabuleiro-1', 'adventure', imagensDisponiveis);
      console.log('✅ Tabuleiro criado:', tabuleiro);
      console.log('📋 Tabuleiro.cartas:', tabuleiro?.cartas);
      
      if (tabuleiro && tabuleiro.cartas && tabuleiro.cartas.length > 0) {
        cartas = tabuleiro.cartas;
        console.log('✅ Cartas atribuídas do tabuleiro:', cartas.length);
      } else {
        console.warn('⚠️ Tabuleiro ou cartas são undefined! Usando fallback...');
        cartas = criarCartasFallback();
        console.log('✅ Usando cartas fallback:', cartas.length);
      }
      
      // ✅ GARANTE QUE ACERTOS ESTÁ SINCRONIZADO
      acertos = jogador.acertos;
      tentativas = jogador.tentativas;
      
      // ✅ DEBUG DO ESTADO INICIAL
      console.log(`📊 Estado inicial:`);
      console.log(`  - Total de cartas: ${cartas.length}`);
      console.log(`  - Pares esperados: ${cartas.length / 2}`);
      console.log(`  - Acertos iniciais: ${acertos}`);
      console.log(`  - Jogo finalizado: ${jogoFinalizado}`);
      console.log('⏱️ Temporizador será iniciado quando modal for fechado');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar jogo:', error);
      
      // ✅ EM CASO DE ERRO, AINDA INICIALIZA O JOGADOR
      if (!jogador) {
        inicializarJogo();
      }
      
      cartas = criarCartasFallback();
      console.log('🆘 Usando cartas de emergência:', cartas.length);
    }
  });

  onDestroy(() => {
    temporizador.pausar();
  });

  // ✅ DEBUG REATIVO COM MONITORAMENTO DE FIM DE JOGO
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
      
      // ✅ MONITOR REATIVO DE FIM DE JOGO
      const matched = cartas.filter(c => c.status === 'matched').length;
      if (matched === cartas.length && matched > 0 && !jogoFinalizado) {
        console.log('🎯 Monitor reativo detectou todas as cartas matched!');
        console.log(`📊 Estado: ${matched}/${cartas.length} cartas matched`);
        
        // ✅ BACKUP DE FINALIZAÇÃO VIA REATIVIDADE
        setTimeout(() => {
          if (!jogoFinalizado) {
            console.log('🚀 Executando fim de jogo pelo monitor reativo');
            fimDeJogo();
          }
        }, 150);
      }
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
    {acertos}
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

  <!-- ✅ BOTÃO DE DEBUG TEMPORÁRIO (remova depois de testar) -->
<!--   
  <div class="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded text-xs">
    <button on:click={() => {
      console.log('🔍 DEBUG MANUAL:');
      console.log('Cartas:', cartas?.map(c => c.status));
      console.log('Matched:', cartas?.filter(c => c.status === 'matched').length);
      console.log('Total:', cartas?.length);
      console.log('Jogo finalizado:', jogoFinalizado);
      console.log('Acertos jogador:', jogador?.acertos);
    }}>
      Debug
    </button>
  </div>
  -->
</div>