<script lang="ts">
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
</div>
