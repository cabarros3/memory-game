export type StatusCarta = 'hidden' | 'visible' | 'matched';

export class Cartas {
	id: string;
	imagem: string;
	parId: string;
	status: StatusCarta;
	clicavel: boolean;
	index: number;

	constructor(
		id: string,
		imagem: string,
		parId: string,
		status: StatusCarta = 'hidden',
		clicavel: boolean = true,
		index: number = 0
	) {
		this.id = id;
		this.imagem = imagem;
		this.parId = parId;
		this.status = status;
		this.clicavel = clicavel;
		this.index = index;
	}
}

// ============= FUNÇÕES PARA CRIAÇÃO DE CARTAS =============

/**
 * ✅ VERSÃO CORRIGIDA: Cria pares de cartas baseado nas imagens fornecidas
 */
export function criarCartas(imagens: string[], numeroCartas: number): Cartas[] {
	console.log(`🏗️ Criando ${numeroCartas} cartas com ${imagens.length} imagens disponíveis`);

	const cartas: Cartas[] = [];
	const numeroPares = numeroCartas / 2;

	// Validação
	if (numeroCartas % 2 !== 0) {
		throw new Error(`❌ Número de cartas deve ser par. Recebido: ${numeroCartas}`);
	}

	if (imagens.length < numeroPares) {
		throw new Error(
			`❌ Não há imagens suficientes. Necessárias: ${numeroPares}, Disponíveis: ${imagens.length}`
		);
	}

	// Criar pares de cartas
	for (let i = 0; i < numeroPares; i++) {
		const imagem = imagens[i % imagens.length];
		const parId = `par-${i}`;

		console.log(`🎴 Criando par ${i}: ${imagem} (${parId})`);

		// Primeira carta do par
		const carta1 = new Cartas(
			`carta-${i}-a`,
			imagem,
			parId,
			'hidden',
			true,
			0 // Índice será atualizado depois do embaralhamento
		);

		// Segunda carta do par
		const carta2 = new Cartas(
			`carta-${i}-b`,
			imagem,
			parId,
			'hidden',
			true,
			0 // Índice será atualizado depois do embaralhamento
		);

		cartas.push(carta1, carta2);

		console.log(`  ✅ Criadas: ${carta1.id} e ${carta2.id}`);
	}

	console.log(`📦 Total de cartas criadas: ${cartas.length}`);

	// Embaralhar as cartas
	const cartasEmbaralhadas = embaralharCartas(cartas);

	// ✅ CORREÇÃO: Atualizar índices APÓS embaralhamento
	cartasEmbaralhadas.forEach((carta, index) => {
		atualizarIndiceCarta(carta, index);
	});

	// Validar pares após criação
	validarPares(cartasEmbaralhadas);

	return cartasEmbaralhadas;
}

/**
 * ✅ FUNÇÃO DE VALIDAÇÃO: Verifica se todos os pares estão corretos
 */
function validarPares(cartas: Cartas[]): void {
	console.log('\n🔍 === VALIDANDO PARES ===');

	const gruposPorParId = cartas.reduce(
		(acc, carta) => {
			if (!acc[carta.parId]) {
				acc[carta.parId] = [];
			}
			acc[carta.parId].push(carta);
			return acc;
		},
		{} as Record<string, Cartas[]>
	);

	let temProblema = false;

	Object.entries(gruposPorParId).forEach(([parId, cartasDoGrupo]) => {
		const quantidadeCorreta = cartasDoGrupo.length === 2;
		const mesmaImagem = new Set(cartasDoGrupo.map((c) => c.imagem)).size === 1;

		if (!quantidadeCorreta) {
			console.error(`❌ ${parId}: ${cartasDoGrupo.length} cartas (deveria ter 2)`);
			temProblema = true;
		}

		if (!mesmaImagem) {
			console.error(`❌ ${parId}: imagens diferentes no mesmo par`);
			cartasDoGrupo.forEach((c) => console.error(`  - ${c.id}: ${c.imagem}`));
			temProblema = true;
		}

		if (quantidadeCorreta && mesmaImagem) {
			console.log(`✅ ${parId}: 2 cartas, mesma imagem (${cartasDoGrupo[0].imagem})`);
		}
	});

	if (temProblema) {
		throw new Error('❌ Erro na criação dos pares! Verifique os logs acima.');
	}

	console.log('✅ Todos os pares estão corretos!');
	console.log('=== FIM VALIDAÇÃO ===\n');
}

/**
 * Embaralha um array de cartas usando algoritmo Fisher-Yates
 */
export function embaralharCartas(cartas: Cartas[]): Cartas[] {
	console.log('🎲 Embaralhando cartas...');
	const cartasEmbaralhadas: Cartas[] = [...cartas];

	for (let i = cartasEmbaralhadas.length - 1; i > 0; i--) {
		const j: number = Math.floor(Math.random() * (i + 1));
		[cartasEmbaralhadas[i], cartasEmbaralhadas[j]] = [cartasEmbaralhadas[j], cartasEmbaralhadas[i]];
	}

	console.log('✅ Cartas embaralhadas com sucesso!');
	return cartasEmbaralhadas;
}

// ============= FUNÇÕES PARA CARTAS =============

/**
 * Atualiza o índice de uma carta
 */
export function atualizarIndiceCarta(carta: Cartas, novoIndex: number): void {
	carta.index = novoIndex;
}

/**
 * Altera o status de uma carta
 */
export function alterarStatusCarta(carta: Cartas, novoStatus: StatusCarta): void {
	console.log(`🔄 Carta ${carta.id}: ${carta.status} → ${novoStatus}`);
	carta.status = novoStatus;
}

/**
 * Define se uma carta é clicável
 */
export function definirClicavelCarta(carta: Cartas, clicavel: boolean): void {
	carta.clicavel = clicavel;
}

/**
 * ✅ CORRIGIDO: Verifica se duas cartas formam um par (usando parId)
 */
export function cartasFormamPar(carta1: Cartas, carta2: Cartas): boolean {
	const formamPar = carta1.parId === carta2.parId;
	console.log(
		`🧩 Verificando par: ${carta1.id} (${carta1.parId}) + ${carta2.id} (${carta2.parId}) = ${formamPar ? '✅ PAR!' : '❌ Não é par'}`
	);
	return formamPar;
}
