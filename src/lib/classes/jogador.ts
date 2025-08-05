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
