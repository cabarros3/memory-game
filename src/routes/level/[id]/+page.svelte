<script lang="ts">
  // 📦 IMPORTAÇÕES
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';
  import GameBar from "$lib/components/GameBar.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { criarTemporizador } from '$lib/utils/timer';

  // 🎮 ESTADO DO JOGO
  let tempo = "00:00";
  let totalSegundos = 0;
  let nivel = 1;
  let tentativas = 0;
  let jogoPausado = false;

  // ⏱️ TEMPORIZADOR
  const temporizador = criarTemporizador((tempoFormatado, s) => {
    tempo = tempoFormatado;
    totalSegundos = s;
  });

  // 📍 ROTA
  onMount(() => {
    const { id } = get(page).params;
    nivel = parseInt(id) || 1;
    temporizador.iniciar();
  });

  onDestroy(() => {
    temporizador.pausar();
  });

  // 🎛️ MODAL DE INSTRUÇÕES
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

  // 🧠 AÇÕES DO GAMEBAR
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
    const pathname = get(page).url.pathname;

    if (pathname.includes('/adventure')) {
      goto('/');
    } else if (pathname.includes('/arcade')) {
      goto('/levels');
    }
  }
</script>

<!-- ✅ MODAL INSTRUÇÕES -->
<Modal
  open={showIntroModal}
  title="🎯 How to Play?"
  showCloseButton={isFromHelpButton}
  on:close={closeModal}
>
  <div class="flex flex-col gap-3">
    <p>Welcome to the Arcade Mode!</p>
    <p>Find all matching pairs as fast as you can.</p>
    <p>The faster you are, the better your score!</p>
  </div>

  <div slot="footer">
    {#if !isFromHelpButton}
      <button
        class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        on:click={closeModal}
      >
        Let’s Go!
      </button>
    {/if}
  </div>
</Modal>

<!-- ✅ GAMEBAR COM TEMPORIZADOR -->
<main class="relative w-full h-screen overflow-hidden">
  <div class="absolute inset-0 bg-[url('/vectors/img4.png')] bg-contain bg-repeat z-0"></div>
  <div class="relative z-10">
    <GameBar
      {tempo}
      {nivel}
      {tentativas}
      {jogoPausado}
      on:reabrirModal={openFromHelpButton}
      on:pause={handlePause}
      on:exit={handleExit}
    />
  </div>
</main>
