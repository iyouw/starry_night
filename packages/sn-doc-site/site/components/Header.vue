<template>
  <div class="sn-doc-header">
    <div class="sn-doc-row">
      <div class="sn-doc-header__top">
        <a class="sn-doc-header__logo">
          <img :src="config.logo" />
          <span>{{ config.title }}</span>
        </a>

        <ul class="sn-doc-header__top-nav">
          <li
            v-for="(item, index) in config.links"
            :key="index"
            class="sn-doc-header__top-nav-item"
          >
            <a class="sn-doc-header__link" target="_blank" :href="item.url">
              <img v-if="item.logo" :src="item.logo" />
              <span v-else-if="item.text">
                {{ item.text }}
              </span>
            </a>
          </li>

          <li
            ref="version"
            v-if="versions"
            class="sn-doc-header__top-nav-item"
          >
            <span
              class="sn-doc-header__cube sn-doc-header__version"
              @click="toggleVersionPop"
            >
              {{ packageVersion }}
              <transition name="sn-doc-dropdown">
                <div v-if="showVersionPop" class="sn-doc-header__version-pop">
                  <div
                    v-for="(item, index) in versions"
                    :key="index"
                    class="sn-doc-header__version-pop-item"
                    @click="onSwitchVersion(item)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </transition>
            </span>
          </li>

          <li v-if="langLabel && langLink" class="sn-doc-header__top-nav-item">
            <a class="sn-doc-header__cube" :href="langLink">
              {{ langLabel }}
            </a>
          </li>

          <!-- <search-input
            v-if="searchConfig"
            :lang="lang"
            :search-config="searchConfig"
          /> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import SearchInput from './SearchInput.vue';
// import { packageVersion } from 'site-desktop-shared';

export default {
  name: 'SnHeader',

  // components: {
  //   SearchInput,
  // },

  props: {
    lang: String,
    config: Object,
    versions: Array,
    langConfigs: Array,
  },

  data() {
    return {
      packageVersion: '',
      showVersionPop: false,
    };
  },

  computed: {
    langLink() {
      return `#${this.$route.path.replace(this.lang, this.anotherLang.lang)}`;
    },

    langLabel() {
      return this.anotherLang.label;
    },

    anotherLang() {
      const items = this.langConfigs.filter((item) => item.lang !== this.lang);
      if (items.length) {
        return items[0];
      }

      return {};
    },

    searchConfig() {
      return this.config.searchConfig;
    },
  },

  methods: {
    toggleVersionPop() {
      const val = !this.showVersionPop;

      const action = val ? 'add' : 'remove';
      document.body[`${action}EventListener`](
        'click',
        this.checkHideVersionPop
      );

      this.showVersionPop = val;
    },

    checkHideVersionPop(event) {
      if (!this.$refs.version.contains(event.target)) {
        this.showVersionPop = false;
      }
    },

    onSwitchLang(lang) {
      this.$router.push(this.$route.path.replace(lang.from, lang.to));
    },

    onSwitchVersion(version) {
      if (version.link) {
        location.href = version.link;
      }
    },
  },
};
</script>

<style lang="stylus">
@import '../styles/var'

.sn-doc-header 
  width 100%
  background-color #001938
  user-select none

  &__top 
    display flex
    align-items center
    height sn-doc-header-top-height
    padding 0 sn-doc-padding

    &-nav 
      flex 1
      font-size 0
      text-align right

      > li 
        position relative
        display inline-block
        vertical-align middle
      
      &-item 
        margin-left 16px
      

      &-title 
        display block
        font-size 15px

  &__cube 
    position relative
    display block
    padding 0 12px
    color #001938
    background #f7f8fa
    font-size 14px
    line-height 30px
    text-align center
    border 1px solid rgba(255, 255, 255, 0.7)
    border-radius 20px
    cursor pointer
    transition 0.3s ease-in-out
  
  &__version 
    padding-right 20px

    &after 
      position absolute
      top 10px
      right 9px
      width 5px
      height 5px
      color #001938
      border 1px solid
      border-color transparent transparent currentColor currentColor
      transform rotate(-45deg)
      content ''
    

    &-pop 
      position absolute
      top 34px
      left 0
      width 100%
      z-index 99
      color #333
      line-height 36px
      text-align left
      overflow hidden
      background-color #fff
      border-radius 8px
      box-shadow 0 4px 12px #ebedf0
      transform-origin top
      transition 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)

      &-item 
        padding-left 12px
        transition 0.2s

        &hover 
          color sn-doc-blue
          background-color #f7f8fa
        
  &__logo 
    display block

    img,
    span 
      display inline-block
      vertical-align middle
    
    img 
      width 28px
      margin-right 12px
    
    span 
      color #fff
      font-size 22px

  &__link 
    span 
      color #fff
      font-size 16px

    img 
      display block
      width 30px
      height 30px
      transition 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)

      &hover 
        transform scale(1.2)
      
.sn-doc-dropdown 
  &-enter,
  &-leave-active 
    transform scaleY(0)
    opacity 0
  

</style>
