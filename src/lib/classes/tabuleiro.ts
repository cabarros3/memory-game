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
