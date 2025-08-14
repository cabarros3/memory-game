<script lang="ts">
  import WindowGroup from './WindowGroup.svelte';
  import Door from './Door.svelte';
  import type { Cartas } from '$lib/classes/Cartas';

  // Props: cartas no formato da classe original e função para virar carta
  export let cartasClasse: Cartas[] = [];
  export let virarCarta: (index: number) => void;

  // Usar diretamente as cartas da classe, sem conversão
  $: cartas = cartasClasse;
</script>

<!-- bg-[url('/images/img2.png')] bg-contain -->

<!-- Container do ônibus - Aumentado significativamente -->
<div class="relative mt-20 max-w-[1200px] rounded-2xl bg-white px-12 py-12 shadow-2xl">
  <!-- Grid principal com mais espaço -->
  <div class="grid grid-cols-[auto_120px_auto_120px_auto_120px] gap-x-8 items-start">
    {#if cartas && cartas.length >= 12}
      <!-- Grupos de janelas com espaçamento maior -->
      <div class="window-group-large">
        <WindowGroup baseIndex={0} {cartas} {virarCarta} />
      </div>
      
      <!-- Porta maior -->
      <div class="door-large flex justify-center">
        <Door />
      </div>
      
      <div class="window-group-large">
        <WindowGroup baseIndex={4} {cartas} {virarCarta} />
      </div>
      
      <div class="door-large flex justify-center">
        <Door />
      </div>
      
      <div class="window-group-large">
        <WindowGroup baseIndex={8} {cartas} {virarCarta} />
      </div>
      
      <!-- Porta adicional para equilibrar o design -->
      <div class="door-large flex justify-center">
        <Door />
      </div>
    {:else}
      <div class="col-span-6 p-8 text-center">
        <p class="text-xl">Carregando jogo...</p>
        <p class="text-lg text-gray-500 mt-2">Cartas: {cartas?.length || 0}/12</p>
      </div>
    {/if}
  </div>

  <!-- Para-choque dianteiro -->
  <div class="absolute bottom-4 left-0 h-3 w-32 rounded-r-lg bg-gray-400"></div>
  
  <!-- Para-choque traseiro -->
  <div class="absolute bottom-4 right-0 h-3 w-32 rounded-l-lg bg-gray-400"></div>

  <!-- Rodas maiores e mais detalhadas -->
  <div class="absolute bottom-[-32px] left-40 h-24 w-24 rounded-full bg-black shadow-xl border-4 border-gray-600">
    <!-- Roda interna -->
    <div class="absolute inset-2 rounded-full bg-gray-700"></div>
    <!-- Centro da roda -->
    <div class="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400"></div>
  </div>
  
  <div class="absolute bottom-[-32px] right-40 h-24 w-24 rounded-full bg-black shadow-xl border-4 border-gray-600">
    <!-- Roda interna -->
    <div class="absolute inset-2 rounded-full bg-gray-700"></div>
    <!-- Centro da roda -->
    <div class="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400"></div>
  </div>


</div>
