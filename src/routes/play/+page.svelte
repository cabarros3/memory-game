<script lang="ts">
  type Carta = {
    id: number;
    aberta: boolean;
  };

  let cartas: Carta[] = [];

  for (let i = 0; i < 12; i++) {
    cartas.push({ id: i, aberta: false });
  }

  function virarCarta(i: number): void {
    cartas[i].aberta = !cartas[i].aberta;
  }
</script>

<div class="flex flex-col items-center bg-gray-800 min-h-screen">

  <!-- Barra topo: largura cheia até max 6xl -->
  <div class="flex w-full max-w-6xl justify-between bg-yellow-400 px-6 py-3 font-bold text-black">
    <span>TEMPO</span>
    <span>NÍVEL</span>
    <span>PONTUAÇÃO</span>
  </div>

  <!-- Ônibus: largura limitada e padding menor para ficar compacto -->
  <div class="relative mt-10 rounded-lg bg-white pt-5 px-6 pb-12 shadow-lg max-w-6xl">

    <!-- Grid horizontal com grupos e portas -->
    <div class="grid grid-cols-[auto_80px_auto_80px_auto_80px] items-start gap-x-4">

      <!-- Grupo 1 -->
      <div class="grid grid-cols-2 grid-rows-2">
        {#each [0, 1, 2, 3] as _, i}
          <div
            class="janela cursor-pointer"
            role="button"
            tabindex="0"
            on:click={() => virarCarta(i)}
            on:keydown={(e) => e.key === 'Enter' && virarCarta(i)}
          >
            <img src="/carta.png" alt="Imagem" class="imagem" />
            <div class="vidro {cartas[i].aberta ? 'aberto' : ''}"></div>
          </div>
        {/each}
      </div>

      <!-- Porta 1 -->
      <div class="grid h-[200px] w-[80px] grid-rows-2 overflow-hidden rounded-sm shadow-inner">
        <div class="grid grid-cols-2 gap-[2px] bg-black/80 p-1">
          <div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
          <div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
        </div>
        <div class="h-full bg-black/80"></div>
      </div>

      <!-- Grupo 2 -->
      <div class="grid grid-cols-2 grid-rows-2">
        {#each [0, 1, 2, 3] as _, i}
          <div
            class="janela cursor-pointer"
            role="button"
            tabindex="0"
            on:click={() => virarCarta(4 + i)}
            on:keydown={(e) => e.key === 'Enter' && virarCarta(4 + i)}
          >
            <img src="/carta.png" alt="Imagem" class="imagem" />
            <div class="vidro {cartas[4 + i].aberta ? 'aberto' : ''}"></div>
          </div>
        {/each}
      </div>

      <!-- Porta 2 -->
      <div class="grid h-[200px] w-[80px] grid-rows-2 overflow-hidden rounded-sm shadow-inner">
        <div class="grid grid-cols-2 gap-[2px] bg-black/80 p-1">
          <div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
          <div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
        </div>
        <div class="h-full bg-black/80"></div>
      </div>

      <!-- Grupo 3 -->
      <div class="grid grid-cols-2 grid-rows-2">
        {#each [0, 1, 2, 3] as _, i}
          <div
            class="janela cursor-pointer"
            role="button"
            tabindex="0"
            on:click={() => virarCarta(8 + i)}
            on:keydown={(e) => e.key === 'Enter' && virarCarta(8 + i)}
          >
            <img src="/carta.png" alt="Imagem" class="imagem" />
            <div class="vidro {cartas[8 + i].aberta ? 'aberto' : ''}"></div>
          </div>
        {/each}
      </div>

      <!-- Porta 3 -->
      <div class="grid h-[200px] w-[80px] grid-rows-2 overflow-hidden rounded-sm shadow-inner">
        <div class="grid grid-cols-2 gap-[2px] bg-black/80 p-1">
          <div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
          <div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
        </div>
        <div class="h-full bg-black/80"></div>
      </div>

    </div>

    <!-- Rodas do ônibus -->
    <div class="absolute bottom-[-24px] left-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
    <div class="absolute right-28 bottom-[-24px] h-16 w-16 rounded-full bg-black shadow-md"></div>

  </div>
</div>
