<!-- <script lang="ts">
  import CardWindow from './CardWindow.svelte';

  export let baseIndex: number;
  export let cartas = [];
  export let virarCarta: (index: number) => void;
</script>

<div class="grid grid-cols-2 grid-rows-2 gap-1">
  {#each [0, 1, 2, 3] as _, i}
    <CardWindow
      carta={cartas[baseIndex + i]}
      onClick={() => virarCarta(baseIndex + i)}
    />
  {/each}
</div> -->


<!-- <script lang="ts">
  import CardWindow from './CardWindow.svelte';

  type Carta = {
    id: number;
    aberta: boolean;
  };

  export let baseIndex: number = 0;
  export let cartas: Carta[] = [];
  export let virarCarta: (index: number) => void;

  // Pega apenas as 4 cartas do grupo, com proteção contra undefined
  $: cartasGrupo = Array.from({ length: 4 }, (_, i) => {
    const carta = cartas[baseIndex + i];
    return carta || { id: baseIndex + i, aberta: false };
  });
</script>

<div class="grid grid-cols-2 gap-2">
  {#each cartasGrupo as carta, i}
    <CardWindow
      {carta}
      on:click={() => virarCarta(baseIndex + i)}
    />
  {/each}
</div> -->


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

<div class="grid grid-cols-2 gap-2">
  {#each cartasGrupo as carta, i}
    <CardWindow
      {carta}
      on:click={() => virarCarta(baseIndex + i)}
    />
  {/each}
</div>
