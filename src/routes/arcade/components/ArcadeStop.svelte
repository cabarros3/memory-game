<script>
	import ArcadeStopCard from './ArcadeStopCard.svelte';
  import { goto } from '$app/navigation';
  
  let progress = 2;

  const cards = [
    {
      src: '/vectors/img1.jpg',
      alt: 'Terminal Igarassu',
      titleCard: 'Terminal Integrado',
      highlighted: true
    },
    {
      src: '/vectors/img2.jpg',
      alt: 'IFPE Igarassu',
      titleCard: 'IFPE',
      highlighted: true
    },
    {
      src: '/vectors/img3.jpg',
      alt: 'VTO',
      titleCard: 'VTO',
      highlighted: false
    },
    {
      src: '/vectors/img3.jpg',
      alt: 'Vila Rural',
      titleCard: 'Vila Rural',
      highlighted: false
    },
    {
      src: '/vectors/img3.jpg',
      alt: 'Delícias da Roça',
      titleCard: 'Delícias da Roça',
      highlighted: false
    },
    {
      src: '/vectors/img3.jpg',
      alt: 'Delícias da Roça',
      titleCard: 'Delícias da Roça',
      highlighted: false
    }
  ];
</script>

<div class="flex flex-row flex-wrap gap-2 w-[50%] p-10">
  {#each cards as card, i}
  <ArcadeStopCard
    src={card.src}
    alt={card.alt}
    titleCard={card.titleCard}
    onPlay={() => goto(`/level/${i + 1}`)}
    disabled={i >= progress}
    />
{/each}
</div>
