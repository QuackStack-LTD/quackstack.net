<template>
  <div class="grid grid-cols-12 max-lg:grid-cols-1 gap-10 max-lg:flex-col max-w-full font-poppins items-center flex-wrap justify-between">
    <div class="col-span-12 md:col-span-6 flex flex-col w-full">
      <div class="flex flex-col w-full text-base font-light text-white justify-between max-w-full text-opacity-80 max-lg:mt-10 max-lg:max-w-full max-lg:text-center max-lg:items-center">
        <div class="max-w-[22rem]">
          <div class="text-[2.8rem] max-sm:text-[2.2rem] font-semibold text-white mt-[6.25rem] max-lg:mt-10" role="heading" aria-level="2">
            {{ title }}
          </div>
          <div class="mt-20 max-lg:mt-10 w-[22rem] max-lg:max-w-full text-[1.2rem] max-sm:text-[1rem] max-md:items-center ">
            {{ offerDescription }}
          </div>
        </div>
        <button class="overflow-hidden md:ml-[0.5rem] gap-2 px-10 mt-9 leading-none bg-[#e59c2d] rounded-xl shadow-[0px_0px_0.5rem_0px_#e59c2d] min-h-[2.875rem] text-gray-950 w-[12rem] font-normal cursor-pointer transition-all duration-[125ms] ease-in-out hover:scale-[1.05]" aria-label="Contact Us" @click="ClickContactUs">
          Contact Us
        </button>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 flex flex-col w-full mt-10 overflow-x-none justify-center items-center" ref="cards">
      <img loading="lazy" src="@/assets/offers/offer1.svg" class="card mt-[0.625rem] h-[10rem] max-sm:max-h-[7.3rem] max-lg:max-h-[9.5rem]" />
      <img loading="lazy" src="@/assets/offers/offer2.svg" class="card mt-[0.625rem] h-[10rem] max-sm:max-h-[7.3rem] max-lg:max-h-[9.5rem]" />
      <img loading="lazy" src="@/assets/offers/offer3.svg" class="card mt-[0.625rem] h-[10rem] max-sm:max-h-[7.3rem] max-lg:max-h-[9.5rem]" />
      <img loading="lazy" src="@/assets/offers/offer4.svg" class="card mt-[0.625rem] h-[10rem] max-sm:max-h-[7.3rem] max-lg:max-h-[9.5rem]" />
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
            entries.forEach((entry, _) => {
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
