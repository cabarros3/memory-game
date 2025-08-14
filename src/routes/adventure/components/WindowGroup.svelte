<script lang="ts">
  import CardWindow from './CardWindow.svelte';
  import type { Cartas } from '$lib/classes/Cartas';

  export let baseIndex: number = 0;
  export let cartas: Cartas[] = [];
  export let virarCarta: (index: number) => void;

  // Pega apenas as 4 cartas do grupo, com proteção contra undefined
  $: cartasGrupo = Array.from({ length: 4 }, (_, i) => {
    return cartas[baseIndex + i] || null;
  }).filter(Boolean); // Remove cartas null/undefined
</script>

<div class="grid grid-cols-2 gap-1.5">
  {#each cartasGrupo as carta, i}
    <CardWindow
      {carta}
      on:click={() => virarCarta(baseIndex + i)}
    />
  {/each}
</div>
