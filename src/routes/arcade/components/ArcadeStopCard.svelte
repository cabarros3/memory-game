<script lang="ts">
  import { Star, Play } from 'lucide-svelte';

  export let src: string = "/vectors/img1.jpg";
  export let alt: string = "Imagem do nível";
  export let titleCard: string = "Título do nível";
  // export let highlighted: boolean = false; 
  export let disabled: boolean = false;
  export let onPlay = () => {}; // botão de play
  export let onSelect = () => {}; // clique no card para mostrar detalhes

</script>

<div
  role="button"
  tabindex="0"
  on:click={() => !disabled && onSelect()}
  on:keydown={(e) => !disabled && (e.key === 'Enter' || e.key === ' ') && onSelect()}
  class:grayscale={disabled} class="w-36 h-36 bg-white rounded-2xl shadow-md flex flex-col items-center justify-between disabled:cursor-not-allowed">
  <!-- Container da imagem -->
  <div class="relative w-full h-20">
    <img
      src={src}
      alt={alt}
      class="w-full h-full object-cover rounded-t-2xl"
    />
    
    <!-- Botão de Play centralizado -->
    <button
      on:click|stopPropagation={() => !disabled && onPlay()}
      class="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-color3/60 rounded-t-2xl"
    >
      <Play fill="currentColor" class="w-10 h-10 text-white shadow-2xl" />
    </button>
  </div>

  <span class="text-sm font-semibold text-center text-gray-800 mt-1">
    {titleCard}
  </span>

<div class="flex gap-1 justify-center py-2 text-gray-400">
  {#each Array(3) as _, i}
    <Star class="w-4 h-4" />
  {/each}
</div>
</div>
