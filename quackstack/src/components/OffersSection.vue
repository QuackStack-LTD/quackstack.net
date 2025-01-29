<template>
  <div class="grid grid-cols-12 gap-10 max-md:flex-col w-full font-poppins items-center">
    <div class="col-span-12 md:col-span-6 flex flex-col w-full">
      <div class="flex flex-col w-full text-base font-light text-white text-opacity-80 max-md:mt-10 max-md:max-w-full">
        <div class="self-start text-[40px] font-semibold text-white mt-[100px] max-md:mt-10" role="heading" aria-level="2">
          {{ title }}
        </div>
        <div class="mt-20 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full text-[17px]">
          {{ offerDescription }}
        </div>
        <button class="overflow-hidden gap-2 self-start px-10 mt-9 leading-none bg-[#e59c2d] rounded-xl shadow-[0px_0px_8px_0px_#e59c2d] min-h-[46px] text-gray-950 w-fit font-normal cursor-pointer transition-all duration-[125ms] ease-in-out hover:scale-[1.05]" aria-label="Contact Us" @click="ClickContactUs">
          Contact Us
        </button>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 flex flex-col w-full mt-10 max-md:flex-row max-md:overflow-x-auto" ref="cards">
      <img loading="lazy" src="@/assets/offers/offer1.svg" class="card mt-[10px] max-md:mr-4" />
      <img loading="lazy" src="@/assets/offers/offer2.svg" class="card mt-[10px] max-md:mr-4" />
      <img loading="lazy" src="@/assets/offers/offer3.svg" class="card mt-[10px] max-md:mr-4" />
      <img loading="lazy" src="@/assets/offers/offer4.svg" class="card mt-[10px] max-md:mr-4" />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';

export default defineComponent({
  name: 'OffersSection',
  props: {
    title: {
      type: String,
      required: true
    },
    offerDescription: {
      type: String,
      required: true
    }
  },
  emits: ['scrollToContact'],
  setup(props, {emit}) {
    
    const cards = ref<HTMLElement | null>(null);

    const scrollState = reactive({
      lastScrollY: 0, // Track the last scroll position
      scrollDirection: 'down', // Default scroll direction is down
    });

    const ClickContactUs = () => {
      emit('scrollToContact');
    };

    // Listen for scroll events to detect scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if the user is scrolling up or down
      if (currentScrollY > scrollState.lastScrollY) {
        scrollState.scrollDirection = 'down'; // Scrolling down
      } else if (currentScrollY < scrollState.lastScrollY) {
        scrollState.scrollDirection = 'up'; // Scrolling up
      }

      // Update the last scroll position
      scrollState.lastScrollY = currentScrollY;
    };

    // Watch for scroll events
    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    // Cleanup scroll listener when component is destroyed
    onMounted(() => {
      if (cards.value) {
        const images = cards.value.querySelectorAll('.card');

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry, index) => {
              const target = entry.target as HTMLElement;

              // Check if the image is in the viewport and if scrolling up
              if (!entry.isIntersecting && scrollState.scrollDirection === 'up') {
                target.classList.add('reverse'); // Reverse animation when scrolling up past image
                target.classList.remove('animate'); // Remove forward animation
              } else if (entry.isIntersecting) {
                target.classList.add('animate'); // Forward animation when image enters the viewport
                target.classList.remove('reverse'); // Remove reverse animation
              }
            });
          },
          { threshold: 0.3 } // Trigger when 30% of the image is visible
        );

        images.forEach((image) => observer.observe(image));
      }
    });

    return { 
      cards,
      ClickContactUs
     };
  }
});
</script>

<style scoped>
.card {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.card.animate {
  opacity: 1;
  transform: scale(1);
}

.card.reverse {
  opacity: 0;
  transform: scale(0.8);
}
</style>
