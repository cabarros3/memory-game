

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Cartas } from '$lib/classes/Cartas';

  const dispatch = createEventDispatcher();

  export let carta: Cartas;

  // O estado aberto depende do status da carta
  $: isAberta = carta.status === 'visible' || carta.status === 'matched';

  function handleClick() {
    dispatch('click');
  }
</script>

<div
  class="relative h-28 w-24 cursor-pointer rounded-lg border-2 border-gray-500 bg-blue-100 transition-all hover:bg-blue-200 overflow-hidden"
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  <!-- Imagem da carta (sempre visível por baixo) -->
  <img 
    src={carta.imagem} 
    alt="Imagem da carta" 
    class="w-full h-full object-cover" 
  />

  <!-- Vidro/tampa que cobre a carta quando fechada -->
  <div
    class="vidro absolute inset-0 bg-blue-300 transition-transform duration-500 {isAberta ? 'translate-y-full' : 'translate-y-0'}"
  ></div>
</div>

