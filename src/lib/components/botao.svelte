<script>
  export let text = "Jogar";
  export let onClick = () => {};
</script>

<div>
    <button class="px-5 text-lg courier-prime-bold bg-color3 text-black rounded-lg hover:bg-color2 shadow-md" type="button" on:click={onClick}>
            {text}
    </button>   
</div>