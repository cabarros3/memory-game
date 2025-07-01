<!-- <script>
	const totalCartas = 12;
	let cartasAbertas = Array(totalCartas).fill(false);

	function virarCarta(i) {
		cartasAbertas[i] = !cartasAbertas[i];
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-800">

	<div class="flex w-full max-w-6xl justify-between bg-yellow-400 px-6 py-3 font-bold text-black">
		<span>TEMPO</span>
		<span>NÍVEL</span>
		<span>PONTUAÇÃO</span>
	</div>

	
	<div class="relative mt-4 rounded-lg bg-white pt-5 pr-10 pb-12 pl-10 shadow-lg">
		
		<div class="grid grid-cols-[auto_80px_auto_80px_auto_80px] items-start gap-x-4">
			
			<div class="grid grid-cols-2 grid-rows-2">
				{#each Array(4) as _, i}
					<div class="janela" on:click={toggle}>
						<img src="/carta.png" alt="Imagem" class="imagem" />
						<div class="vidro {aberto ? 'aberto' : ''}"></div>
					</div>
				{/each}
			</div>

			<div class="grid h-[200px] w-[80px] grid-rows-2 overflow-hidden rounded-sm shadow-inner">
				
				<div class="grid grid-cols-2 gap-[2px] bg-black/80 p-1">
					<div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
					<div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
				</div>

			
				<div class="h-full bg-black/80"></div>
			</div>

			
			<div class="grid grid-cols-2 grid-rows-2">
				{#each Array(4) as _, i}
					<div class="janela" on:click={toggle}>
						<img src="/carta.png" alt="Imagem" class="imagem" />
						<div class="vidro {aberto ? 'aberto' : ''}"></div>
					</div>
				{/each}
			</div>

			<div class="grid h-[200px] w-[80px] grid-rows-2 overflow-hidden rounded-sm shadow-inner">
				
				<div class="grid grid-cols-2 gap-[2px] bg-black/80 p-1">
					<div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
					<div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
				</div>

				
				<div class="h-full bg-black/80"></div>
			</div>


			<div class="grid grid-cols-2 grid-rows-2">
				{#each Array(4) as _, i}
					<div class="janela" on:click={toggle}>
						<img src="/carta.png" alt="Imagem" class="imagem" />
						<div class="vidro {aberto ? 'aberto' : ''}"></div>
					</div>
				{/each}
			</div>

			<div class="grid h-[200px] w-[80px] grid-rows-2 overflow-hidden rounded-sm shadow-inner">
			
				<div class="grid grid-cols-2 gap-[2px] bg-black/80 p-1">
					<div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
					<div class="h-20 rounded-sm bg-blue-100 shadow-inner"></div>
				</div>

				
				<div class="h-full bg-black/80"></div>
			</div>
		</div>

		<div class="absolute bottom-[-24px] left-28 h-16 w-16 rounded-full bg-black shadow-md"></div>
		<div class="absolute right-28 bottom-[-24px] h-16 w-16 rounded-full bg-black shadow-md"></div>
	</div>
</div> -->

<script lang="ts">
	const totalCartas = 12;
	let cartasAbertas: boolean[] = Array(totalCartas).fill(false);

	function virarCarta(i: number): void {
		cartasAbertas[i] = !cartasAbertas[i];
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-800">
	<!-- Topo -->
	<div class="flex w-full max-w-6xl justify-between bg-yellow-400 px-6 py-3 font-bold text-black">
		<span>TEMPO</span>
		<span>NÍVEL</span>
		<span>PONTUAÇÃO</span>
	</div>

	<!-- Corpo do ônibus -->
	<div class="relative mt-4 rounded-lg bg-white pt-5 pr-10 pb-12 pl-10 shadow-lg">
		<!-- Grid horizontal com grupos e portas -->
		<div class="grid grid-cols-[auto_80px_auto_80px_auto_80px] items-start gap-x-4">
			<!-- Grupo 1 -->
			<div class="grid grid-cols-2 grid-rows-2">
				{#each [0, 1, 2, 3] as carta, i}
					<div
						class="janela"
						role="button"
						tabindex="0"
						on:click={() => virarCarta(i)}
						on:keydown={(e) => e.key === 'Enter' && virarCarta(i)}
					>
						<img src="/carta.png" alt="Imagem" class="imagem" />
						<div class="vidro {cartasAbertas[i] ? 'aberto' : ''}"></div>
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
				{#each [0, 1, 2, 3] as carta, i}
					<div
						class="janela"
						role="button"
						tabindex="0"
						on:click={() => virarCarta(4 + i)}
						on:keydown={(e) => e.key === 'Enter' && virarCarta(i)}
					>
						<img src="/carta.png" alt="Imagem" class="imagem" />
						<div class="vidro {cartasAbertas[4 + i] ? 'aberto' : ''}"></div>
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
				{#each [0, 1, 2, 3] as carta, i}
					<div
						class="janela"
						role="button"
						tabindex="0"
						on:click={() => virarCarta(8 + i)}
						on:keydown={(e) => e.key === 'Enter' && virarCarta(i)}
					>
						<img src="/carta.png" alt="Imagem" class="imagem" />
						<div class="vidro {cartasAbertas[8 + i] ? 'aberto' : ''}"></div>
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
