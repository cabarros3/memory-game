<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
	import Botao from '../lib/components/botao.svelte';

  let animate = false;

  onMount(() => {
    animate = true;
    setTimeout(() => (animate = false), 5000); // duração de 1s
  });
 

  function jogar() {
    goto('/play');
  }
  
  function sobre(){
    goto('/about')
  }
</script>

<main class="w-full h-screen bg-[url('/vectors/1908.png')] md:bg-[url('/vectors/memo3.png')] md:bg-contain bg-cover bg-no-repeat bg-center">

  <!-- <div>
      <div class="flex flex-row gap-2 items-center">
        <img src="/logo.png" alt="Logo do jogo" width="50px" height="auto" class:spin-once={animate}>
        <h1 class="text-3xl font-bold">Memory Game</h1>
      </div>
  </div> -->
  <div class="flex flex-col justify-center items-center py-44 lg:justify-start lg:pr-[500px] lg:py-60">
      <div class="flex flex-col gap-5 items-center justify-center my-5">
  <Botao text="Play" size="lg" onClick={jogar} />
  <Botao text="About" size="sm" onClick={sobre} />
</div>

  </div>

</main>