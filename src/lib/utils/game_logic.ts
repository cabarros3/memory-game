import {
	alterarStatusCarta,
	Cartas,
	cartasFormamPar,
	criarCartas,
	definirClicavelCarta
} from '../classes/Cartas.js';
// import type { StatusCarta } from '../classes/Cartas.js';
import {
	Tabuleiro,
	type ModoJogo,
	configurarTabuleiro,
	alterarStatusTabuleiro,
	obterCartaTabuleiro,
	podeJogar,
	obterTodasCartasTabuleiro,
	obterTemplatePorModo,
	obterConfiguracaoTemplate
} from '../classes/tabuleiro.js';
import {
	incrementarAcertosJogador,
	incrementarTentativasJogador,
	Jogador,
	resetarEstatisticasJogador
} from '../classes/jogador.js';

// ============= LÓGICA PRINCIPAL DO JOGO =============

/**
 * Inicializa o tabuleiro com cartas embaralhadas
 */
export function inicializarTabuleiro(tabuleiro: Tabuleiro, todasImagens: string[]): void {
	console.log('\n🚀 === INICIALIZANDO TABULEIRO ===');
	console.log(`Modo: ${tabuleiro.modo}`);
	console.log(`Imagens disponíveis: ${todasImagens.length}`);

	configurarTabuleiro(tabuleiro);

	console.log(`Template: ${tabuleiro.template}`);
	console.log(`Configuração:`, tabuleiro.configuracao);

	const numeroCartas = tabuleiro.configuracao.numeroCartas;
	const cartasEmbaralhadas: Cartas[] = criarCartas(todasImagens, numeroCartas);

	tabuleiro.cartas = cartasEmbaralhadas;
	tabuleiro.cartasViradas = [];
	alterarStatusTabuleiro(tabuleiro, 'jogando');

	console.log('✅ Tabuleiro inicializado com sucesso!');
	console.log('=== FIM INICIALIZAÇÃO ===\n');
}

/**
 * ✅ VERSÃO MELHORADA: Vira uma carta e processa a lógica do jogo
 */
export function virarCarta(tabuleiro: Tabuleiro, index: number, jogador: Jogador): boolean {
	console.log(`\n🎯 === VIRANDO CARTA ${index} ===`);

	const carta = obterCartaTabuleiro(tabuleiro, index);

	// Verificações de validade
	if (!carta) {
		console.error('❌ Carta não encontrada');
		return false;
	}

	if (!carta.clicavel) {
		console.log('⚠️ Carta não é clicável');
		return false;
	}

	if (carta.status !== 'hidden') {
		console.log(`⚠️ Carta já está ${carta.status}`);
		return false;
	}

	if (!podeJogar(tabuleiro)) {
		console.log(`⚠️ Jogo não está em estado jogável: ${tabuleiro.status}`);
		return false;
	}

	// Verificar se já há 2 cartas viradas
	if (tabuleiro.cartasViradas.length >= 2) {
		console.log('⚠️ Já há 2 cartas viradas, aguarde...');
		return false;
	}

	console.log(`📋 Virando carta: ${carta.id} (${carta.parId}) - ${carta.imagem}`);

	// Virar a carta
	alterarStatusCarta(carta, 'visible');
	tabuleiro.cartasViradas.push(carta);

	console.log(`📊 Cartas viradas: ${tabuleiro.cartasViradas.length}/2`);

	// Verificar se completou um par
	if (tabuleiro.cartasViradas.length === 2) {
		incrementarTentativasJogador(jogador);

		// Usar setTimeout para dar tempo da UI atualizar
		setTimeout(() => {
			verificarPar(tabuleiro, jogador);
		}, 100);
	}

	console.log('✅ Carta virada com sucesso!');
	console.log('=== FIM VIRAR CARTA ===\n');
	return true;
}

/**
 * Verifica se as duas cartas viradas formam um par
 */
export function verificarPar(tabuleiro: Tabuleiro, jogador: Jogador): void {
	console.log('\n🧩 === VERIFICANDO PAR ===');

	if (tabuleiro.cartasViradas.length !== 2) {
		console.error('❌ Número incorreto de cartas viradas:', tabuleiro.cartasViradas.length);
		return;
	}

	const [carta1, carta2]: [Cartas, Cartas] = tabuleiro.cartasViradas as [Cartas, Cartas];

	console.log(`Comparando: ${carta1.id} (${carta1.parId}) vs ${carta2.id} (${carta2.parId})`);

	if (cartasFormamPar(carta1, carta2)) {
		console.log('🎉 PAR ENCONTRADO!');

		// Par encontrado!
		marcarCartasComoPar(carta1, carta2);
		incrementarAcertosJogador(jogador);
		tabuleiro.cartasViradas = [];

		// Verificar condição de vitória
		if (verificarVitoria(tabuleiro)) {
			console.log('🏆 JOGO FINALIZADO - VITÓRIA!');
			alterarStatusTabuleiro(tabuleiro, 'finalizado');
		}
	} else {
		console.log('❌ Par incorreto - escondendo cartas em 1 segundo...');

		// Par incorreto - esconder cartas após delay
		setTimeout(() => {
			esconderCartas(carta1, carta2, tabuleiro);
		}, 1000);
	}

	console.log('=== FIM VERIFICAÇÃO PAR ===\n');
}

/**
 * Marca duas cartas como par encontrado
 */
function marcarCartasComoPar(carta1: Cartas, carta2: Cartas): void {
	console.log(`✅ Marcando como par: ${carta1.id} e ${carta2.id}`);
	alterarStatusCarta(carta1, 'matched');
	alterarStatusCarta(carta2, 'matched');
	definirClicavelCarta(carta1, false);
	definirClicavelCarta(carta2, false);
}

/**
 * Esconde duas cartas e limpa o array de cartas viradas
 */
function esconderCartas(carta1: Cartas, carta2: Cartas, tabuleiro: Tabuleiro): void {
	console.log(`🙈 Escondendo cartas: ${carta1.id} e ${carta2.id}`);
	alterarStatusCarta(carta1, 'hidden');
	alterarStatusCarta(carta2, 'hidden');
	tabuleiro.cartasViradas = [];
}

/**
 * Verifica se todas as cartas foram encontradas (condição de vitória)
 */
export function verificarVitoria(tabuleiro: Tabuleiro): boolean {
	const todasCartas: Cartas[] = obterTodasCartasTabuleiro(tabuleiro);
	const cartasEncontradas = todasCartas.filter((carta) => carta.status === 'matched').length;
	const totalCartas = todasCartas.length;

	console.log(`📊 Progresso: ${cartasEncontradas}/${totalCartas} cartas encontradas`);

	return todasCartas.every((carta: Cartas) => carta.status === 'matched');
}

/**
 * Cria uma nova instância de tabuleiro com configurações específicas
 */
export function criarTabuleiro(id: string, modo: ModoJogo, imagens: string[]): Tabuleiro {
	console.log(`\n🏗️ Criando tabuleiro: ${id} (${modo})`);

	// Validar antes de criar
	if (!validarConfiguracaoJogo(modo, imagens)) {
		throw new Error(`❌ Configuração inválida para modo ${modo} com ${imagens.length} imagens`);
	}

	const tabuleiro: Tabuleiro = new Tabuleiro(id, modo, 'aguardando');
	inicializarTabuleiro(tabuleiro, imagens);

	console.log('✅ Tabuleiro criado com sucesso!\n');
	return tabuleiro;
}

/**
 * Reseta o jogo para o estado inicial
 */
export function resetarJogo(tabuleiro: Tabuleiro, jogador: Jogador, imagens: string[]): void {
	console.log('\n🔄 === RESETANDO JOGO ===');

	// Reset do tabuleiro
	alterarStatusTabuleiro(tabuleiro, 'aguardando');
	inicializarTabuleiro(tabuleiro, imagens);

	// Reset do jogador
	resetarEstatisticasJogador(jogador);

	console.log('✅ Jogo resetado com sucesso!');
	console.log('=== FIM RESET ===\n');
}

/**
 * Valida se uma configuração de jogo é válida
 */
export function validarConfiguracaoJogo(modo: ModoJogo, imagens: string[]): boolean {
	const template = obterTemplatePorModo(modo);
	const configuracao = obterConfiguracaoTemplate(template);
	const numeroPares = configuracao.numeroPares;

	const valido = imagens.length >= numeroPares;

	if (!valido) {
		console.error(
			`❌ Configuração inválida: Modo ${modo} precisa de ${numeroPares} imagens, mas só há ${imagens.length} disponíveis`
		);
	}

	return valido;
}

/**
 * Obtém dica para o jogador (mostra brevemente um par válido)
 */
export function obterDica(tabuleiro: Tabuleiro): [Cartas, Cartas] | null {
	const cartasOcultas: Cartas[] = obterTodasCartasTabuleiro(tabuleiro).filter(
		(carta: Cartas) => carta.status === 'hidden'
	);

	// Procurar por um par disponível
	for (let i = 0; i < cartasOcultas.length; i++) {
		for (let j = i + 1; j < cartasOcultas.length; j++) {
			if (cartasFormamPar(cartasOcultas[i], cartasOcultas[j])) {
				return [cartasOcultas[i], cartasOcultas[j]];
			}
		}
	}

	return null;
}
