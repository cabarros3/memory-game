<script>
  import { MoveLeft } from 'lucide-svelte';
	import ArcadeDialog from './components/ArcadeDialog.svelte';
  import ArcadeStop from './components/ArcadeStop.svelte';
	import { goto } from '$app/navigation';
  
</script>

<div class="relative w-full h-screen overflow-hidden">
  <!-- camada do fundo -->
  <div class="absolute inset-0 bg-[url('/vectors/grass.png')] bg-contain bg-repeat opacity-40 z-0"></div>

  <div class="flex items-center mt-10 relative z-10">
    <div class="mx-5 my-5 ">
      <button on:click={()=> goto("/")} class="cursor-pointer">
        <MoveLeft class="h-10 w-10 text-color4" />
      </button>
    </div>
    <ArcadeDialog></ArcadeDialog>
    <ArcadeStop></ArcadeStop>

  </div>
</div>