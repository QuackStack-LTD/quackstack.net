<script lang="ts">
import { defineComponent } from 'vue'

interface FooterProps {
  companyName: string;
  year: number;
}

export default defineComponent({
  name: 'FooterComponent',
  props: {
    companyName: {
      type: String,
      default: 'QuackStack ltd.'
    },
    year: {
      type: Number,
      default: 2025
    }
  }
})
</script>

<template>
  <footer 
    class="flex flex-col items-center w-full bg-transparent mb-10"
    role="contentinfo"
  >
    <div class="mb-7 w-full h-px bg-white opacity-[0.15] max-sm:mb-5"></div>
    <div
      class="flex flex-col items-center text-xl font-light leading-normal text-center text-white max-md:text-lg max-sm:px-5 max-sm:py-0 max-sm:text-base"
    >
      <nav class="mb-2" role="navigation" aria-label="Footer links">
        <a
          target="_blank"
          rel="noopener noreferrer"
          class="text-white underline transition-opacity duration-[0.2s] ease-[ease]"
        >Terms</a>
        <span> & </span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          class="text-white underline transition-opacity duration-[0.2s] ease-[ease]"
        >Privacy</a>
      </nav>
      <div
        class="text-xl font-light text-white max-md:text-lg max-sm:text-base"
      >
        Copyright © {{ year }} {{ companyName }}
      </div>
    </div>
  </footer>
</template>