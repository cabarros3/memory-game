<script>
  // Team members data
  const team = [
    { id: 1, name: "Camilla Barros", img: "/vectors/Onibus.jpg" },
    { id: 2, name: "Vitor Correia", img: "/vectors/Onibus.jpg" },
    { id: 3, name: "Mariana Meireles", img: "/vectors/Onibus.jpg"  },
    { id: 4, name: "Filipe", img: "/vectors/Onibus.jpg"  },
    { id: 5, name: "Jadson", img: "/vectors/Onibus.jpg"  },
    { id: 6, name: "Walter", img: "/vectors/Onibus.jpg"  }
  ];
</script>

<section class="max-w-7xl mx-auto p-6">
  <h1 class="text-4xl font-bold mb-10 text-center">Our Memory Game Development Team</h1>

  <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
    {#each team as member}
      <div class="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div class="w-32 h-32 mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {#if member.img}
            <img src={member.img} alt={"Photo of " + member.name} class="object-cover w-full h-full" />
          {:else}
            <span class="text-gray-400">Image</span>
          {/if}
        </div>
        <h2 class="text-xl font-semibold">{member.name}</h2>
      </div>
    {/each}
  </div>
</section>

<style>
  :global(body) {
    background-color: #f9fafb;
  }
</style>
