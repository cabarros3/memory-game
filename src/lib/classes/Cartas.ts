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
