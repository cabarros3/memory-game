<script lang="ts">
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

  <!-- Rodas -->
  <div class="absolute bottom-[-24px] left-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
  <div class="absolute bottom-[-24px] right-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
</div>
