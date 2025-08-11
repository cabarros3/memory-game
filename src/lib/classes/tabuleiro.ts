import { Cartas } from './Cartas';

export type TemplateTabuleiro = 'quadrado' | 'onibus';
export type StatusTabuleiro = 'aguardando' | 'jogando' | 'pausado' | 'finalizado';
export type ModoJogo = 'adventure' | 'arcade' | 'timed' | 'challenge';

export interface ConfiguracaoTemplate {
	numeroPares: number;
	numeroCartas: number;
	usaMatriz: boolean;
}

export class Tabuleiro {
	id: string;
	cartas: Cartas[];
	modo: ModoJogo;
	status: StatusTabuleiro;
	template: TemplateTabuleiro;
	cartasViradas: Cartas[];
	configuracao: ConfiguracaoTemplate;

	constructor(id: string, modo: ModoJogo = 'adventure', status: StatusTabuleiro = 'aguardando') {
		this.id = id;
		this.cartas = [];
		this.modo = modo;
		this.status = status;
		this.template = 'quadrado'; // será definido pela função
		this.cartasViradas = [];
		this.configuracao = { numeroPares: 0, numeroCartas: 0, usaMatriz: false }; // será definido pela função
	}
}

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
 */
export function obterTemplatePorModo(modo: ModoJogo): TemplateTabuleiro {
	return MODO_PARA_TEMPLATE[modo] || 'quadrado';
}

/**
 * Obtém a configuração de um template
 */
export function obterConfiguracaoTemplate(template: TemplateTabuleiro): ConfiguracaoTemplate {
	return TEMPLATES_CONFIG[template] || TEMPLATES_CONFIG.quadrado;
}

/**
 * Configura o tabuleiro com template e configuração baseado no modo
 */
export function configurarTabuleiro(tabuleiro: Tabuleiro): void {
	tabuleiro.template = obterTemplatePorModo(tabuleiro.modo);
	tabuleiro.configuracao = obterConfiguracaoTemplate(tabuleiro.template);
}

/**
 * Obtém uma carta específica do tabuleiro por índice
 */
export function obterCartaTabuleiro(tabuleiro: Tabuleiro, index: number): Cartas | null {
	if (index < 0 || index >= tabuleiro.cartas.length) {
		console.error(`❌ Índice inválido: ${index}. Total de cartas: ${tabuleiro.cartas.length}`);
		return null;
	}
	return tabuleiro.cartas[index];
}

/**
 * Obtém todas as cartas do tabuleiro
 */
export function obterTodasCartasTabuleiro(tabuleiro: Tabuleiro): Cartas[] {
	return tabuleiro.cartas;
}

/**
 * Verifica se o jogo está em estado jogável
 */
export function podeJogar(tabuleiro: Tabuleiro): boolean {
	return tabuleiro.status === 'jogando';
}

/**
 * Altera o status do tabuleiro
 */
export function alterarStatusTabuleiro(tabuleiro: Tabuleiro, novoStatus: StatusTabuleiro): void {
	console.log(`🔄 Alterando status do tabuleiro: ${tabuleiro.status} → ${novoStatus}`);
	tabuleiro.status = novoStatus;
}
