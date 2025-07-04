<script lang="ts">
	import { onMount } from 'svelte';
	import Botao from '$lib/components/botao.svelte';

	// para cartas do jogo

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

	// verifica se o telefone está na horizontal

	let isLandscapeMobile = false;

	function isMobileDevice() {
		return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
	}

	function checkOrientation() {
		const isLandscape = window.innerWidth > window.innerHeight;

		// Só bloqueia se for mobile e estiver em retrato
		isLandscapeMobile = !isMobileDevice() || isLandscape;
	}

	onMount(() => {
		checkOrientation();
		window.addEventListener('resize', checkOrientation);
	});
</script>

<main>
	{#if isLandscapeMobile}
		<div
			class="flex min-h-screen flex-col items-center bg-[url('/vectors/img4.png')] bg-cover bg-center bg-no-repeat"
		>
			<!-- Barra topo: responsiva baseada no tamanho da tela -->
			<div class="flex w-full {window.innerWidth <= 768 ? 'max-w-4xl gap-12 px-4 py-4' : 'max-w-6xl gap-20 px-6 py-6'} justify-center font-bold text-black">
				<Botao text="00:00" size="sm" />
				<Botao text="Lvl 1" size="sm" />
				<Botao text="0" size="sm" />
			</div>

			<!-- Ônibus: ajustado baseado no tamanho da tela -->
			<div class="relative {window.innerWidth <= 768 ? 'mt-5 max-w-4xl px-4 pb-8 pt-3' : 'mt-36 max-w-6xl px-6 pb-12 pt-5'} rounded-lg bg-white shadow-lg">
				<!-- Grid horizontal com grupos e portas -->
				<div class="grid {window.innerWidth <= 768 ? 'grid-cols-[auto_60px_auto_60px_auto_60px] gap-x-3' : 'grid-cols-[auto_80px_auto_80px_auto_80px] gap-x-4'} items-start">
					<!-- Grupo 1 -->
					<div class="grid grid-cols-2 grid-rows-2 {window.innerWidth <= 768 ? 'gap-1' : ''}">
						{#each [0, 1, 2, 3] as _, i}
							<div
								class="{window.innerWidth <= 768 ? 'janela-mobile' : 'janela'} cursor-pointer"
								role="button"
								tabindex="0"
								on:click={() => virarCarta(i)}
								on:keydown={(e) => e.key === 'Enter' && virarCarta(i)}
							>
								<img src="/carta.png" alt="Imagem" class="{window.innerWidth <= 768 ? 'imagem-mobile' : 'imagem'}" />
								<div class="{window.innerWidth <= 768 ? 'vidro-mobile' : 'vidro'} {cartas[i].aberta ? 'aberto' : ''}"></div>
							</div>
						{/each}
					</div>

					<!-- Porta 1 -->
					<div class="grid {window.innerWidth <= 768 ? 'h-[150px] w-[60px]' : 'h-[200px] w-[80px]'} grid-rows-2 overflow-hidden rounded-sm shadow-inner">
						<div class="grid grid-cols-2 {window.innerWidth <= 768 ? 'gap-[1px]' : 'gap-[2px]'} bg-black/80 p-1">
							<div class="{window.innerWidth <= 768 ? 'h-14' : 'h-20'} rounded-sm bg-blue-100 shadow-inner"></div>
							<div class="{window.innerWidth <= 768 ? 'h-14' : 'h-20'} rounded-sm bg-blue-100 shadow-inner"></div>
						</div>
						<div class="h-full bg-black/80"></div>
					</div>

					<!-- Grupo 2 -->
					<div class="grid grid-cols-2 grid-rows-2 {window.innerWidth <= 768 ? 'gap-1' : ''}">
						{#each [0, 1, 2, 3] as _, i}
							<div
								class="{window.innerWidth <= 768 ? 'janela-mobile' : 'janela'} cursor-pointer"
								role="button"
								tabindex="0"
								on:click={() => virarCarta(4 + i)}
								on:keydown={(e) => e.key === 'Enter' && virarCarta(4 + i)}
							>
								<img src="/carta.png" alt="Imagem" class="{window.innerWidth <= 768 ? 'imagem-mobile' : 'imagem'}" />
								<div class="{window.innerWidth <= 768 ? 'vidro-mobile' : 'vidro'} {cartas[4 + i].aberta ? 'aberto' : ''}"></div>
							</div>
						{/each}
					</div>

					<!-- Porta 2 -->
					<div class="grid {window.innerWidth <= 768 ? 'h-[150px] w-[60px]' : 'h-[200px] w-[80px]'} grid-rows-2 overflow-hidden rounded-sm shadow-inner">
						<div class="grid grid-cols-2 {window.innerWidth <= 768 ? 'gap-[1px]' : 'gap-[2px]'} bg-black/80 p-1">
							<div class="{window.innerWidth <= 768 ? 'h-14' : 'h-20'} rounded-sm bg-blue-100 shadow-inner"></div>
							<div class="{window.innerWidth <= 768 ? 'h-14' : 'h-20'} rounded-sm bg-blue-100 shadow-inner"></div>
						</div>
						<div class="h-full bg-black/80"></div>
					</div>

					<!-- Grupo 3 -->
					<div class="grid grid-cols-2 grid-rows-2 {window.innerWidth <= 768 ? 'gap-1' : ''}">
						{#each [0, 1, 2, 3] as _, i}
							<div
								class="{window.innerWidth <= 768 ? 'janela-mobile' : 'janela'} cursor-pointer"
								role="button"
								tabindex="0"
								on:click={() => virarCarta(8 + i)}
								on:keydown={(e) => e.key === 'Enter' && virarCarta(8 + i)}
							>
								<img src="/carta.png" alt="Imagem" class="{window.innerWidth <= 768 ? 'imagem-mobile' : 'imagem'}" />
								<div class="{window.innerWidth <= 768 ? 'vidro-mobile' : 'vidro'} {cartas[8 + i].aberta ? 'aberto' : ''}"></div>
							</div>
						{/each}
					</div>

					<!-- Porta 3 -->
					<div class="grid {window.innerWidth <= 768 ? 'h-[150px] w-[60px]' : 'h-[200px] w-[80px]'} grid-rows-2 overflow-hidden rounded-sm shadow-inner">
						<div class="grid grid-cols-2 {window.innerWidth <= 768 ? 'gap-[1px]' : 'gap-[2px]'} bg-black/80 p-1">
							<div class="{window.innerWidth <= 768 ? 'h-14' : 'h-20'} rounded-sm bg-blue-100 shadow-inner"></div>
							<div class="{window.innerWidth <= 768 ? 'h-14' : 'h-20'} rounded-sm bg-blue-100 shadow-inner"></div>
						</div>
						<div class="h-full bg-black/80"></div>
					</div>
				</div>

				<!-- Rodas do ônibus - responsivas -->
				<div
					class="absolute {window.innerWidth <= 768 ? 'bottom-[-18px] left-20 h-12 w-12' : 'bottom-[-24px] left-28 h-16 w-16'} rounded-full bg-black shadow-md"
				></div>
				<div
					class="absolute {window.innerWidth <= 768 ? 'bottom-[-18px] right-20 h-12 w-12' : 'bottom-[-24px] right-28 h-16 w-16'} rounded-full bg-black shadow-md"
				></div>
			</div>
		</div>
	{:else}
		<div class="flex h-screen items-center justify-center px-4 text-center">
			<p class="max-w-md rounded bg-white p-6 text-lg font-semibold text-black shadow-md">
				Este jogo só pode ser acessado em dispositivos móveis em modo paisagem.
				<br />
				Por favor, gire seu dispositivo.
			</p>
		</div>
	{/if}
</main>


