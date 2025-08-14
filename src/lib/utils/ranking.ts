// ========================
// TIPOS E INTERFACES
// ========================

export interface RankingEntry {
	id: string;
	nome: string;
	pontuacao: number;
	tentativas: number;
	acertos: number;
	tempoDecorrido: number; // em segundos
	precisao: number; // porcentagem
	nivel: number;
	data: string; // ISO string
	pontuacaoFinal: number; // pontuação calculada para ranking
}

export interface RankingStats {
	totalJogadores: number;
	melhorTempo: number;
	maiorPontuacao: number;
	melhorPrecisao: number;
}

// ========================
// CLASSE RANKING MANAGER
// ========================

export class RankingManager {
	private static readonly STORAGE_KEY = 'memoryGameRanking';
	private static readonly MAX_ENTRIES = 50; // Mantém os top 50

	/**
	 * Salva uma nova entrada no ranking
	 */
	static salvarNoRanking(
		jogador: any, // sua classe Jogador
		nivel: number,
		tempoDecorrido: number,
		tempoEsgotado: boolean = false
	): RankingEntry {
		const precisao =
			jogador.tentativas > 0 ? Math.round((jogador.acertos / jogador.tentativas) * 100) : 0;

		// Fórmula de pontuação que considera múltiplos fatores
		const pontuacaoFinal = this.calcularPontuacaoFinal(
			jogador.pontuacao,
			precisao,
			tempoDecorrido,
			jogador.acertos,
			tempoEsgotado
		);

		const entrada: RankingEntry = {
			id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			nome: jogador.nome,
			pontuacao: jogador.pontuacao,
			tentativas: jogador.tentativas,
			acertos: jogador.acertos,
			tempoDecorrido,
			precisao,
			nivel,
			data: new Date().toISOString(),
			pontuacaoFinal
		};

		const ranking = this.obterRanking();
		ranking.push(entrada);

		// Ordena por pontuação final (maior primeiro) e mantém apenas os melhores
		const rankingAtualizado = ranking
			.sort((a, b) => b.pontuacaoFinal - a.pontuacaoFinal)
			.slice(0, this.MAX_ENTRIES);

		this.salvarRanking(rankingAtualizado);

		console.log('🏆 Nova entrada salva no ranking:', entrada);
		return entrada;
	}

	/**
	 * Calcula pontuação final considerando vários fatores
	 */
	private static calcularPontuacaoFinal(
		pontuacaoBase: number,
		precisao: number,
		tempoDecorrido: number,
		acertos: number,
		tempoEsgotado: boolean
	): number {
		let pontuacao = pontuacaoBase;

		// Bônus por precisão (0-50 pontos extras)
		const bonusPrecisao = Math.round((precisao / 100) * 50);
		pontuacao += bonusPrecisao;

		// Bônus por velocidade (máximo 100 pontos, diminui com o tempo)
		const bonusVelocidade = Math.max(0, 100 - Math.floor(tempoDecorrido / 2));
		pontuacao += bonusVelocidade;

		// Bônus por acertos
		const bonusAcertos = acertos * 25;
		pontuacao += bonusAcertos;

		// Penalidade por tempo esgotado
		if (tempoEsgotado) {
			pontuacao = Math.round(pontuacao * 0.5); // 50% de penalidade
		}

		return Math.max(0, pontuacao);
	}

	/**
	 * Obtém o ranking completo
	 */
	static obterRanking(): RankingEntry[] {
		try {
			const data = localStorage.getItem(this.STORAGE_KEY);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error('❌ Erro ao obter ranking:', error);
			return [];
		}
	}

	/**
	 * Salva o ranking no localStorage
	 */
	private static salvarRanking(ranking: RankingEntry[]): void {
		try {
			localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ranking));
		} catch (error) {
			console.error('❌ Erro ao salvar ranking:', error);
		}
	}

	/**
	 * Obtém estatísticas do ranking
	 */
	static obterEstatisticas(): RankingStats {
		const ranking = this.obterRanking();

		if (ranking.length === 0) {
			return {
				totalJogadores: 0,
				melhorTempo: 0,
				maiorPontuacao: 0,
				melhorPrecisao: 0
			};
		}

		return {
			totalJogadores: ranking.length,
			melhorTempo: Math.min(...ranking.map((r) => r.tempoDecorrido)),
			maiorPontuacao: Math.max(...ranking.map((r) => r.pontuacaoFinal)),
			melhorPrecisao: Math.max(...ranking.map((r) => r.precisao))
		};
	}

	/**
	 * Obtém o top N jogadores
	 */
	static obterTopJogadores(limit: number = 10): RankingEntry[] {
		return this.obterRanking().slice(0, limit);
	}

	/**
	 * Encontra a posição de um jogador no ranking
	 */
	static encontrarPosicaoJogador(entryId: string): number {
		const ranking = this.obterRanking();
		const index = ranking.findIndex((entry) => entry.id === entryId);
		return index >= 0 ? index + 1 : -1;
	}

	/**
	 * Limpa todo o ranking (para desenvolvimento/reset)
	 */
	static limparRanking(): void {
		localStorage.removeItem(this.STORAGE_KEY);
		console.log('🗑️ Ranking limpo');
	}

	/**
	 * Formata tempo em formato legível
	 */
	static formatarTempo(segundos: number): string {
		const mins = Math.floor(segundos / 60);
		const secs = segundos % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	/**
	 * Obtém a medalha baseada na posição
	 */
	static obterMedalha(posicao: number): string {
		switch (posicao) {
			case 1:
				return '🥇';
			case 2:
				return '🥈';
			case 3:
				return '🥉';
			default:
				return '🏅';
		}
	}
}

// ========================
// EXEMPLO DE USO NO SEU JOGO
// ========================

/*
// No final do seu jogo (função fimDeJogo), adicione:

function fimDeJogo() {
  if (jogoFinalizado) return;
  
  jogoFinalizado = true;
  temporizador.pausar();
  
  const tempoDecorrido = Math.floor((Date.now() - jogador.tempoInicio) / 1000);
  
  // Salva no ranking
  const entrada = RankingManager.salvarNoRanking(
    jogador,
    nivel,
    tempoDecorrido,
    tempoEsgotado
  );
  
  // Obtém a posição do jogador
  const posicao = RankingManager.encontrarPosicaoJogador(entrada.id);
  
  setTimeout(() => {
    showVictoryModal = true;
    // Você pode passar a entrada e posição para o modal
  }, 300);
}

// Para acessar o ranking:
const topJogadores = RankingManager.obterTopJogadores(10);
const estatisticas = RankingManager.obterEstatisticas();
*/
