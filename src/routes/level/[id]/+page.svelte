<script>
    import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import GameBar from "$lib/components/GameBar.svelte";
    let tempo = "00:00"
    let nivel = 1
    let tentativas = 0

    // Atualiza o nível com base na rota
	onMount(() => {
		const { id } = get(page).params;
		nivel = parseInt(id) || 1; // fallback para 1 se não for número válido
	});
</script>

<main class="relative w-full h-screen overflow-hidden">
    <div class="absolute inset-0 bg-[url('/vectors/img4.png')] bg-contain bg-repeat z-0"></div>
    <div class="relative z-10">
        <GameBar {tempo} {nivel} {tentativas} />
    </div>
</main>