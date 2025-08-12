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
 
</script>

<main class="w-full h-screen bg-[url('/vectors/1908.png')] md:bg-[url('/vectors/memo3.png')] md:bg-contain bg-cover bg-no-repeat bg-center">
  <div class="flex flex-col justify-center items-center py-44 lg:justify-start lg:pr-[500px] lg:py-80">
      <div class="flex flex-col gap-5 items-center justify-center my-5">
  <Botao text="Adventure" size="lg" className="bg-color3 hover:bg-color2 cursor-pointer" onClick={()=> goto("/adventure")} />
  <!-- <Botao text="Arcade" size="lg" className="bg-color3 hover:bg-color2 cursor-pointer" onClick={()=> goto("/arcade")} /> -->
  <Botao text="About" size="sm" className="bg-color3 hover:bg-color2 cursor-pointer" onClick={()=> goto("/about")} />
</div>

  </div>

</main>