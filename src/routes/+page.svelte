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

<main class="flex flex-col justify-center items-center my-24">

  <div>
      <div class="flex flex-row gap-2 items-center">
        <img src="/logo.png" alt="Logo do jogo" width="50px" height="auto" class:spin-once={animate}>
        <h1 class="text-3xl courier-prime-bold">Memory Game</h1>
      </div>
  </div>

<div class="flex flex-col gap-5 items-center justify-center my-5">
  <Botao text="Play" onClick={jogar} />
  <Botao text="About" onClick={sobre} />
</div>
</main>