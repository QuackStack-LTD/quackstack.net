<template>
    <nav class="flex flex-col px-5 py-6 text-white whitespace-nowrap max-sm:p-4" role="navigation" aria-label="Main navigation">
      <div class="flex gap-5 justify-between items-center w-full pl-10 pr-10 max-md:px-4 max-md:py-0 max-sm:px-2 max-sm:py-0">
        <div class="flex gap-4 items-center text-2xl font-medium">
          <img src="@/assets/logo.svg" class="h-9"/>
        </div>
  
        <div class="flex gap-9 items-center text-base font-light max-md:gap-6 max-sm:hidden">
          <div class=" gap-5 items-center max-md:gap-4">
            <span class="transition-all duration-[125ms] cursor-pointer p-2 w-fit h-fit hover:underline" @click="handleContactClick">Contact</span>
          </div>
        </div>
      </div>
      <div class="mt-4 w-full bg-white opacity-[0.15] min-h-[1px]" role="separator"></div>
    </nav>
  </template>
  

<script setup lang="ts">
import { ref } from 'vue'

interface NavigationItem {
    label: string
  }

const navigationItems = ref<NavigationItem[]>([
    {label: 'Contact'},
])

const emit = defineEmits<{
  (e: 'scrollToContact'): void
}>()

const handleContactClick = () => {
    emit('scrollToContact')
}

</script>