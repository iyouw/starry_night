<template>
  <main class="app">
    <doc
      v-if="config"
      :lang="lang"
      :config="config"
      :versions="versions"
      :simulator="simulator"
      :has-simulator="hasSimulator"
      :lang-configs="langConfigs"
    >
      <router-view />
    </doc>
  </main>
</template>

<script>
import Doc from './components/Document.vue';
import { config } from 'site-inject';

export default {
  components: {
    Doc,
  },

  data() {
    return {
      hasSimulator: true,
    };
  },

  computed: {
    simulator() {
      return '';
      if (config.site.simulator?.url) {
        return config.site.simulator?.url;
      }
      const path = location.pathname.replace(/\/index(\.html)?/, '/');
      return `${path}mobile.html${location.hash}`;
    },

    lang() {
      const { lang } = this.$route.meta;
      return lang || '';
    },

    langConfigs() {
      return [];
      const { locales = {} } = config.site;
      return Object.keys(locales).map((key) => ({
        lang: key,
        label: locales[key].langLabel || '',
      }));
    },

    config() {
      return config;
    },

    versions() {
      return null;
    },
  },

  watch: {
    // eslint-disable-next-line
    '$route.path'() {
      this.setTitleAndToogleSimulator();
    },

    lang(val) {
      setLang(val);
      this.setTitleAndToogleSimulator();
    },

    config: {
      handler(val) {
        if (val) {
          this.setTitleAndToogleSimulator();
        }
      },
      immediate: true,
    },
  },

  mounted() {
    if (this.$route.hash) {
      this.$nextTick(() => {
        const el = document.querySelector(this.$route.hash);
        if (el) {
          el.scrollIntoView();
        }
      });
    }
  },

  methods: {
    setTitleAndToogleSimulator() {
      let { title } = this.config;

      const navItems = this.config.nav.reduce(
        (result, nav) => [...result, ...nav.items],
        []
      );

      const current = navItems.find(
        (item) => item.path === this.$route.meta.name
      );

      if (current && current.title) {
        title = current.title + ' - ' + title;
      } else if (this.config.description) {
        title += ` - ${this.config.description}`;
      }

      document.title = title;

      this.hasSimulator = !(
        this.config.hideSimulator ||
        (current && current.hideSimulator)
      );
    },
  },
};
</script>

<style lang="stylus">
@import './styles/index'

.sn-doc-intro 
  padding-top 20px
  text-align center

  p
    margin-bottom 20px
</style>
