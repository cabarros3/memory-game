<!-- <script lang="ts">
  export let carta;
  export let onClick: () => void;
</script>

<div
  class="janela cursor-pointer"
  role="button"
  tabindex="0"
  on:click={onClick}
  on:keydown={(e) => e.key === 'Enter' && onClick()}
>
  <img src="/carta.png" alt="Imagem" class="imagem" />
  <div class="vidro {carta.aberta ? 'aberto' : ''}"></div>
</div> -->

<!-- <script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type Carta = {
    id: number;
    aberta: boolean;
  };

  export let carta: Carta;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }

  // Proteção contra carta undefined
  $: cartaSegura = carta || { id: 0, aberta: false };
  $: isAberta = cartaSegura.aberta || false;
</script>

<div 
  class="relative h-20 w-20 cursor-pointer rounded-lg border-2 border-gray-300 bg-blue-100 transition-all hover:bg-blue-200"
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  {#if isAberta}
    <div class="flex h-full w-full items-center justify-center rounded-lg bg-green-100">
      <span class="text-2xl">🚌</span>
    </div>
  {:else}
    <div class="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
      <span class="text-xl text-gray-400">?</span>
       <div class="vidro"></div>
    </div>
  {/if}
</div> -->


<!-- <script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type Carta = {
    id: number;
    aberta: boolean;
  };

  export let carta: Carta;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }

  // Proteção contra carta undefined
  $: cartaSegura = carta || { id: 0, aberta: false };
  $: isAberta = cartaSegura.aberta || false;
</script>

<div 
  class="relative h-20 w-20 cursor-pointer rounded-lg border-2 border-gray-300 bg-blue-100 transition-all hover:bg-blue-200 overflow-hidden"
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabindex="0"
>
  <img src="/carta.png" alt="Imagem da carta" class="w-full h-full object-cover" />
  
  <!-- Camada do vidro com transição lateral -->
  <!-- <div class="vidro {isAberta ? 'aberto' : ''} absolute inset-0 transition-transform duration-500"></div>
</div>  -->


<script lang="ts">
  import type { Cartas } from '$lib/classes/Cartas';

  export let carta: Cartas;
  export let onClick: () => void;

  // O estado aberto depende do status da carta
  $: isAberta = carta.status === 'visible' || carta.status === 'matched';
</script>

<div
  class="relative h-20 w-20 cursor-pointer rounded-lg border-2 border-gray-300 bg-blue-100 transition-all hover:bg-blue-200 overflow-hidden"
  on:click={onClick}
  on:keydown={(e) => e.key === 'Enter' && onClick()}
  role="button"
  tabindex="0"
>
  <img src={carta.imagem} alt="Imagem da carta" class="w-full h-full object-cover" />

  <div
    class="vidro absolute inset-0 transition-transform duration-500"
    class:aberto={isAberta}
  ></div>
</div>
