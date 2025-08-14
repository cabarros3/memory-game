 <script>
	import { goto } from "$app/navigation";

  function voltarMenu() {
		goto('/'); // ajuste o caminho do seu menu principal
	}


  // Team members data - atualize com as informações reais (LinkedIn, GitHub, roles)
  const team = [
    { 
      id: 1, 
      name: "Camilla Barros", 
      role: "Frontend Developer",
      img: "/profile_photos/camilla.jpeg",
      linkedin: "https://linkedin.com/in/camillabarros", // Substitua pelo LinkedIn real
      github: "https://github.com/cabarros3" // Substitua pelo GitHub real
    },
    { 
      id: 2, 
      name: "Vitor Correia", 
      role: "Backend Developer",
      img: "/profile_photos/vitor.jpeg",
      linkedin: "https://www.linkedin.com/in/vitorcorreiia",
      github: "https://github.com/vitorcorreiia"
    },
    { 
      id: 3, 
      name: "Filipe Vasconcelos", 
      role: "UI/UX Designer",
      img: "/profile_photos/filipe.jpeg",
      linkedin: "/about",
      github: "https://github.com/FILIPE-000"
    },
    { 
      id: 4, 
      name: "Mariana Meireles", 
      role: "Game Developer",
      img: "/profile_photos/anonimo.jpeg",
      linkedin: "/about",
      github: "/about"
    },
    { 
      id: 5, 
      name: "Jadson", 
      role: "Full Stack Developer",
      img: "/profile_photos/anonimo.jpeg",
      linkedin: "/about",
      github: "/about"
    },
    { 
      id: 6, 
      name: "Wagner Gabriel", 
      role: "Project Manager",
      img: "/profile_photos/wagner.jpeg",
      linkedin: "/about",
      github: "/about"
    }
  ];
</script>

<div class="min-h-screen  text-black">
  <div class="flex justify-center py-5">
    <button
		on:click={voltarMenu}
		class="flex items-center gap-1 text-blue-600 transition-colors cursor-pointer hover:text-color2"
	>
		Back to main menu
	</button>
  </div>
  <!-- Header -->
  <div class="relative overflow-hidden">
    <div class="absolute inset-0"></div>
    <div class="relative container mx-auto px-6 py-16 text-center">
      <div class="flex items-center justify-center mb-6">
       <!-- <BusFront size={40}/> -->
        <h1 class="text-5xl font-bold bg-gradient-to-r from-color3 to-color4 bg-clip-text text-transparent">
          MemoGame: BotaFire
        </h1>
      </div>
      <div class="w-24 h-1 bg-gradient-to-r from-color3 to-color4 mx-auto"></div>
    </div>
  </div>


    <div class="flex flex-row gap-5 items-center justify-center px-5">
      <img src="/images/Onibus.jpg" alt="Imagem do ônibus" class="rounded-2xl w-1/3 h-3/4">
      <!-- Game Description -->
      <div class="flex flex-col min-h-screen py-5">
        <h2 class="font-bold text-4xl px-5 py-5 justify-start ">The Origin of Botafire</h2>
        <div class="max-w-2xl px-4">
          <p class="py-2">It all began with an academic project for Professor Allan's class, in the TSI program at IFPE Igarassu. The mission was to develop a game, but we wanted more than just code and pixels; we were searching for a soul, a story that was genuinely ours.</p>
          <p class="py-2">The inspiration didn't come from fantasy worlds, but from the asphalt we travel on every day. It came from the sound of the engine, the sway on the curves, and the experience that unites us all: the journey aboard the legendary Botafogo - Igarassu bus, line 1908.</p>
          <p class="py-2">For those who study on campus, it was never just a ride. It's the protagonist of a daily adventure, a machine known for its impressive speed and for the mastery with which it conquers the steep hills of Alto do Céu. It's the adrenaline rush before an exam, the conversations in the back of the bus, and the certainty that, somehow, we would make it on time.</p>
          <p class="py-2">From this intensity, from this 'flame' that comes with crossing the city to study, the name was born: Botafire.</p>
          <p class="py-2">This game is, therefore, our folklore in digital form. A tribute to every student who has ever held on tight to their seat, smiling with a mix of fear and admiration. It is our story transformed into a memory challenge.</p>
      </div>
    </div>
  </div>

  




  <!-- Development Team -->
  <div class="container mx-auto px-6 py-12">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
        Development Team
      </h2>
      <div class="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-600 mx-auto"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {#each team as member}
        <div class="bg-white backdrop-blur-sm rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-">
          <!-- Profile Photo -->
          <div class="text-center mb-6">
            <div class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-color2 shadow-lg overflow-hidden bg-gray-200">
              {#if member.img}
                <img
                  src={member.img}
                  alt={member.name}
                  class="w-full h-full object-cover"
                />
              {:else}
                <div class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              {/if}
            </div>
            <h3 class="text-xl font-bold text-black mb-1">{member.name}</h3>
          </div>

          <!-- Social Links -->
          <div class="flex justify-center space-x-4">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-300 group"
            >
              <svg class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300 group"
            >
              <svg class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Footer -->
  <div class="py-8">
    <div class="container mx-auto px-6 text-center">
      <p class="text-slate-400">
        Made with ❤️ for the IFPE and T.I Igarassu/Botafogo community
      </p>
    </div>
  </div>
</div>