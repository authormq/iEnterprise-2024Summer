<template>
  <mavon-editor codeStyle="atom-one-dark" @imgAdd="imageAdd" :externalLink="externalLink" ref="editor" v-model="content" :toolbars="toolbars" />
</template>

<script>
import Moment from '@/api/Moment';
// import { externalLink } from '@/api/url';
// import { uploadPublic } from '@/api/upload';
// import markdownItMermaid from '@wekanteam/markdown-it-mermaid';
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  // mounted: function () {
  //   const md = this.$refs.editor;
  //   (md.markdownIt || md.getMarkdownIt()).use(markdownItMermaid);
  // },
  data: function () {
    return {
      content: this.value,
      // externalLink: externalLink,
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        imagelink: true,
        code: true,
        table: true,
        undo: true,
        redo: true,
        trash: true,
        save: false,
        alignleft: true,
        aligncenter: true,
        alignright: true,
      }
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
  },
  methods: {
    async imageAdd(pos, file) {
      let formData = new FormData();
      formData.append("files", file);
      Moment.addImage(formData).then(
        (response) => {
          console.log(response.data.files[0]);
          this.$refs.editor.$img2Url(pos, response.data.files[0]);
        },
        (error) => {
          console.log(error.message);
        }
      )
    },
  }
};
</script>

<style scoped></style>
