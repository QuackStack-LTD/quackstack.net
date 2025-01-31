<template>
  <title>QuackStack</title>
  <div class="relative overflow-x-hidden">
    <div class="bg-gray-950 items-center font-poppins overflow-x-hidden">
      <div class="absolute inset-y-0 right-0 top-200 w-30 h-290 bg-[#ffd04e] blur-[9.375rem] max-md:hidden "></div>
      <div class="absolute inset-y-0 left-0 top-550 w-30 h-100 bg-[#ffd04e] blur-[9.375rem] max-md:hidden "></div>
      <div class="absolute inset-y-0 left-0 top-50 w-30 h-100 bg-[#ffd04e] blur-[9.375rem] max-md:hidden "></div>
      <div class="absolute inset-x-0 bottom-0 w-full h-10 bg-[#ffd04e] blur-[9.375rem] max-md:hidden"></div>


      <div class="flex flex-col px-50 gap-x-30 overflow-x-hidden max-md:px-10 max-lg:px-30 max-lg:gap-x-10 max-lg:items-center">
        <Navbar class="mb-50 max-lg:mb-10" @scrollToContact="handleScrollToContact"/>
        <WelcomePage ref="welcomePageRef"/>
      </div>
      <Footer/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import WelcomePage from './components/WelcomePage.vue'

const welcomePageRef = ref<InstanceType<typeof WelcomePage> | null>(null)

const handleScrollToContact = () => {
  welcomePageRef.value?.scrollToContactSection()
}

</script>

<style scoped>
</style>
