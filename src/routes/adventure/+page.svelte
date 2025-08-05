<!-- <script lang="ts">
 
  // 📦 IMPORTAÇÕES
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import GameBus from './components/GameBus.svelte';
  import MobileWarning from './components/MobileWarning.svelte';
  import GameBar from '../../lib/components/GameBar.svelte';
  import Modal from "$lib/components/Modal.svelte";
  import { criarTemporizador } from '$lib/utils/timer';

  // 📍 ROTA ATUAL
  const pathname = get(page).url.pathname;

  // 🎮 ESTADO DO JOGO
  let jogoPausado = false;
  let tempo = "00:00";
  let totalSegundos = 0;
  let nivel = 1;
  let tentativas = 0;
  let cartas = Array.from({ length: 12 }, (_, i) => ({ id: i, aberta: false }));

  // ⏱️ TEMPORIZADOR
  const temporizador = criarTemporizador((tempoFormatado, s) => {
    tempo = tempoFormatado;
    totalSegundos = s;
  });

  // 📲 ORIENTAÇÃO DA TELA
  let isLandscapeMobile = false;

  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  }

  function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    isLandscapeMobile = !isMobileDevice() || isLandscape;
  }

  // 🧠 MODAL DE INSTRUÇÕES
  let showIntroModal = true;
  let isFromHelpButton = false;

  function openFromHelpButton() {
    showIntroModal = true;
    isFromHelpButton = true;
  }

  function closeModal() {
    showIntroModal = false;
    isFromHelpButton = false;
  }

  // 🃏 AÇÕES DO JOGO
  function virarCarta(i: number) {
    cartas[i].aberta = !cartas[i].aberta;
  }

  function handlePause() {
    if (jogoPausado) {
      temporizador.iniciar();
      console.log('Jogo retomado');
    } else {
      temporizador.pausar();
      console.log('Jogo pausado');
    }
    jogoPausado = !jogoPausado;
  }

  function handleExit() {
    temporizador.pausar();

    if (pathname.includes('/adventure')) {
      goto('/');
    } else if (pathname.includes('/arcade')) {
      goto('/levels');
    }
  }

  // ▶️ CICLO DE VIDA
  onMount(() => {
    temporizador.iniciar();
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
  });

  onDestroy(() => {
    temporizador.pausar();
    window.removeEventListener('resize', checkOrientation);
  });
</script> -->

<!-- <script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import GameBus from './components/GameBus.svelte';
  import GameBar from '$lib/components/GameBar.svelte';
  import Modal from '$lib/components/Modal.svelte';


  import { criarTemporizador } from '$lib/utils/timer';


  import { Jogador } from '$lib/classes/jogador';
  import { criarTabuleiro, virarCarta as virarCartaJogo } from '$lib/utils/game_logic';
  import type { Tabuleiro } from '$lib/classes/tabuleiro';
  import type { Cartas } from '$lib/classes/Cartas';

  const pathname = get(page).url.pathname;


  let jogador: Jogador;
  let tabuleiro: Tabuleiro;
  let cartas: Cartas[] = [];

  let jogoPausado = false;
  let tempo = '00:00';
  let totalSegundos = 0;
  let nivel = 1;
  let tentativas = 0;

  const imagensDisponiveis = [
    '/imagens/bus1.png',
    '/imagens/bus2.png',
    '/imagens/bus3.png',
    '/imagens/bus4.png',
    '/imagens/bus5.png',
    '/imagens/bus6.png'
  ];

  const temporizador = criarTemporizador((tempoFormatado, s) => {
    tempo = tempoFormatado;
    totalSegundos = s;
  });


  let showIntroModal = true;
  let isFromHelpButton = false;

  function openFromHelpButton() {
    showIntroModal = true;
    isFromHelpButton = true;
  }

  function closeModal() {
    showIntroModal = false;
    isFromHelpButton = false;
  }

  function virarCarta(index: number) {
    const sucesso = virarCartaJogo(tabuleiro, index, jogador);
    if (sucesso) {
      tentativas = jogador.tentativas;
    }
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

  onMount(() => {
    jogador = new Jogador('Jogador');
    tabuleiro = criarTabuleiro('tabuleiro-1', 'adventure', imagensDisponiveis);
    cartas = tabuleiro.cartas;

    temporizador.iniciar();
  });

  onDestroy(() => {
    temporizador.pausar();
  });
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
    <p>Tap or click on two cards to reveal them. If they match, they stay open. If not, they’ll flip back – so try to remember their positions!</p>
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
        I’m ready!
      </button>
    {/if}
  </div>
</Modal>

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
  <GameBus cartasClasse={cartas} virarCarta={virarCarta} />
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
  import { Jogador } from '$lib/classes/jogador';
  import { criarTabuleiro, virarCarta as virarCartaJogo } from '$lib/utils/game_logic';
  import type { Tabuleiro } from '$lib/classes/tabuleiro';
  import { Cartas } from '$lib/classes/Cartas';

  const pathname = get(page).url.pathname;

  // 🎮 ESTADO DO JOGO
  let jogador: Jogador;
  let tabuleiro: Tabuleiro;
  let cartas: Cartas[] = [];

  let jogoPausado = false;
  let tempo = '00:00';
  let totalSegundos = 0;
  let nivel = 1;
  let tentativas = 0;

  const imagensDisponiveis = [
    '/imagens/bus1.png',
    '/imagens/bus2.png',
    '/imagens/bus3.png',
    '/imagens/bus4.png',
    '/imagens/bus5.png',
    '/imagens/bus6.png'
  ];

  const temporizador = criarTemporizador((tempoFormatado, s) => {
    tempo = tempoFormatado;
    totalSegundos = s;
  });

  // 📋 MODAL DE INSTRUÇÕES
  let showIntroModal = true;
  let isFromHelpButton = false;

  function openFromHelpButton() {
    showIntroModal = true;
    isFromHelpButton = true;
  }

  function closeModal() {
    showIntroModal = false;
    isFromHelpButton = false;
  }

  // 🃏 VIRAR CARTA
  function virarCarta(index: number) {
    console.log('Tentando virar carta:', index);
    console.log('Tabuleiro:', tabuleiro);
    console.log('Jogador:', jogador);
    
    if (!tabuleiro || !jogador) {
      console.error('Tabuleiro ou jogador não inicializados!');
      return;
    }
    
    const sucesso = virarCartaJogo(tabuleiro, index, jogador);
    if (sucesso) {
      tentativas = jogador.tentativas;
      // Força atualização das cartas
      cartas = [...tabuleiro.cartas];
    }
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
      
      if (tabuleiro && tabuleiro.cartas) {
        cartas = tabuleiro.cartas;
        console.log('Cartas atribuídas:', cartas);
      } else {
        console.error('Tabuleiro ou cartas são undefined!');
        // Fallback com cartas mock para teste
        cartas = Array.from({ length: 12 }, (_, i) =>
  new Cartas(
    i.toString(),
    imagensDisponiveis[i % 6],
    Math.floor(i / 2).toString(), // converte para string
    'hidden'
  )
);
        console.log('Usando cartas fallback:', cartas);
      }
      
      temporizador.iniciar();
      console.log('Temporizador iniciado');
    } catch (error) {
      console.error('Erro ao inicializar jogo:', error);
      
      // Em caso de erro, crie cartas mock para não quebrar a UI
     cartas = Array.from({ length: 12 }, (_, i) =>
  new Cartas(
    i.toString(),
    imagensDisponiveis[i % 6],
    Math.floor(i / 2).toString(), // converte para string
    'hidden'
  )
);
      console.log('Usando cartas de emergência:', cartas);
    }
  });

  onDestroy(() => {
    temporizador.pausar();
  });

  // Debug reativo
  $: {
    console.log('Estado atual das cartas:', cartas);
    console.log('Quantidade de cartas:', cartas?.length);
  }
</script>

<!-- MODAL DE INSTRUÇÕES -->
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
    </div>
  {/if}
</div>