<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Botao from '../lib/components/botao.svelte';

  let animate = false;

  // onMount(() => {
  //   animate = true;
  //   setTimeout(() => (animate = false), 5000);
  // });
</script>

<main class="w-full min-h-screen bg-[url('/images/MemoBg2.png')] md:bg-[url('/images/MemoBg2.png')] bg-cover md:bg-contain bg-no-repeat bg-center">
  <!-- Container principal -->
  <div class="min-h-screen flex flex-col justify-center items-center relative">
    
    <!-- Em mobile: botões centralizados normalmente -->
    <!-- Em desktop: botões posicionados sobre a tela do Game Boy -->
    <div class="flex flex-col gap-4 md:gap-3 items-center 
                md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-4
                lg:-translate-y-12 xl:-translate-y-16">
      
      <Botao 
        text="Play" 
        size="lg" 
        className="bg-color1 hover:bg-color2 cursor-pointer w-32 md:w-36 lg:w-40" 
        onClick={() => goto("/adventure")} 
      />
      <Botao 
        text="Ranking" 
        size="sm" 
        className="bg-color3 hover:bg-color2 cursor-pointer w-32 md:w-24 lg:w-30" 
        onClick={() => goto("/ranking")} 
      />
      <Botao 
        text="About" 
        size="sm" 
        className="bg-color3 hover:bg-color2 cursor-pointer w-32 md:w-36 lg:w-24" 
        onClick={() => goto("/about")} 
      />
    </div>
  </div>
</main>