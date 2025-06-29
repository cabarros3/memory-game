<script lang="ts">
  export let text: string = "Jogar";
  export let size: "sm" | "md" | "lg" = "md";
  export let onClick = () => {};

  const sizeClasses = {
    sm: {
      width: "80px",
      height: "auto",
      fontSize: "1rem"
    },
    md: {
      width: "90px",
      height: "auto",
      fontSize: "1.3rem"
    },
    lg: {
      width: "100px",
      height: "auto",
      fontSize: "1.6rem"
    }
  };

  const current = sizeClasses[size];
</script>

<div>
    <button class=" py-1 text-lg font-bold bg-color3 text-black rounded-lg hover:bg-color2 shadow-md" type="button" on:click={onClick} style="
    width: {current.width};
    height: {current.height};
    font-size: {current.fontSize};
  ">
            {text}
    </button>   
</div>