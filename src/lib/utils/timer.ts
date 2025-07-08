export function criarTemporizador(
	callback: (tempoFormatado: string, totalSegundos: number) => void
) {
	let segundos = 0;
	let intervalo: ReturnType<typeof setInterval>;

	function formatarTempo(s: number): string {
		const min = Math.floor(s / 60)
			.toString()
			.padStart(2, '0');
		const sec = (s % 60).toString().padStart(2, '0');
		return `${min}:${sec}`;
	}

	function iniciar() {
		intervalo = setInterval(() => {
			segundos += 1;
			callback(formatarTempo(segundos), segundos);
		}, 1000);
	}

	function pausar() {
		clearInterval(intervalo);
	}

	function resetar() {
		segundos = 0;
		callback(formatarTempo(segundos), segundos);
	}

	function getSegundos() {
		return segundos;
	}

	return { iniciar, pausar, resetar, getSegundos };
}
