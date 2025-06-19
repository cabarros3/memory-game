# 📋 Documento de Requisitos – Jogo da Memória

## 1. Visão Geral do Projeto

O projeto consiste em um jogo da memória temático, baseado no famoso ônibus 1908 da comunidade rural de Botafogo (Igarassu - PE), conhecido por sua velocidade nas ladeiras e curvas da BR-101. O objetivo é oferecer uma experiência lúdica e divertida, acessível por navegadores web.

- **Nome provisório**: Memory Game (nome provisóiro)
- **Objetivo**: Desenvolver um jogo da memória simples, temático e responsivo
- **Plataforma**: Web (desktop e mobile)
- **Público-alvo**: Comunidade acadêmica do IPFE Igarassu

---

## 2. Requisitos Funcionais

| Código | Requisito                                                  |
| ------ | ---------------------------------------------------------- |
| RF01   | Exibir tela inicial com botão "Jogar"                      |
| RF02   | Mostrar tabuleiro com cartas viradas para baixo            |
| RF03   | Permitir virar duas cartas por jogada                      |
| RF04   | Manter cartas iguais viradas, esconder se forem diferentes |
| RF05   | Contar tempo da partida e número de tentativas             |
| RF06   | Informar o jogador quando todos os pares forem encontrados |
| RF07   | Oferecer botão para reiniciar o jogo                       |
| RF08   | Permitir troca de tema (modo claro/escuro)                 |
| RF09   | Exibir placar final com tempo e tentativas                 |

---

## 3. Requisitos Não Funcionais

| Código | Requisito                                                 |
| ------ | --------------------------------------------------------- |
| RNF01  | O jogo deve carregar em até 3 segundos                    |
| RNF02  | Interface responsiva para mobile e desktop                |
| RNF03  | Aplicação deve ser desenvolvida com Svelte e Tailwind CSS |
| RNF04  | Aplicação deve ser acessível (ex: teclas, ARIA)           |
| RNF05  | Deve funcionar nos principais navegadores modernos        |

---

## 4. Tecnologias Utilizadas

- **Framework**: SvelteKit
- **Estilização**: Tailwind CSS
- **Fonte**: Lexend ou Inter (Google Fonts)
- **Controle de versão**: Git + GitHub
- **Hospedagem**: Netlify ou Vercel (a definir)
- **Ferramentas auxiliares**: Vite, ESLint, Prettier (opcional)

---

## 5. Interface e Navegação

### Estrutura das Páginas

- **Tela Inicial**
  - Nome do jogo
  - Botão "Jogar"
- **Tela do Jogo**
  - Grade 4x4 com cartas
  - Timer
  - Contador de tentativas
  - Botão "Reiniciar"
- **Tela Final**
  - Mensagem de parabéns
  - Exibição do tempo e tentativas
  - Botão “Jogar novamente”

---

## 5. Regras do Jogo

- O tabuleiro será composto por 8 pares de cartas (total de 16)
- As cartas serão embaralhadas no início da partida
- O jogador pode virar apenas 2 cartas por jogada
- Cartas iguais permanecem viradas
- Cartas diferentes viram de volta após 1 segundo
- O jogo termina quando todos os pares forem encontrados
- O tempo e número de tentativas são exibidos ao final

---

## 6. Critérios de Aceitação

- ✅ Todas as funcionalidades descritas estão implementadas
- ✅ Design responsivo em diferentes resoluções de tela
- ✅ Acessibilidade implementada (teclado e leitores de tela)
- ✅ Compatibilidade com navegadores modernos (Chrome, Firefox, Edge)
- ✅ Código limpo, modular e reutilizável com Svelte

---

## 7. Extras e Futuras Implementações

- 🎵 Efeitos sonoros ao virar carta ou vencer
- 🎉 Animações personalizadas para vitórias
- 📈 Ranking com melhores tempos (futuro)
- 🧑‍🤝‍🧑 Modo multiplayer local ou online (futuro)
- 🎨 Customização de temas e fundos (futuro)

## Para rodar o projeto

- npm run dev
