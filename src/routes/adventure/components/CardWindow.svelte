<script lang="ts">
  export let carta;
  export let onClick: () => void;
</script>

<div
  class="janela cursor-pointer"
  role="button"
  tabindex="0"
  on:click={onClick}
  on:keydown={(e) => e.key === 'Enter' && onClick()}
>
  <img src="/carta.png" alt="Imagem" class="imagem" />
  <div class="vidro {carta.aberta ? 'aberto' : ''}"></div>
</div>
