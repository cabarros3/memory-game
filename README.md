# 🚌 MemoryGame: Botafogo

## 📌 1. Visão Geral

Este projeto é um **jogo da memória temático** inspirado no famoso ônibus 1908 da comunidade rural de Botafogo (Igarassu - PE). A proposta é oferecer uma experiência divertida e acessível via navegador, com visual adaptado ao contexto local.

- **Nome provisório**: MemoGame: Botafogo
- **Objetivo**: Criar um jogo da memória simples, temático e responsivo
- **Plataforma**: Web (desktop e mobile)
- **Público-alvo**: Comunidade acadêmica do IPFE Igarassu

---

## ✅ 2. Requisitos Funcionais

| Código | Descrição                                                  |
| ------ | ---------------------------------------------------------- |
| RF01   | Exibir tela inicial com botão "Jogar"                      |
| RF02   | Mostrar tabuleiro com cartas viradas para baixo            |
| RF03   | Permitir virar duas cartas por jogada                      |
| RF04   | Manter cartas iguais viradas; esconder se forem diferentes |
| RF05   | Contar tempo da partida e número de tentativas             |
| RF06   | Informar quando todos os pares forem encontrados           |
| RF07   | Oferecer botão para reiniciar o jogo                       |
| RF08   | Permitir troca de tema (claro/escuro)                      |
| RF09   | Exibir placar final com tempo e tentativas                 |

---

## 🚫 3. Requisitos Não Funcionais

| Código | Descrição                                         |
| ------ | ------------------------------------------------- |
| RNF01  | O jogo deve carregar em até 3 segundos            |
| RNF02  | Interface responsiva para mobile e desktop        |
| RNF03  | Desenvolvido com Svelte e Tailwind CSS            |
| RNF04  | Deve ser acessível (navegação por teclado, ARIA)  |
| RNF05  | Compatível com os principais navegadores modernos |

---

## 🧰 4. Tecnologias Utilizadas

- **Framework**: [SvelteKit](https://kit.svelte.dev)
- **Estilização**: Tailwind CSS
- **Controle de versão**: Git + GitHub
- **Hospedagem**: Netlify ou Vercel _(a definir)_
- **Ferramentas auxiliares**: Vite, ESLint, Prettier

---

## 🧭 5. Interface e Navegação

### Tela Inicial

- Nome do jogo
- Botão "Jogar"

### Tela do Jogo

- Grade 4x4 com cartas
- Temporizador
- Contador de tentativas
- Botão "Reiniciar"

### Tela Final

- Mensagem de conclusão
- Tempo total e número de tentativas
- Botão “Jogar novamente”

---

## 🎮 6. Regras do Jogo

- 16 cartas (8 pares) embaralhadas aleatoriamente
- Jogador vira 2 cartas por vez
- Cartas iguais permanecem visíveis
- Cartas diferentes viram de volta após 1 segundo
- Jogo termina ao encontrar todos os pares
- Exibição do tempo e tentativas no final

---

## 🎯 7. Critérios de Aceitação

- [x] Todas as funcionalidades estão implementadas
- [x] Design responsivo para diferentes tamanhos de tela
- [x] Acessibilidade por teclado e leitores de tela
- [x] Compatibilidade com Chrome, Firefox e Edge
- [x] Código limpo, modular e reutilizável em Svelte

---

## 💡 8. Funcionalidades Futuras

- 🔊 Efeitos sonoros (cartas e vitória)
- ✨ Animações personalizadas
- 🏆 Ranking com melhores tempos
- 👫 Modo multiplayer local ou online
- 🎨 Customização de temas e fundos

---

## 🛠️ 9. Como Rodar o Projeto Localmente

### ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Git](https://git-scm.com/)

### 📦 Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
```
