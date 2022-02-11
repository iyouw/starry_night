<template>
  <div :class="[' sn-doc-simulator', { ' sn-doc-simulator-fixed': isFixed }]">
    <iframe ref="iframe" :src="src" :style="simulatorStyle" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'SnSimulator',

  props: {
    src: String,
  },

  data() {
    return {
      scrollTop: window.scrollY,
      windowHeight: window.innerHeight,
    };
  },

  computed: {
    isFixed() {
      return this.scrollTop > 60;
    },

    simulatorStyle() {
      const height = Math.min(640, this.windowHeight - 90);
      return {
        height: height + 'px',
      };
    },
  },

  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollTop = window.scrollY;
    });
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight;
    });
  },
};
</script>

<style lang="stylus">
@import '../styles/var'

.sn-doc-simulator 
  position absolute
  top  sn-doc-padding +  sn-doc-header-top-height
  right  sn-doc-padding
  z-index 1
  box-sizing border-box
  width  sn-doc-simulator-width
  min-width  sn-doc-simulator-width
  overflow hidden
  background #fafafa
  border-radius  sn-doc-border-radius
  box-shadow 0 8px 12px #ebedf0

  @media (max-width 1100px)
    & 
        right auto
        left 750px
  

  @media (min-width  sn-doc-row-max-width)
    & 
        right 50%
        margin-right -( sn-doc-row-max-width / 2) + 24px
  

  &-fixed 
    position fixed
    top  sn-doc-padding
  

  iframe 
    display block
    width 100%
  

</style>
