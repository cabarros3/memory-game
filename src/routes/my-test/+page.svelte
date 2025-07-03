<script lang="ts">
	// declara o tipo de dados aceitos dentro do array cartas (um número, uma string, e boolean para a situação virada)
	// é preciso entender o conceito de objetos
	type CartasType = {
		id: number;
		valor: string;
		virada: boolean; //true se pra cima, false se pra baixo
		encontrada: boolean; //indica se um par foi achado
	};

	let cartas: CartasType[] = []; // salva o id e o valor das cartas
	let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // diz que as cartas terão esses valores
	let valores: string[] = []; // Guarda os pares das cartas (letras duplicadas)

	let primeiraVirada: CartasType | null = null;
	let segundaVirada: CartasType | null = null;
	let bloqueado = false; // impede clique enquanto comparamos

	// For para guardar as letras as letras duplicadas
	// a cada iteração guarda um par de letras
	for (let i: number = 0; i < 8; i++) {
		valores.push(letras[i]);
		valores.push(letras[i]);
	}

	// Segunda troca pulando de 3 em 3
	for (let i = 0; i < valores.length - 3; i += 3) {
		const temp = valores[i];
		valores[i] = valores[i + 3];
		valores[i + 3] = temp;
	}

	// para carregar as cartas com os valores
	for (let i = 0; i < valores.length; i++) {
		cartas.push({
			id: i,
			valor: valores[i],
			virada: false, // todas começam viradas para baixo por isso false
			encontrada: false // todas começam sem seus pares, logo não há encontrada
		});
	}

	// agora vamos precisar criar uma função para virar as cartas
	// ela recebe a identificação (id) da carta, muda o "virada" de false para true
	function virarCarta(id: number) {
  if (bloqueado) return;

  for (let i = 0; i < cartas.length; i++) {
    if (cartas[i].id === id && !cartas[i].virada && !cartas[i].encontrada) {
      cartas[i].virada = true;

      if (!primeiraVirada) {
        primeiraVirada = cartas[i];
      } else if (!segundaVirada) {
        segundaVirada = cartas[i];
        bloqueado = true; // bloqueia cliques durante a comparação

        if (primeiraVirada.valor === segundaVirada.valor) {
          primeiraVirada.encontrada = true;
          segundaVirada.encontrada = true;

          // Verifica se todas as cartas foram encontradas
          const todasEncontradas = cartas.every(carta => carta.encontrada);
          if (todasEncontradas) {
            setTimeout(() => {
              resetarJogo();
            }, 1000); // espera 1 segundo antes de resetar
          }

          // limpa tudo e desbloqueia
          primeiraVirada = null;
          segundaVirada = null;
          bloqueado = false;
        } else {
          // espera 1 segundo antes de desvirar
          setTimeout(() => {
            if (primeiraVirada) primeiraVirada.virada = false;
            if (segundaVirada) segundaVirada.virada = false;

            primeiraVirada = null;
            segundaVirada = null;
            bloqueado = false;
          }, 1000);
        }
      }

      break;
    }
  }
}


  function resetarJogo() {
  // Reseta cartas: vira tudo pra baixo e limpa encontrada
  for (let i = 0; i < cartas.length; i++) {
    cartas[i].virada = false;
    cartas[i].encontrada = false;
  }

  // Reembaralha os valores no array valores
  for (let i = 0; i < valores.length - 1; i += 2) {
    const temp = valores[i];
    valores[i] = valores[i + 1];
    valores[i + 1] = temp;
  }
  for (let i = 0; i < valores.length - 3; i += 3) {
    const temp = valores[i];
    valores[i] = valores[i + 3];
    valores[i + 3] = temp;
  }

  // Atualiza os valores das cartas com os valores embaralhados
  for (let i = 0; i < cartas.length; i++) {
    cartas[i].valor = valores[i];
  }

  primeiraVirada = null;
  segundaVirada = null;
  bloqueado = false;
}

</script>

<main class="mx-10 my-10 flex flex-row items-center gap-20">
	<!-- <h1 class="text-3xl">Jogo da Memória</h1> -->
	<div class="grade">
		{#each cartas as carta}
			<button
				class="cartas {carta.virada ? 'virada' : ''}"
				type="button"
				on:click={() => virarCarta(carta.id)}
			>
				{#if carta.virada}
					{carta.valor}
				{:else}
					❓
				{/if}
			</button>
		{/each}
	</div>
</main>