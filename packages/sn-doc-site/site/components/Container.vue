<template>
  <div
    class="sn-doc-container sn-doc-row"
    :class="{ 'sn-doc-container--with-simulator': hasSimulator }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SnDocContainer',
  props: {
    hasSimulator: Boolean,
  }
}
</script>

<style lang="stylus">
@import '../styles/var'

.sn-doc-container 
  box-sizing border-box
  padding-left sn-doc-nav-width
  overflow hidden

  &--with-simulator 
    padding-right sn-doc-simulator-width + sn-doc-padding

    @media (max-width 1100px) 
      padding-right sn-doc-simulator-width - 8px
</style>
