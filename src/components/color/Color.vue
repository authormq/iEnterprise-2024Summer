<template>
  <div class="color-container">
    <img src="@/assets/light_dark.svg" @click="changeColorMode" />
    <ul>
      <li 
        class="theme-color-item animate__animated animate__slideInLeft"
        v-for="(color, index) in colors" :key="index"
        @click="changeThemeColor(index)"
        :style="{'background': color.default}"
      ></li>
    </ul>
  </div>
</template>

<script>
import 'animate.css'
import colors from './colors.js'

export default {
  name: 'Color',
  data() {
    return {
      colors
    }
  },
  methods: {
    changeColorMode() {
      if (getComputedStyle(document.documentElement).getPropertyValue('--bg-color') === '#f4f4f8') {
        document.documentElement.style.setProperty('--bg-color', '#18181c')
        document.documentElement.style.setProperty('--bg-like', '#161619')
        document.documentElement.style.setProperty('--bg-grey', '#464649')
        document.documentElement.style.setProperty('--bg-light-grey', '#232325') // ?
        document.documentElement.style.setProperty('--font-color', '#eaeaea')
        document.documentElement.style.setProperty('--shadow-color', '#2f2f33')
        localStorage.setItem('color-mode', 'dark')
      } else {
        document.documentElement.style.setProperty('--bg-color', '#f4f4f8')
        document.documentElement.style.setProperty('--bg-like', '#fafafc')
        document.documentElement.style.setProperty('--bg-grey', '#eaeaea')
        document.documentElement.style.setProperty('--bg-light-grey', '#f5f5f5')
        document.documentElement.style.setProperty('--font-color', '#333333')
        document.documentElement.style.setProperty('--shadow-color', '#d9d9d9')
        localStorage.setItem('color-mode', 'light')
      }
      const themeColorIndex = localStorage.getItem('theme-color-index')
      let index = 0
      if (themeColorIndex !== '') {
         index = parseInt(themeColorIndex)
      }
      if (getComputedStyle(document.documentElement).getPropertyValue('--bg-color') === '#f4f4f8') {
        document.documentElement.style.setProperty('--theme-color-contrast', this.colors[index].deeper)
        document.documentElement.style.setProperty('--theme-color-similar', this.colors[index].lighter)
        document.documentElement.style.setProperty('--theme-color-lighter', this.colors[index].veryLight)
      } else {
        document.documentElement.style.setProperty('--theme-color-contrast', this.colors[index].lighter)
        document.documentElement.style.setProperty('--theme-color-similar', this.colors[index].deeper)
        document.documentElement.style.setProperty('--theme-color-lighter', this.colors[index].deeper)
      }
    },
    changeThemeColor(index) {
      if (getComputedStyle(document.documentElement).getPropertyValue('--bg-color') === '#f4f4f8') {
        document.documentElement.style.setProperty('--theme-color', this.colors[index].default)
        document.documentElement.style.setProperty('--theme-color-similar', this.colors[index].lighter)
        document.documentElement.style.setProperty('--theme-color-contrast', this.colors[index].deeper)
        document.documentElement.style.setProperty('--theme-color-lighter', this.colors[index].veryLight)

      } else {
        document.documentElement.style.setProperty('--theme-color', this.colors[index].default)
        document.documentElement.style.setProperty('--theme-color-similar', this.colors[index].deeper)
        document.documentElement.style.setProperty('--theme-color-lighter', this.colors[index].deeper)
        document.documentElement.style.setProperty('--theme-color-contrast', this.colors[index].lighter)
      }
      localStorage.setItem('theme-color-index', String(index))
    }
  }
}
</script>

<style scoped>
div.color-container {
  display: flex;
  position: relative;
  width: 40px;
  height: 40px;
  color: #633064
}

div.color-container img {
  cursor: pointer;
}

div.color-container ul {
  display: none;
  z-index: 99999;
  position: absolute;
  align-items: center;
  background: var(--bg-like);
  border-radius: 5px;
  left: 100%;
  height: 40px;
  overflow: hidden;
}

div.color-container .theme-color-item {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 8px;
  transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

div.color-container .theme-color-item:last-child {
  margin-right: 8px;
}

div.color-container:hover ul {
  display: flex;
}
</style>