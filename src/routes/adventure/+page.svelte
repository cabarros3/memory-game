<script lang="ts">
  import { onMount } from 'svelte';
  import GameBus from './components/GameBus.svelte';
  import MobileWarning from './components/MobileWarning.svelte';
  import GameBar from '../../lib/components/GameBar.svelte';
  import Modal from "$lib/components/Modal.svelte";

  // ✅ CONTROLA O ESTADO DO MODAL E A ORIGEM DA ABERTURA
  let showIntroModal = true;
  let isFromHelpButton = false; // ← usado para decidir o comportamento do conteúdo

  function closeModal() {
    showIntroModal = false;
    isFromHelpButton = false; // ← reset ao fechar
  }

  // ✅ ESTA FUNÇÃO É CHAMADA QUANDO CLICA NO BOTÃO "Need help?" DO GameBar
  function openFromHelpButton() {
    showIntroModal = true;
    isFromHelpButton = true; // ← sinaliza que veio do botão
  }

  // Dados do jogo
  let tempo = "00:00";
  let nivel = 1;
  let tentativas = 0;
  let cartas = Array.from({ length: 12 }, (_, i) => ({ id: i, aberta: false }));

  function virarCarta(i: number) {
    cartas[i].aberta = !cartas[i].aberta;
  }

  // Controle de orientação (modo paisagem)
  let isLandscapeMobile = false;

  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  }

  function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    isLandscapeMobile = !isMobileDevice() || isLandscape;
  }

  onMount(() => {
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
  });
</script>

<!-- ✅ MODAL COM COMPORTAMENTO CONDICIONAL -->
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

  <!-- ✅ Botão "I'm ready!" só aparece se NÃO veio do botão de ajuda -->
 <!-- sempre renderiza o slot, mas controla o conteúdo internamente -->
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

<!-- ✅ LAYOUT COM GAMEBAR E GAMEBUS -->
{#if isLandscapeMobile}
  <div class="flex min-h-screen flex-col items-center bg-[url('/vectors/img4.png')] bg-cover bg-center">
    <!-- ✅ LIGA O BOTÃO DO GAMEBAR AO openFromHelpButton -->
    <GameBar
      {tempo}
      {nivel}
      {tentativas}
      on:reabrirModal={openFromHelpButton}
    />
    <GameBus {cartas} {virarCarta} />
  </div>
{:else}
  <MobileWarning />
{/if}
