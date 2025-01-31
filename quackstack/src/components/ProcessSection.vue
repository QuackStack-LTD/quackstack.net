<template>
  <div class="grid grid-cols-12 gap-5 max-lg:grid-cols-1 font-poppins w-full max-lg:items-center lg:justify-between justify-center">
    <div class="col-span-12 md:col-span-6 flex w-full flex-col max-lg:ml-0 max-lg:w-full">
      <div class="flex relative flex-col self-stretch my-auto w-full max-lg:mt-10 max-lg:max-w-full max-lg:text-center flex-wrap">
        <div class="text-[2.8rem] max-sm:text-[2.2rem]  font-semibold text-white max-lg:max-w-full" role="heading" aria-level="2">
          {{ title }}
        </div>
        <div class="mt-20 text-[1.2rem] max-sm:text-[1rem] w-full md:w-[calc(100%-10rem)] font-light text-white text-opacity-80 max-lg:mt-10 max-lg:max-w-full max-lg:px-4 mt-1">
          {{ description }}
        </div>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 flex flex-col max-md:ml-0 max-md:w-full max-lg:items-center">
      <img ref="imageElement" loading="lazy" src="@/assets/development.svg"
        class="object-contain grow rounded-none aspect-[1] h-[35rem] max-sm:h-[18rem] max-md:place-self-center max-lg:mt-10 max-lg:max-h-[34rem]"
        :alt="imageAlt" />
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue';

export default defineComponent({
  name: 'ProcessSection',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      required: true
    }
  },
  setup() {
    const imageElement = ref<HTMLElement | null>(null);
    const scrollState = reactive({
      lastScrollY: 0, // Track the last scroll position
      scrollDirection: 'down', // Default scroll direction is down
    });

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
      if (imageElement.value) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
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

        observer.observe(imageElement.value);
      }
    });

    return { imageElement };
  }
});
</script>


<style scoped>
img {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

img.animate {
  opacity: 1;
  transform: scale(1);
}

img.reverse {
  opacity: 0;
  transform: scale(0.8);
}
</style>
