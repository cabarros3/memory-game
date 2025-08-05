<!-- <script lang="ts">
  import WindowGroup from './WindowGroup.svelte';
  import Door from './Door.svelte';

  type Carta = {
  id: number;
  aberta: boolean;
};

  export let cartas: Carta[] = [];
  export let virarCarta: (index: number) => void;
</script>

<div class="relative mt-38 max-w-6xl rounded-lg bg-white px-6 py-6 shadow-lg">
  <div class="grid grid-cols-[auto_80px_auto_80px_auto_80px] gap-x-4 items-start">
    <WindowGroup baseIndex={0} cartas={cartas} virarCarta={virarCarta} />
    <Door />
    <WindowGroup baseIndex={4} cartas={cartas} virarCarta={virarCarta} />
    <Door />
    <WindowGroup baseIndex={8} cartas={cartas} virarCarta={virarCarta} />
    <Door />
  </div>


  <div class="absolute bottom-[-24px] left-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
  <div class="absolute bottom-[-24px] right-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
</div> -->



<!-- <script lang="ts">
  import WindowGroup from './WindowGroup.svelte';
  import Door from './Door.svelte';
  import type { Cartas as CartaClasse } from '$lib/classes/Cartas';

  // Tipo para o que WindowGroup espera (id numérico + aberta boolean)
  type Carta = {
    id: number;
    aberta: boolean;
  };

  // Função que converte sua classe Carta em tipo simplificado visual
  function mapCarta(carta: CartaClasse): Carta {
    return {
      id: Number(carta.id), // converte string para number, se id for string
      aberta: carta.status === 'visible' || carta.status === 'matched',
    };
  }

  // Props: recebe cartas da classe original e função virarCarta
  export let cartasClasse: CartaClasse[] = [];
  export let virarCarta: (index: number) => void;

  // Reactive statement para criar cartas no formato esperado pelo layout
  $: cartas = cartasClasse.map(mapCarta);
</script>

<div class="relative mt-38 max-w-6xl rounded-lg bg-white px-6 py-6 shadow-lg">
  <div class="grid grid-cols-[auto_80px_auto_80px_auto_80px] gap-x-4 items-start">
    <WindowGroup baseIndex={0} cartas={cartas} virarCarta={virarCarta} />
    <Door />
    <WindowGroup baseIndex={4} cartas={cartas} virarCarta={virarCarta} />
    <Door />
    <WindowGroup baseIndex={8} cartas={cartas} virarCarta={virarCarta} />
    <Door />
  </div>

  <div class="absolute bottom-[-24px] left-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
  <div class="absolute bottom-[-24px] right-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
</div> -->


<script lang="ts">
  import WindowGroup from './WindowGroup.svelte';
  import Door from './Door.svelte';
  import type { Cartas as CartaClasse } from '$lib/classes/Cartas';

  // Tipo que WindowGroup entende
  type Carta = {
    id: number;
    aberta: boolean;
  };

  // Props: cartas no formato da classe original e função para virar carta
  export let cartasClasse: CartaClasse[] = [];
  export let virarCarta: (index: number) => void;

  // Converte carta da classe para formato visual simplificado
  function mapCarta(carta: CartaClasse, index: number): Carta {
    return {
      id: index,
      aberta: carta.status === 'visible' || carta.status === 'matched',
    };
  }

  // Cria array de cartas visuais reativo
  $: cartas = cartasClasse.map(mapCarta);
</script>

<!-- Debug Info -->
<div class="relative mt-38 max-w-6xl rounded-lg bg-white px-6 py-6 shadow-lg">
  <div class="grid grid-cols-[auto_80px_auto_80px_auto_80px] gap-x-4 items-start">
    {#if cartas && cartas.length >= 12}
      <WindowGroup baseIndex={0} cartas={cartas} {virarCarta} />
      <Door />
      <WindowGroup baseIndex={4} cartas={cartas} {virarCarta} />
      <Door />
      <WindowGroup baseIndex={8} cartas={cartas} {virarCarta} />
      <Door />
    {:else}
      <div class="col-span-6 p-4 text-center">
        <p>Carregando jogo...</p>
        <p class="text-sm text-gray-500">Cartas: {cartas?.length || 0}/12</p>
      </div>
    {/if}
  </div>

  <div class="absolute bottom-[-24px] left-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
  <div class="absolute bottom-[-24px] right-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
</div>