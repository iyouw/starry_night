import hljs from "highlight.js";
import type MarkdownIt from "markdown-it";
import { createRequire } from "module";

function mdCardWrapper(html: string) {
    const group = html
      .replace(/<h3/g, ':::<h3')
      .replace(/<h2/g, ':::<h2')
      .split(':::');
  
    return group
      .map((fragment) => {
        if (fragment.indexOf('<h3') !== -1) {
          return `<div class="sn-doc-card">${fragment}</div>`;
        }
  
        return fragment;
      })
      .join('');
}

function mdHighlight (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
        } catch (__) {}
    }

    return '';
}

function mdLinkOpen(md: MarkdownIt) {
    const defaultRender = md.renderer.rules.link_open;
  
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const aIndex = tokens[idx].attrIndex('target');
  
      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']);
      }
  
      if (defaultRender) {
        return defaultRender(tokens, idx, options, env, self);
      }
  
      return self.renderToken(tokens, idx, options);
    };
}


export default {
    wrapperClasses: 'sn-doc-markdown-body',
    transforms: {
        after: mdCardWrapper,
    },
    markdownItOptions: {
        typographer: false,
        highlight: mdHighlight,
    },
    markdownItSetup(md: MarkdownIt) {
        const require = createRequire(import.meta.url);
        const { slugify } = require('transliteration');
        const markdownItAnchor = require('markdown-it-anchor');

        mdLinkOpen(md);

        md.use(markdownItAnchor, {
            level: 2,
            slugify,
        });
    },
}