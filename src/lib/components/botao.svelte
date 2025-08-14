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

  const baseClasses = "font-bold shadow-md duration-200 px-4 py-1.5 rounded-full font-semibold hover:shadow-lg transition-all";
</script>

<button
  class="{baseClasses} {sizeClasses[size]} {className}"
  style={style}
  type="button"
  on:click={onClick}
>
  {text}
</button>
