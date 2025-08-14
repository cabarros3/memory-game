<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // 🎮 COMPONENTES
  import GameBus from './components/GameBus.svelte';
  import GameBar from '$lib/components/GameBar.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import VictoryModal from './components/modalWinner.svelte';
  import NomeJogadorModal from '$lib/components/modalNome.svelte'; // ✅ SEU MODAL

  // ⏱️ TEMPORIZADOR
  import { criarTemporizador } from '$lib/utils/timer';

  // 🧠 CLASSES E FUNÇÕES DO JOGO
  import { incrementarAcertosJogador, Jogador } from '$lib/classes/jogador';
  import { criarTabuleiro, resetarJogo, virarCarta as virarCartaJogo } from '$lib/utils/game_logic';
  import type { Tabuleiro } from '$lib/classes/tabuleiro';
  import { Cartas } from '$lib/classes/Cartas';
  import { RankingManager } from '$lib/utils/ranking'; // ✅ IMPORTA RANKING

  const pathname = get(page).url.pathname;

  // 🎮 ESTADO DO JOGO
  let jogador: Jogador;
  let mostrarModalNome = true; // ✅ INICIA MOSTRANDO O MODAL DE NOME
  let tabuleiro: Tabuleiro;
  let cartas: Cartas[] = [];
  let jogoIniciado = false;

  let jogoPausado: boolean = false;
  let tempo: string = '00:00';
  let tempoRestante: string = '01:00';
  let tempoEsgotado: boolean = false;
  let totalSegundos: number = 0;
  let nivel: number = 1;
  let tentativas: number = 0;
  let acertos: number = 0;
  let showVictoryModal: boolean = false;

  // ✅ NOVA VARIÁVEL DE CONTROLE
  let jogoFinalizado: boolean = false;

  // ✅ CONFIGURAÇÃO DO LIMITE (90 segundos para 6 pares)
  const TEMPO_LIMITE = 40; // segundos

  // 📋 MODAL DE INSTRUÇÕES
  let showIntroModal: boolean = false; // ✅ INICIA FALSO - só mostra após definir nome
  let isFromHelpButton: boolean = false;

  // 🎵 ESTADO DO ÁUDIO
  let backgroundMusic: HTMLAudioElement | null = null;
  let isMuted: boolean = false;
  let audioInitialized: boolean = false;

  // ✅ CORRIGIDO: Todas as imagens na mesma pasta
  const imagensDisponiveis: string[] = [
    '/images/img1.jpg',
    '/images/img5.jpeg',
    '/images/img3.png',
    '/images/img4.jpg',
    '/images/img6.jpeg',
    '/images/chuu.png',
    '/images/Onibus.jpg',
    '/images/img2.png',
    '/images/MemoBg.png'
  ];

  // ✅ TEMPORIZADOR ATUALIZADO COM CALLBACK EXPANDIDO
  const temporizador = criarTemporizador(
    (tempoRestanteFormatado, segundosRestantes) => {
      tempoRestante = tempoRestanteFormatado;
      
      if (segundosRestantes === 20 && !tempoEsgotado) {
        console.log('⚠️ 20 segundos restantes!');
      }
      
      if (segundosRestantes === 10 && !tempoEsgotado) {
        console.log('🚨 10 segundos restantes!');
      }
    },
    TEMPO_LIMITE
  );

  // ✅ FUNÇÃO PARA LIDAR COM NOME DEFINIDO
  function handleNomeDefinido(event: { detail: { nome: any; }; }) {
    const { nome } = event.detail;
    
    console.log('🎮 Nome do jogador definido:', nome);
    
    // Cria o jogador com o nome fornecido
    jogador = new Jogador(nome);
    
    // Esconde o modal de nome
    mostrarModalNome = false;
    
    // Agora mostra o modal de instruções
    showIntroModal = true;
    
    console.log('✅ Jogador criado:', jogador);
  }

  // 🎵 FUNÇÕES DE ÁUDIO
  function initAudio() {
    if (audioInitialized) return;
    
    try {
      backgroundMusic = new Audio('/audio/game_music.mpeg');
      backgroundMusic.loop = true;
      backgroundMusic.volume = 0.15;
      
      backgroundMusic.addEventListener('loadstart', () => console.log('🎵 Carregando áudio...'));
      backgroundMusic.addEventListener('canplay', () => console.log('🎵 Áudio pronto para tocar'));
      backgroundMusic.addEventListener('error', (e) => console.error('❌ Erro no áudio:', e));
      
      audioInitialized = true;
      console.log('🎵 Áudio inicializado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao inicializar áudio:', error);
    }
  }

  function startMusic() {
    if (!backgroundMusic) initAudio();
    
    if (!isMuted && backgroundMusic && audioInitialized) {
      backgroundMusic.play().catch(e => {
        console.log('🎵 Autoplay bloqueado - usuário precisa interagir primeiro');
      });
      console.log('🎵 Música iniciada');
    }
  }

  function stopMusic() {
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      console.log('🎵 Música parada');
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    console.log(`🎵 Audio ${isMuted ? 'mutado' : 'desmutado'}`);
    
    if (backgroundMusic) {
      if (isMuted) {
        backgroundMusic.pause();
      } else if (!tempoEsgotado && !jogoFinalizado) {
        backgroundMusic.play().catch(e => console.log('❌ Erro ao retomar áudio:', e));
      }
    }
  }

  function handlePlayAgain() {
    console.log('🔄 Jogador quer jogar novamente');
    showVictoryModal = false;
    
    tempoEsgotado = false;
    inicializarJogo();
    
    try {
      if (tabuleiro) {
        resetarJogo(tabuleiro, jogador, imagensDisponiveis);
        cartas = tabuleiro.cartas;
        
        temporizador.resetar();
        temporizador.iniciar();
        
        if (!isMuted) {
          startMusic();
        }
        
        console.log('✅ Jogo resetado com tabuleiro existente');
        console.log('📊 Novas cartas:', cartas.length);
        
      } else {
        tabuleiro = criarTabuleiro('tabuleiro-1', 'adventure', imagensDisponiveis);
        cartas = tabuleiro.cartas;
        
        temporizador.resetar();
        temporizador.iniciar();
        
        if (!isMuted) {
          startMusic();
        }
        
        console.log('✅ Novo tabuleiro criado');
        console.log('📊 Novas cartas:', cartas.length);
      }
      
      console.log('🔄 Estado após reset:');
      console.log(`  - Acertos: ${acertos}`);
      console.log(`  - Tentativas: ${tentativas}`);
      console.log(`  - Tempo restante: ${tempoRestante}`);
      console.log(`  - Jogo finalizado: ${jogoFinalizado}`);
      console.log(`  - Tempo esgotado: ${tempoEsgotado}`);
      console.log(`  - Áudio mutado: ${isMuted}`);
      
    } catch (error) {
      console.error('❌ Erro ao resetar jogo:', error);
      
      try {
        tabuleiro = criarTabuleiro('tabuleiro-1', 'adventure', imagensDisponiveis);
        cartas = tabuleiro.cartas;
        
        temporizador.resetar();
        temporizador.iniciar();
        
        if (!isMuted) {
          startMusic();
        }
        
        console.log('🆘 Tabuleiro recriado após erro');
        
      } catch (fallbackError) {
        console.error('❌ Erro crítico no fallback:', fallbackError);
        
        cartas = criarCartasFallback();
        
        temporizador.resetar();
        temporizador.iniciar();
        
        if (!isMuted) {
          startMusic();
        }
        
        console.log('🚨 Usando cartas de emergência');
      }
    }
    
    setTimeout(() => {
      acertos = jogador.acertos;
      tentativas = jogador.tentativas;
      console.log('🔄 Variáveis reativas atualizadas:', { acertos, tentativas });
    }, 100);
  }
  
  function handleTimeUp() {
    if (jogoFinalizado || tempoEsgotado) return;
    
    tempoEsgotado = true;
    jogoFinalizado = true;
    temporizador.pausar();
    
    stopMusic();
    
    console.log('⏰ Tempo esgotado!');
    console.log(`📊 Estado final: ${acertos}/${cartas.length / 2} pares encontrados`);
    console.log(`🎯 Tentativas: ${tentativas}`);
    
    // ✅ SALVA NO RANKING MESMO COM TEMPO ESGOTADO
    salvarNoRanking(true);
    
    setTimeout(() => {
      showVictoryModal = true;
    }, 300);
  }

  function inicializarJogo() {
    // ✅ NÃO RECRIA O JOGADOR se já existe (para manter o nome)
    if (!jogador) {
      jogador = new Jogador('Jogador'); // fallback caso algo dê errado
    }
    
    acertos = jogador.acertos;
    tentativas = jogador.tentativas;
    jogoFinalizado = false;
    console.log('🎮 Jogo inicializado - Jogador:', jogador.nome, 'Acertos:', acertos, 'Tentativas:', tentativas);
  }

  function openFromHelpButton() {
    showIntroModal = true;
    isFromHelpButton = true;
  }

  function closeModal() {
    showIntroModal = false;
    isFromHelpButton = false;
    temporizador.iniciar();
    
    startMusic();
  }
  
  function debugPares(cartas: Cartas[]) {
    console.log('\n🔍 === DEBUG DOS PARES ===');
    console.log('📊 Total de cartas:', cartas.length);
    
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


function criarCartasFallback(): Cartas[] {
  console.log('🏗️ Criando cartas fallback...');
  
  const imagensUnicas = imagensDisponiveis.slice(0, 9); // ✅ 8 imagens únicas para 8 pares = 16 cartas
  console.log('🖼️ Imagens selecionadas:', imagensUnicas);
  
  const cartasArray: Cartas[] = [];
  
  imagensUnicas.forEach((imagem, index) => {
    const pairId = `pair-${index}`;
    
    console.log(`🎴 Criando par ${index + 1}: ${imagem}`);
    
    const carta1 = new Cartas(
      `carta-${index}-a`,
      imagem,
      pairId,
      'hidden'
    );
    
    const carta2 = new Cartas(
      `carta-${index}-b`,
      imagem,
      pairId,
      'hidden'
    );
    
    cartasArray.push(carta1, carta2);
    
    console.log(`  ✅ Criadas: ${carta1.id} e ${carta2.id} (${pairId})`);
  });
  
  console.log('📦 Cartas antes do embaralhamento:', cartasArray.length);
  
  const cartasEmbaralhadas = [...cartasArray];
  for (let i = cartasEmbaralhadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasEmbaralhadas[i], cartasEmbaralhadas[j]] = [cartasEmbaralhadas[j], cartasEmbaralhadas[i]];
  }
  
  console.log('🎲 Cartas embaralhadas com sucesso!');
  console.log(`📊 Total de cartas criadas: ${cartasEmbaralhadas.length}`);
  
  debugPares(cartasEmbaralhadas);
  
  return cartasEmbaralhadas;
}
  // ✅ FUNÇÃO PARA SALVAR NO RANKING
  function salvarNoRanking(tempoEsgotadoParam: boolean = false) {
    if (!jogador) {
      console.warn('⚠️ Jogador não existe, não pode salvar no ranking');
      return;
    }
    
    const tempoDecorrido = Math.floor((Date.now() - jogador.tempoInicio) / 1000);
    
    try {
      const entrada = RankingManager.salvarNoRanking(
        jogador,
        nivel,
        tempoDecorrido,
        tempoEsgotadoParam
      );
      
      const posicao = RankingManager.encontrarPosicaoJogador(entrada.id);
      
      console.log(`🏆 ${jogador.nome} salvo no ranking na posição ${posicao}!`);
      console.log('📊 Dados salvos:', {
        nome: entrada.nome,
        pontuacao: entrada.pontuacaoFinal,
        acertos: entrada.acertos,
        tentativas: entrada.tentativas,
        precisao: entrada.precisao,
        tempo: tempoDecorrido
      });
      
      return entrada;
    } catch (error) {
      console.error('❌ Erro ao salvar no ranking:', error);
    }
  }

  function fimDeJogo() {
    if (jogoFinalizado) {
      console.log('⚠️ Fim de jogo já foi executado, ignorando...');
      return;
    }
    
    jogoFinalizado = true;
    temporizador.pausar();
    
    stopMusic();

    console.log('🏆 Fim de jogo!');
    
    const cartasMatched = cartas.filter(c => c.status === 'matched').length;
    console.log(`📊 Estado final: ${cartasMatched}/${cartas.length} cartas matched`);
    console.log(`🎯 Acertos do jogador: ${jogador.acertos}`);
    console.log(`📊 Tentativas: ${jogador.tentativas}`);

    // ✅ SALVA NO RANKING
    salvarNoRanking(false);

    setTimeout(() => {
      showVictoryModal = true;
    }, 300);
  }

  function handleGoHome() {
    console.log('🏠 Voltando para o menu principal');
    showVictoryModal = false;
    goto('/');
  }

  function virarCarta(index: number) {
    if (tempoEsgotado) {
      console.log('⏰ Tempo esgotado, não é possível virar cartas');
      return;
    }
    
    if (jogoFinalizado) {
      console.log('🛑 Jogo já finalizado, ignorando jogada');
      return;
    }
    
    console.log(`\n🎯 === VIRANDO CARTA ${index} ===`);

    if (!tabuleiro || !jogador) {
      console.error('❌ Tabuleiro ou jogador não inicializados!');
      return;
    }

    if (index < 0 || index >= cartas.length) {
      console.error(`❌ Índice inválido: ${index}. Total de cartas: ${cartas.length}`);
      return;
    }

    const carta = cartas[index];
    if (carta.status === 'matched' || carta.status === 'visible') {
      console.log(`⚠️ Carta ${index} já está ${carta.status}, ignorando`);
      return;
    }

    const sucesso = virarCartaJogo(tabuleiro, index, jogador);

    if (sucesso) {
      console.log('✅ Carta virada com sucesso');
      
      setTimeout(() => {
        console.log('🔄 Sincronizando após processamento...');
        
        tentativas = jogador.tentativas;
        acertos = jogador.acertos;

        cartas = tabuleiro.cartas.map(carta => new Cartas(
          carta.id,
          carta.imagem,
          carta.parId,
          carta.status
        ));

        console.log(`📊 Após sincronização: Acertos ${acertos}, Tentativas ${tentativas}`);
        
        const cartasMatched = cartas.filter(c => c.status === 'matched').length;
        const paresMatched = cartasMatched / 2;
        
        console.log(`🔍 Verificação:`);
        console.log(`  - jogador.acertos: ${jogador.acertos}`);
        console.log(`  - pares nas cartas: ${paresMatched}`);
        console.log(`  - variável acertos: ${acertos}`);
        
        if (Math.abs(jogador.acertos - paresMatched) > 0.1) {
          console.warn('⚠️ Possível inconsistência detectada, forçando sincronização...');
          jogador.acertos = Math.floor(paresMatched);
          acertos = jogador.acertos;
          console.log(`🔧 Acertos corrigidos para: ${acertos}`);
        }

        const todasMatched = cartas.every(c => c.status === 'matched');
        
        if (todasMatched && cartas.length > 0) {
          console.log('🏆 Todas as cartas estão matched - fim de jogo!');
          setTimeout(() => {
            if (!jogoFinalizado) {
              fimDeJogo();
            }
          }, 200);
        }
        
      }, 200);

    } else {
      console.log('❌ virarCartaJogo retornou false');
    }
    
    console.log('=== FIM VIRAR CARTA ===\n');
  }

  function handlePause() {
    if (jogoPausado) {
      temporizador.iniciar();
      if (!isMuted && backgroundMusic) {
        backgroundMusic.play().catch(e => console.log('Erro ao retomar música:', e));
      }
    } else {
      temporizador.pausar();
      if (backgroundMusic) {
        backgroundMusic.pause();
      }
    }
    jogoPausado = !jogoPausado;
  }

  function handleExit() {
    temporizador.pausar();
    
    stopMusic();
    
    if (pathname.includes('/adventure')) {
      goto('/');
    } else {
      goto('/levels');
    }
  }

  // ✅ REINICIAR JOGO (VOLTA AO MODAL DE NOME)
  function reiniciarJogo() {
    console.log('🔄 Reiniciando jogo completo - voltando ao modal de nome');
    
    // Para música e temporizador
    stopMusic();
    temporizador.pausar();
    
    // Reseta estados
    showVictoryModal = false;
    showIntroModal = false;
    jogoIniciado = false;
    jogoFinalizado = false;
    tempoEsgotado = false;
    
    // Volta ao modal de nome
    mostrarModalNome = true;
    
    console.log('✅ Jogo resetado - aguardando novo nome');
  }

  onMount(async () => {
    console.log('🚀 Montando componente Adventure...');
    
    // ✅ NÃO INICIALIZA NADA - aguarda o nome do jogador
    console.log('⏳ Aguardando nome do jogador...');
  });

  // ✅ FUNÇÃO PARA INICIALIZAR APÓS MODAL DE INSTRUÇÕES
  function iniciarJogoCompleto() {
    console.log('🚀 Iniciando jogo completo após instruções...');
    
    try {
      if (!jogador) {
        console.error('❌ Jogador não existe!');
        return;
      }

      // Reseta estatísticas do jogador mantendo o nome
      jogador.pontuacao = 0;
      jogador.tentativas = 0;
      jogador.acertos = 0;
      jogador.tempoInicio = Date.now();
      
      tabuleiro = criarTabuleiro('tabuleiro-1', 'adventure', imagensDisponiveis);
      console.log('✅ Tabuleiro criado:', tabuleiro);
      
      if (tabuleiro && tabuleiro.cartas && tabuleiro.cartas.length > 0) {
        cartas = tabuleiro.cartas;
        console.log('✅ Cartas atribuídas do tabuleiro:', cartas.length);
      } else {
        console.warn('⚠️ Tabuleiro ou cartas são undefined! Usando fallback...');
        cartas = criarCartasFallback();
        console.log('✅ Usando cartas fallback:', cartas.length);
      }
      
      temporizador.setTimeUpCallback(handleTimeUp);
      
      tempoRestante = temporizador.formatarTempo(TEMPO_LIMITE);
      
      acertos = jogador.acertos;
      tentativas = jogador.tentativas;
      
      console.log(`📊 Estado inicial:`);
      console.log(`  - Jogador: ${jogador.nome}`);
      console.log(`  - Total de cartas: ${cartas.length}`);
      console.log(`  - Pares esperados: ${cartas.length / 2}`);
      console.log(`  - Tempo limite: ${TEMPO_LIMITE} segundos`);
      console.log(`  - Tempo restante inicial: ${tempoRestante}`);
      console.log(`  - Acertos iniciais: ${acertos}`);
      
    } catch (error) {
      console.error('❌ Erro ao inicializar jogo:', error);
      
      if (!jogador) {
        console.error('❌ Erro crítico - voltando ao modal de nome');
        mostrarModalNome = true;
        return;
      }
      
      cartas = criarCartasFallback();
      temporizador.setTimeUpCallback(handleTimeUp);
      tempoRestante = temporizador.formatarTempo(TEMPO_LIMITE);
      
      console.log('🆘 Usando cartas de emergência:', cartas.length);
      console.log('🆘 Tempo restante definido como:', tempoRestante);
    }
  }

  // ✅ CHAMA INICIALIZAÇÃO QUANDO FECHA O MODAL DE INSTRUÇÕES
  function closeModalEIniciar() {
    closeModal();
    iniciarJogoCompleto();
  }

  onDestroy(() => {
    temporizador.pausar();
    
    stopMusic();
    if (backgroundMusic) {
      backgroundMusic = null;
    }
    audioInitialized = false;
  });

  $: {
    if (cartas && cartas.length > 0) {
      const statusCount = cartas.reduce((acc, carta) => {
        acc[carta.status] = (acc[carta.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('🎯 Estado atual das cartas:', statusCount);
      console.log('📊 Detalhes por carta:', cartas.map((c, i) => `${i}: ${c.status}`));
      
      const pares = cartas.reduce((acc, carta) => {
        if (!acc[carta.parId]) {
          acc[carta.parId] = [];
        }
        acc[carta.parId].push({ imagem: carta.imagem, status: carta.status });
        return acc;
      }, {} as Record<string, Array<{imagem: string, status: string}>>);
      
      console.log('🧩 Pares identificados:', pares);
      
      const matched = cartas.filter(c => c.status === 'matched').length;
      if (matched === cartas.length && matched > 0 && !jogoFinalizado) {
        console.log('🎯 Monitor reativo detectou todas as cartas matched!');
        console.log(`📊 Estado: ${matched}/${cartas.length} cartas matched`);
        
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

<!-- ✅ MODAL DE NOME - PRIMEIRA COISA A APARECER -->
<NomeJogadorModal 
  bind:mostrar={mostrarModalNome}
  on:nomeDefinido={handleNomeDefinido}
/>

<!-- MODAL DE INTRODUÇÃO (só aparece após definir nome) -->
<Modal
  open={showIntroModal}
  title="🧠 How to Play?"
  showCloseButton={isFromHelpButton}
  on:close={isFromHelpButton ? closeModal : closeModalEIniciar}
>
 <div class="flex flex-col gap-3 text-gray-800 font-medium">
  <p>🎮 <strong>Welcome to the MemoGame: Botafire!</strong> 🔥</p>
  <p>The legend is real. A beast that conquers the hills of the BR-101. Welcome to <em>The BotaFire.</em></p>
  <p>Now, the challenge is <strong>YOUR'S</strong>. Dive into this epic game and prove your memory is worthy of the legend. ⚔️🧠</p>
  <p>Your mission: <strong>Tame the chaos!</strong> </p>
  <p>🐉 Tap or click on two cards to reveal the icons of our daily campus survival—from the legendary <span class="italic">coxinha</span> 🥐 to the little dog who's the real dean 🐕‍🦺.</p>
  <p>If they match, they stay open. If not, they'll flip back into the shadows, so you must remember their positions.</p>
  <p>Pay close attention and plan your moves wisely. Speed is your enemy. Memory is your only weapon. Try to clear the board with the fewest attempts possible.</p>
  <p>🚀 Ready to play? Jump in now and make history! 🎉</p>
</div>

  <div slot="footer">
    {#if !isFromHelpButton}
      <button
        class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        on:click={closeModalEIniciar}
      >
        I'm ready!
      </button>
    {/if}
  </div>
</Modal>

<!-- ✅ MODAL DE VITÓRIA ATUALIZADO -->
<VictoryModal
  open={showVictoryModal}
  {acertos}
  {tentativas}
  precisao={tentativas > 0 ? Math.round((acertos * 2 / tentativas) * 100) : 0}
  {nivel}
  {tempoEsgotado}
  totalPares={8}
  isAdventure={true}
  on:playAgain={handlePlayAgain}
  on:goHome={handleGoHome}
  on:newGame={reiniciarJogo}
/>

<!-- GAMEBAR E JOGO (só aparece se o jogo foi iniciado) -->
{#if jogador && cartas.length > 0}
  <div class="flex min-h-screen flex-col items-center bg-[url('/vectors/img4.png')] bg-cover bg-center">
    <GameBar
      {tempoRestante}
      {nivel}
      {tentativas}
      {acertos}
      {jogoPausado}
      {isMuted}
      on:reabrirModal={openFromHelpButton}
      on:pause={handlePause}
      on:exit={handleExit}
      on:toggleAudio={toggleMute}
    />

    <div class="fixed bottom-30">
      <GameBus cartasClasse={cartas} {virarCarta} />
    </div>
  </div>
{:else if !mostrarModalNome && !showIntroModal}
  <!-- Loading state quando não há cartas mas jogo deveria estar rodando -->
  <div class="min-h-screen flex items-center justify-center bg-[url('/vectors/img4.png')] bg-cover bg-center">
    <div class="bg-white/90 rounded-xl p-8 text-center">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
      <p class="text-gray-600">Preparando o jogo...</p>
      <p class="text-sm text-gray-500 mt-2">Se demorar muito, recarregue a página</p>
    </div>
  </div>
{/if}