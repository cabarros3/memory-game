<script lang="ts">
  import GameBus from './components/GameBus.svelte';
  import Botao from '../../lib/components/botao.svelte';
  import { onMount } from 'svelte';
  import MobileWarning from './components/MobileWarning.svelte';
  import GameBar from '../../lib/components/GameBar.svelte';
  let tempo = "00:00";
  let nivel = 1;
  let tentativas = 0;

  let cartas = Array.from({ length: 12 }, (_, i) => ({ id: i, aberta: false }));
  function virarCarta(i: number) {
    cartas[i].aberta = !cartas[i].aberta;
  }

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

{#if isLandscapeMobile}
  <div class="flex min-h-screen flex-col items-center bg-[url('/vectors/img4.png')] bg-cover bg-center">
	<GameBar {tempo} {nivel} {tentativas} />
  <GameBus {cartas} {virarCarta} />
  </div>
{:else}
  <MobileWarning />
{/if}
