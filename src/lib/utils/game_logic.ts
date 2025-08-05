import { Cartas } from '../classes/Cartas.js';
import type { StatusCarta } from '../classes/Cartas.js';
import {
	Tabuleiro,
	type TemplateTabuleiro,
	type StatusTabuleiro,
	type ModoJogo,
	type ConfiguracaoTemplate
} from '../classes/tabuleiro.js';
import { Jogador } from '../classes/jogador.js';

// Configurações dos templates
const TEMPLATES_CONFIG: Record<TemplateTabuleiro, ConfiguracaoTemplate> = {
	quadrado: { numeroPares: 8, numeroCartas: 16, usaMatriz: true },
	onibus: { numeroPares: 6, numeroCartas: 12, usaMatriz: false }
};

// Mapeamento de modo para template
const MODO_PARA_TEMPLATE: Record<ModoJogo, TemplateTabuleiro> = {
	adventure: 'onibus',
	arcade: 'quadrado',
	timed: 'quadrado',
	challenge: 'quadrado'
};

// ============= FUNÇÕES PARA TABULEIRO =============

/**
 * Obtém o template baseado no modo de jogo
 * @param modo Modo de jogo selecionado
 * @returns Template correspondente ao modo
 */
export function obterTemplatePorModo(modo: ModoJogo): TemplateTabuleiro {
	return MODO_PARA_TEMPLATE[modo] || 'quadrado';
}

/**
 * Obtém a configuração de um template
 * @param template Tipo de template
 * @returns Configuração do template
 */
export function obterConfiguracaoTemplate(template: TemplateTabuleiro): ConfiguracaoTemplate {
	return TEMPLATES_CONFIG[template] || TEMPLATES_CONFIG.quadrado;
}

/**
 * Configura o tabuleiro com template e configuração baseado no modo
 * @param tabuleiro Instância do tabuleiro
 */
export function configurarTabuleiro(tabuleiro: Tabuleiro): void {
	tabuleiro.template = obterTemplatePorModo(tabuleiro.modo);
	tabuleiro.configuracao = obterConfiguracaoTemplate(tabuleiro.template);
}

/**
 * Obtém uma carta específica do tabuleiro por índice
 * @param tabuleiro Instância do tabuleiro
 * @param index Índice da carta no array linear
 * @returns Carta na posição especificada ou null se inválida
 */
export function obterCartaTabuleiro(tabuleiro: Tabuleiro, index: number): Cartas | null {
	if (index < 0 || index >= tabuleiro.cartas.length) {
		return null;
	}
	return tabuleiro.cartas[index];
}

/**
 * Obtém todas as cartas do tabuleiro
 * @param tabuleiro Instância do tabuleiro
 * @returns Array de todas as cartas do tabuleiro
 */
export function obterTodasCartasTabuleiro(tabuleiro: Tabuleiro): Cartas[] {
	return tabuleiro.cartas;
}

/**
 * Verifica se o jogo está em estado jogável
 * @param tabuleiro Instância do tabuleiro
 * @returns True se o jogo pode ser jogado
 */
export function podeJogar(tabuleiro: Tabuleiro): boolean {
	return tabuleiro.status === 'jogando';
}

/**
 * Altera o status do tabuleiro
 * @param tabuleiro Instância do tabuleiro
 * @param novoStatus Novo status a ser aplicado
 */
export function alterarStatusTabuleiro(tabuleiro: Tabuleiro, novoStatus: StatusTabuleiro): void {
	tabuleiro.status = novoStatus;
}

// ============= FUNÇÕES PARA CRIAÇÃO DE CARTAS =============

/**
 * Cria pares de cartas baseado nas imagens fornecidas
 * @param imagens Array de strings representando as imagens das cartas
 * @param numeroCartas Número total de cartas necessárias
 * @returns Array de objetos Cartas
 */
export function criarCartas(imagens: string[], numeroCartas: number): Cartas[] {
	const cartas: Cartas[] = [];
	const numeroPares = numeroCartas / 2;

	for (let i = 0; i < numeroPares; i++) {
		const imagem = imagens[i % imagens.length];
		const parId: string = `par-${i}`;

		cartas.push(new Cartas(`carta-${i}-a`, imagem, parId, 'hidden', true, cartas.length));

		cartas.push(new Cartas(`carta-${i}-b`, imagem, parId, 'hidden', true, cartas.length));
	}

	const cartasEmbaralhadas = embaralharCartas(cartas);

	// Atualizar índices após embaralhamento
	cartasEmbaralhadas.forEach((carta, index) => {
		atualizarIndiceCarta(carta, index);
	});

	return cartasEmbaralhadas;
}

/**
 * Embaralha um array de cartas usando algoritmo Fisher-Yates
 * @param cartas Array de cartas para embaralhar
 * @returns Array de cartas embaralhadas
 */
export function embaralharCartas(cartas: Cartas[]): Cartas[] {
	const cartasEmbaralhadas: Cartas[] = [...cartas];

	for (let i = cartasEmbaralhadas.length - 1; i > 0; i--) {
		const j: number = Math.floor(Math.random() * (i + 1));
		[cartasEmbaralhadas[i], cartasEmbaralhadas[j]] = [cartasEmbaralhadas[j], cartasEmbaralhadas[i]];
	}

	return cartasEmbaralhadas;
}

// ============= FUNÇÕES PARA CARTAS =============

/**
 * Atualiza o índice de uma carta
 * @param carta Carta a ser atualizada
 * @param novoIndex Novo índice da carta
 */
export function atualizarIndiceCarta(carta: Cartas, novoIndex: number): void {
	carta.index = novoIndex;
}

/**
 * Altera o status de uma carta
 * @param carta Carta a ser alterada
 * @param novoStatus Novo status da carta
 */
export function alterarStatusCarta(carta: Cartas, novoStatus: StatusCarta): void {
	carta.status = novoStatus;
}

/**
 * Define se uma carta é clicável
 * @param carta Carta a ser alterada
 * @param clicavel Se a carta deve ser clicável ou não
 */
export function definirClicavelCarta(carta: Cartas, clicavel: boolean): void {
	carta.clicavel = clicavel;
}

/**
 * Verifica se duas cartas formam um par
 * @param carta1 Primeira carta
 * @param carta2 Segunda carta
 * @returns True se as cartas formam um par
 */
export function cartasFormamPar(carta1: Cartas, carta2: Cartas): boolean {
	return carta1.parId === carta2.parId;
}

// ============= FUNÇÕES PARA JOGADOR =============

/**
 * Incrementa as tentativas do jogador
 * @param jogador Instância do jogador
 */
export function incrementarTentativasJogador(jogador: Jogador): void {
	jogador.tentativas++;
}

/**
 * Incrementa os acertos e pontuação do jogador
 * @param jogador Instância do jogador
 * @param pontos Pontos a serem adicionados (padrão: 10)
 */
export function incrementarAcertosJogador(jogador: Jogador, pontos: number = 10): void {
	jogador.acertos++;
	jogador.pontuacao += pontos;
}

/**
 * Reseta as estatísticas do jogador
 * @param jogador Instância do jogador
 */
export function resetarEstatisticasJogador(jogador: Jogador): void {
	jogador.pontuacao = 0;
	jogador.tentativas = 0;
	jogador.acertos = 0;
	jogador.tempoInicio = Date.now();
}

/**
 * Calcula estatísticas do jogador
 * @param jogador Instância do jogador
 * @returns Objeto com estatísticas calculadas
 */
export function calcularEstatisticasJogador(jogador: Jogador): {
	tempoDecorrido: number;
	precisao: number;
	pontuacaoPorTempo: number;
} {
	const tempoDecorrido: number = Math.floor((Date.now() - jogador.tempoInicio) / 1000);
	const precisao: number =
		jogador.tentativas > 0 ? (jogador.acertos / jogador.tentativas) * 100 : 0;
	const pontuacaoPorTempo: number = tempoDecorrido > 0 ? jogador.pontuacao / tempoDecorrido : 0;

	return {
		tempoDecorrido,
		precisao: Math.round(precisao),
		pontuacaoPorTempo: Math.round(pontuacaoPorTempo * 100) / 100
	};
}

// ============= LÓGICA PRINCIPAL DO JOGO =============

/**
 * Inicializa o tabuleiro com cartas embaralhadas
 * @param tabuleiro Instância do tabuleiro a ser inicializada
 * @param todasImagens Array completo de imagens disponíveis
 */
export function inicializarTabuleiro(tabuleiro: Tabuleiro, todasImagens: string[]): void {
	configurarTabuleiro(tabuleiro);
	const numeroCartas = tabuleiro.configuracao.numeroCartas;
	const cartasEmbaralhadas: Cartas[] = criarCartas(todasImagens, numeroCartas);

	tabuleiro.cartas = cartasEmbaralhadas;
	tabuleiro.cartasViradas = [];
	alterarStatusTabuleiro(tabuleiro, 'jogando');
}

/**
 * Vira uma carta e processa a lógica do jogo
 * @param tabuleiro Instância do tabuleiro
 * @param index Índice da carta a ser virada
 * @param jogador Instância do jogador
 * @returns True se a carta foi virada com sucesso
 */
export function virarCarta(tabuleiro: Tabuleiro, index: number, jogador: Jogador): boolean {
	const carta = obterCartaTabuleiro(tabuleiro, index);

	// Verificações de validade
	if (!carta || !carta.clicavel || carta.status !== 'hidden' || !podeJogar(tabuleiro)) {
		return false;
	}

	// Virar a carta
	alterarStatusCarta(carta, 'visible');
	tabuleiro.cartasViradas.push(carta);

	// Verificar se completou um par
	if (tabuleiro.cartasViradas.length === 2) {
		incrementarTentativasJogador(jogador);
		verificarPar(tabuleiro, jogador);
	}

	return true;
}

/**
 * Verifica se as duas cartas viradas formam um par
 * @param tabuleiro Instância do tabuleiro
 * @param jogador Instância do jogador
 */
export function verificarPar(tabuleiro: Tabuleiro, jogador: Jogador): void {
	const [carta1, carta2]: [Cartas, Cartas] = tabuleiro.cartasViradas as [Cartas, Cartas];

	if (cartasFormamPar(carta1, carta2)) {
		// Par encontrado!
		marcarCartasComoPar(carta1, carta2);
		incrementarAcertosJogador(jogador);
		tabuleiro.cartasViradas = [];

		// Verificar condição de vitória
		if (verificarVitoria(tabuleiro)) {
			alterarStatusTabuleiro(tabuleiro, 'finalizado');
		}
	} else {
		// Par incorreto - esconder cartas após delay
		setTimeout(() => esconderCartas(carta1, carta2, tabuleiro), 1000);
	}
}

/**
 * Marca duas cartas como par encontrado
 * @param carta1 Primeira carta do par
 * @param carta2 Segunda carta do par
 */
function marcarCartasComoPar(carta1: Cartas, carta2: Cartas): void {
	alterarStatusCarta(carta1, 'matched');
	alterarStatusCarta(carta2, 'matched');
	definirClicavelCarta(carta1, false);
	definirClicavelCarta(carta2, false);
}

/**
 * Esconde duas cartas e limpa o array de cartas viradas
 * @param carta1 Primeira carta a esconder
 * @param carta2 Segunda carta a esconder
 * @param tabuleiro Instância do tabuleiro
 */
function esconderCartas(carta1: Cartas, carta2: Cartas, tabuleiro: Tabuleiro): void {
	alterarStatusCarta(carta1, 'hidden');
	alterarStatusCarta(carta2, 'hidden');
	tabuleiro.cartasViradas = [];
}

/**
 * Verifica se todas as cartas foram encontradas (condição de vitória)
 * @param tabuleiro Instância do tabuleiro
 * @returns True se o jogador venceu
 */
export function verificarVitoria(tabuleiro: Tabuleiro): boolean {
	const todasCartas: Cartas[] = obterTodasCartasTabuleiro(tabuleiro);
	return todasCartas.every((carta: Cartas) => carta.status === 'matched');
}

/**
 * Cria uma nova instância de tabuleiro com configurações específicas
 * @param id Identificador único do tabuleiro
 * @param modo Modo de jogo (determina automaticamente o template)
 * @param imagens Array de imagens disponíveis
 * @returns Nova instância de Tabuleiro inicializada
 */
export function criarTabuleiro(id: string, modo: ModoJogo, imagens: string[]): Tabuleiro {
	const tabuleiro: Tabuleiro = new Tabuleiro(id, modo, 'aguardando');
	inicializarTabuleiro(tabuleiro, imagens);
	return tabuleiro;
}

/**
 * Reseta o jogo para o estado inicial
 * @param tabuleiro Instância do tabuleiro a ser resetada
 * @param jogador Instância do jogador a ser resetada
 * @param imagens Array de imagens para reinicializar o tabuleiro
 */
export function resetarJogo(tabuleiro: Tabuleiro, jogador: Jogador, imagens: string[]): void {
	// Reset do tabuleiro
	alterarStatusTabuleiro(tabuleiro, 'aguardando');
	inicializarTabuleiro(tabuleiro, imagens);

	// Reset do jogador
	resetarEstatisticasJogador(jogador);
}

/**
 * Valida se uma configuração de jogo é válida
 * @param modo Modo de jogo
 * @param imagens Array de imagens disponíveis
 * @returns True se a configuração é válida
 */
export function validarConfiguracaoJogo(modo: ModoJogo, imagens: string[]): boolean {
	const template = obterTemplatePorModo(modo);
	const configuracao = obterConfiguracaoTemplate(template);
	const numeroPares = configuracao.numeroPares;
	return imagens.length >= numeroPares;
}

/**
 * Obtém dica para o jogador (mostra brevemente um par válido)
 * @param tabuleiro Instância do tabuleiro
 * @returns Array com duas cartas que formam um par ou null se não houver pares disponíveis
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
