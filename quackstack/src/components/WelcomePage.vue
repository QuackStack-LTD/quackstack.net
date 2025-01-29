<template>
  <div class="flex flex-col overflow-hidden">
    <HeroHeading/>
    <div class="flex relative flex-col items-center pt-7 mt-50 w-full min-h-[2948px] max-md:max-w-full gap-y-20">
      <div class="relative w-full max-w-[1026px] max-md:max-w-full">
        <OfferSection
          title="What we offer"
          offerDescription="Our team delivers personalized software solutions, optimizing your system requirements, integration, and scalability to ensure exceptional performance and success."
          @scrollToContact="scrollToContactSection"
        />
      </div>
      <div class="relative mt-72 ml-4 w-full max-w-[1119px] max-md:mt-10 max-md:max-w-full">
        <ProcessSection
          title="Development Process"
          description="Our development process adapts to your preferences. We recommend &quot;milestones&quot; lasting 2–4 weeks, with meetings for progress updates and payments at each stage. For faster results, we can allocate more developers to complete multiple milestones simultaneously. We're always open to your suggestions."
          imageAlt="Development process diagram"
        />
      </div>
      <ContactSection ref="contactSectionRef"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HeroHeading from '@/components/Heading.vue'
import OfferSection from '@/components/OffersSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import ContactSection from '@/components/ContactSection.vue'

export default defineComponent({
  name: 'WelcomePage',
  components: {
    HeroHeading,
    OfferSection,
    ProcessSection,
    ContactSection
  },
  setup() {
    const contactSectionRef = ref<InstanceType<typeof ContactSection> | null>(null);

    const scrollToContactSection = () => {
      if (contactSectionRef.value) {
        const element = contactSectionRef.value.$el as HTMLElement;
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    return {
      contactSectionRef,
      scrollToContactSection
    };
  }
})
</script>