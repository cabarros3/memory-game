<!-- NomeJogadorModal.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let mostrar = true;
  
  const dispatch = createEventDispatcher();
  
  let nome = '';
  let erro = '';
  /**
	 * @type {HTMLInputElement}
	 */
  let inputRef;

  // Auto-focus quando o modal aparece
  $: if (mostrar && inputRef) {
    setTimeout(() => inputRef.focus(), 100);
  }

  function confirmarNome() {
    const nomeFormatado = nome.trim();
    
    // Validações simples
    if (!nomeFormatado) {
      erro = 'Please, type your name!';
      return;
    }
    
    if (nomeFormatado.length < 2) {
      erro = 'Nome deve ter pelo menos 2 caracteres!';
      return;
    }
    
    if (nomeFormatado.length > 20) {
      erro = 'Nome muito longo! Máximo 20 caracteres.';
      return;
    }
    
    // Sucesso - emite evento
    dispatch('nomeDefinido', { nome: nomeFormatado });
    mostrar = false;
  }

  function usarAnonimo() {
    dispatch('nomeDefinido', { nome: 'Anonymous player' });
    mostrar = false;
  }

  /**
	 * @param {{ key: string; }} event
	 */
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      confirmarNome();
    }
  }

  function limparErro() {
    erro = '';
  }
</script>

{#if mostrar}
  <div class="modal-overlay">
    <div class="modal-container">
      
      <!-- Header -->
      <div class="modal-header">
        <div class="emoji">🎮</div>
        <h2 class="titulo">Wellcome to MemoGame: BotaFire!</h2>
        <p class="subtitulo">What would you like to be called?</p>
      </div>

      <!-- Input -->
      <div class="input-container">
        <input
          bind:this={inputRef}
          bind:value={nome}
          on:input={limparErro}
          on:keydown={handleKeydown}
          placeholder="Type your name..."
          class="input-nome"
          maxlength="20"
        />
        
        {#if erro}
          <p class="erro">⚠️ {erro}</p>
        {/if}
      </div>

      <!-- Botões -->
      <div class="botoes">
        <button on:click={usarAnonimo} class="btn btn-anonimo">
          🕶️ Anon
        </button>
        
        <button on:click={confirmarNome} class="btn btn-jogar">
          🚀 Play!
        </button>
      </div>

      <!-- Dica -->
      <div class="dica">
        💡 Your name will appear on the leaderboard!
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 1000;
  }

  .modal-container {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    max-width: 400px;
    width: 100%;
    padding: 1.5rem;
    animation: bounce-in 0.6s ease-out forwards;
  }

  .modal-header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .titulo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
  }

  .subtitulo {
    color: #6b7280;
    margin: 0;
  }

  .input-container {
    margin-bottom: 1rem;
  }

  .input-nome {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    text-align: center;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }

  .input-nome:focus {
    outline: none;
    border-color: #3b82f6;
  }

  .erro {
    color: #ef4444;
    font-size: 0.875rem;
    margin: 0.5rem 0 0 0;
    text-align: center;
  }

  .botoes {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-anonimo {
    background: #6b7280;
    color: white;
  }

  .btn-anonimo:hover {
    background: #4b5563;
  }

  .btn-jogar {
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    color: white;
  }

  .btn-jogar:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
  }

  .dica {
    text-align: center;
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
  }

  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>