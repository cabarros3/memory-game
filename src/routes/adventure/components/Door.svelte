
<!-- Porta -->
<div class="relative grid h-[280px] w-[120px] grid-rows-[120px_1fr] overflow-hidden rounded-lg shadow-xl bg-gradient-to-b from-gray-700 to-gray-900 border border-gray-500">
  
  <!-- Janelas da porta -->
  <div class="grid grid-cols-2 gap-[4px] bg-black/90 p-3 rounded-t-lg">
    <!-- Janela esquerda com reflexos -->
    <div class="relative h-full rounded-md bg-gradient-to-br from-sky-100 via-blue-50 to-blue-100 shadow-inner border border-gray-300">
      <!-- Reflexo simples -->
      <div class="absolute top-2 left-2 h-6 w-4 rounded-sm bg-white/50 blur-sm"></div>
      <!-- Divisórias da janela -->
      <div class="absolute inset-0 border border-gray-400 rounded-md"></div>
      <div class="absolute top-0 bottom-0 left-1/2 w-px bg-gray-400 -translate-x-1/2"></div>
    </div>
    
    <!-- Janela direita com reflexos -->
    <div class="relative h-full rounded-md bg-gradient-to-br from-sky-100 via-blue-50 to-blue-100 shadow-inner border border-gray-300">
      <!-- Reflexo simples -->
      <div class="absolute top-2 right-2 h-6 w-4 rounded-sm bg-white/50 blur-sm"></div>
      <!-- Divisórias da janela -->
      <div class="absolute inset-0 border border-gray-400 rounded-md"></div>
      <div class="absolute top-0 bottom-0 left-1/2 w-px bg-gray-400 -translate-x-1/2"></div>
    </div>
  </div>
  
  <!-- Corpo da porta -->
  <div class="relative bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600">
    <!-- Maçaneta -->
    <div class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg"></div>
    
    <!-- Painel central decorativo -->
    <div class="absolute inset-4 rounded border-2 border-gray-400 bg-gradient-to-br from-gray-500 to-gray-700 shadow-inner"></div>
    
    <!-- Dobradiças simplificadas -->
    <div class="absolute left-2 top-6 h-3 w-2 rounded-sm bg-gray-800 shadow"></div>
    <div class="absolute left-2 bottom-6 h-3 w-2 rounded-sm bg-gray-800 shadow"></div>
  </div>
  
  <!-- Borda de destaque -->
  <div class="absolute inset-0 rounded-lg border border-gray-400/50 pointer-events-none"></div>
</div>