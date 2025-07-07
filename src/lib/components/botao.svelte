<script lang="ts">
  export let text: string = "Jogar";
  export let size: "sm" | "md" | "lg" = "md";
  export let onClick: () => void = () => {};
  export let className: string = ""; 
  export let style: string = "";     

  const sizeClasses = {
    sm: "w-20 text-base",
    md: "w-24 text-lg",
    lg: "w-40 text-xl"
  };

  const baseClasses = "py-1 font-bold rounded-2xl shadow-md transition-all duration-200";
</script>

<button
  class="{baseClasses} {sizeClasses[size]} {className}"
  style={style}
  type="button"
  on:click={onClick}
>
  {text}
</button>
