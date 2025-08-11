export class Jogador {
	nome: string;
	pontuacao: number;
	tentativas: number;
	acertos: number;
	tempoInicio: number;

	constructor(nome: string = 'Jogador') {
		this.nome = nome;
		this.pontuacao = 0;
		this.tentativas = 0;
		this.acertos = 0;
		this.tempoInicio = Date.now();
	}
}

// ============= FUNÇÕES PARA JOGADOR =============

/**
 * Incrementa as tentativas do jogador
 */
export function incrementarTentativasJogador(jogador: Jogador): void {
	jogador.tentativas++;
	console.log(`📊 Tentativas do jogador: ${jogador.tentativas}`);
}

/**
 * Incrementa os acertos e pontuação do jogador
 */
export function incrementarAcertosJogador(jogador: Jogador, pontos: number = 10): void {
	jogador.acertos++;
	jogador.pontuacao += pontos;
	console.log(`🎯 Acertos: ${jogador.acertos}, Pontuação: ${jogador.pontuacao}`);
}

/**
 * Reseta as estatísticas do jogador
 */
export function resetarEstatisticasJogador(jogador: Jogador): void {
	console.log('🔄 Resetando estatísticas do jogador');
	jogador.pontuacao = 0;
	jogador.tentativas = 0;
	jogador.acertos = 0;
	jogador.tempoInicio = Date.now();
}

/**
 * Calcula estatísticas do jogador
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
