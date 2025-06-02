<template>
  <div>
    <LayoutBaseHeader />
    <main>
      <slot />
    </main>
    <LayoutBaseFooter />
  </div>
</template>

<script setup>
usePageSeo()
</script>
