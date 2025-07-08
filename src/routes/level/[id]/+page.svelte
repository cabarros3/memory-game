<script>
    import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import GameBar from "$lib/components/GameBar.svelte";
    import { goto } from '$app/navigation';

    
    let tempo = "00:00"
    let nivel = 1
    let tentativas = 0

    // Atualiza o nível com base na rota
	onMount(() => {
		const { id } = get(page).params;
		nivel = parseInt(id) || 1; // fallback para 1 se não for número válido
	});

    // ✅ CONTROLA O ESTADO DO MODAL E A ORIGEM DA ABERTURA
  let showIntroModal = true;
  let isFromHelpButton = false; // ← usado para decidir o comportamento do conteúdo

  function closeModal() {
    showIntroModal = false;
    isFromHelpButton = false; // ← reset ao fechar
  }

  // ✅ ESTA FUNÇÃO É CHAMADA QUANDO CLICA NO BOTÃO "Need help?" DO GameBar
  function openFromHelpButton() {
    showIntroModal = true;
    isFromHelpButton = true; // ← sinaliza que veio do botão
  }


    // Eventos do GameBar
  function handlePause() {
    console.log('Jogo pausado - implemente a lógica aqui');
    // Pode parar timers, mostrar modal de pausa, etc
  }

  function handleExit() {
    const pathname = get(page).url.pathname;

    if (pathname.includes('/adventure')) {
      goto('/');       // volta para a página inicial
    } else if (pathname.includes('/arcade')) {
      goto('/levels'); // ou outra página que tenha seus níveis
    }
  }
</script>

<main class="relative w-full h-screen overflow-hidden">
    <div class="absolute inset-0 bg-[url('/vectors/img4.png')] bg-contain bg-repeat z-0"></div>
    <div class="relative z-10">
        <GameBar
            {tempo}
            {nivel}
            {tentativas}
            on:reabrirModal={openFromHelpButton}
            on:pause={handlePause}
            on:exit={handleExit}
        />
    </div>
</main>