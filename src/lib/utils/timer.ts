// export function criarTemporizador(
// 	callback: (tempoFormatado: string, totalSegundos: number) => void
// ) {
// 	let segundos = 0;
// 	let intervalo: ReturnType<typeof setInterval>;

// 	function formatarTempo(s: number): string {
// 		const min = Math.floor(s / 60)
// 			.toString()
// 			.padStart(2, '0');
// 		const sec = (s % 60).toString().padStart(2, '0');
// 		return `${min}:${sec}`;
// 	}

// 	function iniciar() {
// 		intervalo = setInterval(() => {
// 			segundos += 1;
// 			callback(formatarTempo(segundos), segundos);
// 		}, 1000);
// 	}

// 	function pausar() {
// 		clearInterval(intervalo);
// 	}

// 	function resetar() {
// 		segundos = 0;
// 		callback(formatarTempo(segundos), segundos);
// 	}

// 	function getSegundos() {
// 		return segundos;
// 	}

// 	return { iniciar, pausar, resetar, getSegundos };
// }

// export function criarTemporizador(
// 	callback: (tempoFormatado: string, totalSegundos: number, tempoRestante?: number) => void,
// 	tempoLimite?: number // Novo parâmetro opcional para o limite em segundos
// ) {
// 	let segundos = 0;
// 	let intervalo: ReturnType<typeof setInterval>;
// 	let limite = tempoLimite; // Armazena o limite
// 	let onTimeUp: (() => void) | null = null; // Callback para quando o tempo acabar

// 	function formatarTempo(s: number): string {
// 		const min = Math.floor(s / 60)
// 			.toString()
// 			.padStart(2, '0');
// 		const sec = (s % 60).toString().padStart(2, '0');
// 		return `${min}:${sec}`;
// 	}

// 	function formatarTempoRestante(s: number): string {
// 		if (s <= 0) return '00:00';
// 		const min = Math.floor(s / 60)
// 			.toString()
// 			.padStart(2, '0');
// 		const sec = (s % 60).toString().padStart(2, '0');
// 		return `${min}:${sec}`;
// 	}

// 	function iniciar() {
// 		intervalo = setInterval(() => {
// 			segundos += 1;

// 			// Calcula tempo restante se há limite
// 			const tempoRestante = limite ? Math.max(0, limite - segundos) : undefined;

// 			callback(formatarTempo(segundos), segundos, tempoRestante);

// 			// Verifica se o tempo acabou
// 			if (limite && segundos >= limite) {
// 				pausar();
// 				if (onTimeUp) {
// 					onTimeUp();
// 				}
// 			}
// 		}, 1000);
// 	}

// 	function pausar() {
// 		clearInterval(intervalo);
// 	}

// 	function resetar() {
// 		segundos = 0;
// 		const tempoRestante = limite ? limite : undefined;
// 		callback(formatarTempo(segundos), segundos, tempoRestante);
// 	}

// 	function getSegundos() {
// 		return segundos;
// 	}

// 	function getTempoRestante() {
// 		return limite ? Math.max(0, limite - segundos) : null;
// 	}

// 	function setTimeUpCallback(cb: () => void) {
// 		onTimeUp = cb;
// 	}

// 	function setLimite(novoLimite: number) {
// 		limite = novoLimite;
// 	}

// 	return {
// 		iniciar,
// 		pausar,
// 		resetar,
// 		getSegundos,
// 		getTempoRestante,
// 		setTimeUpCallback,
// 		setLimite,
// 		formatarTempoRestante
// 	};
// }

export function criarTemporizador(
	callback: (tempoRestanteFormatado: string, tempoRestanteSegundos: number) => void,
	tempoLimite: number = 60 // Padrão 60 segundos
) {
	let segundosRestantes = tempoLimite;
	let intervalo: ReturnType<typeof setInterval>;
	let onTimeUp: (() => void) | null = null;

	function formatarTempo(s: number): string {
		if (s <= 0) return '00:00';
		const min = Math.floor(s / 60)
			.toString()
			.padStart(2, '0');
		const sec = (s % 60).toString().padStart(2, '0');
		return `${min}:${sec}`;
	}

	function iniciar() {
		intervalo = setInterval(() => {
			segundosRestantes -= 1;

			callback(formatarTempo(segundosRestantes), segundosRestantes);

			// Verifica se o tempo acabou
			if (segundosRestantes <= 0) {
				pausar();
				if (onTimeUp) {
					onTimeUp();
				}
			}
		}, 1000);
	}

	function pausar() {
		clearInterval(intervalo);
	}

	function resetar() {
		segundosRestantes = tempoLimite;
		callback(formatarTempo(segundosRestantes), segundosRestantes);
	}

	function getSegundosRestantes() {
		return segundosRestantes;
	}

	function setTimeUpCallback(cb: () => void) {
		onTimeUp = cb;
	}

	function setLimite(novoLimite: number) {
		tempoLimite = novoLimite;
		segundosRestantes = novoLimite;
	}

	return {
		iniciar,
		pausar,
		resetar,
		getSegundosRestantes,
		setTimeUpCallback,
		setLimite,
		formatarTempo
	};
}
