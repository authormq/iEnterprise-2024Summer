<template>
  <mavon-editor
    codeStyle="atom-one-dark"
    ref="md"
    :toolbars-flag="false"
    :navigation="false"
    :editable="false"
    :subfield="false"
    :scroll-style="true"
    preview-background="fff-fff"
    box-shadow-style="2"
    default-open="preview"
    style="min-height: 0"
    v-model="content"
  ></mavon-editor>
</template>

<script>
// import { externalLink } from '@/api/url';
// import markdownItMermaid from '@wekanteam/markdown-it-mermaid';

export default {
  name: 'MarkdownDisplayer',
  props: {
    value: {
      required: true
    }
  },
  // mounted: function () {
  //   const { md } = this.$refs;
  //   (md.markdownIt || md.getMarkdownIt()).use(markdownItMermaid);
  // },
  data: function () {
    return {
      content: this.value,
      // externalLink: externalLink
    };
  },
  watch: {
    value: function (updated) {
      this.content = updated;
    },
    content: function (old, updated) {
      if (old !== updated) {
        this.$emit('input', this.content);
      }
    }
  }
};
</script>

<style scoped></style>
