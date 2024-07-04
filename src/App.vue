<template>
  <!--
                    _ooOoo_
                   o8888888o
                   88" . "88
                   (| -_- |)
                    O\ = /O
                %___/'---'\___%
                 .' \\| |// '.
               / \\||| : |||// \
             / _||||| -:- |||||- \
               | | \\\ - /// | |
              | \_| ''\---/'' |_/
              \ .-\__ `-` ___/-. /
            ___`. .' /--.--\ `. . __
         ."" '< `.___\_<|>_/___.' >'"".
       | | : `- \`.;`\ _ /`;.`/ - ` : | |
         \ \ `-. \_ __\ /__ _/ .-` / /
%%=====`-.____`-.___\_____/___.-`____.-'=====%%
                    `=---=' 
-->
  <n-notification-provider>
  <n-message-provider>
    <Banner />
    <div class="container">
      <nav>
        <ul class="nav">
          <li :class="{ 'active': $route.path.includes('main') }">
            <RouterLink to="/main">
              <svg t="1719287531193" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="10093" id="mx_n_1719287531193" width="30" height="30">
                <path
                  d="M817.12 539.36a34.56 34.56 0 0 0-34.24 35.36v315.04h-544V576a34.4 34.4 0 1 0-68.64 0v348.16A34.88 34.88 0 0 0 203.36 960h613.76a35.04 35.04 0 0 0 33.92-35.84V576a35.04 35.04 0 0 0-33.92-35.84z m132.32-11.36L536.64 76.32a32 32 0 0 0-44-5.76 28 28 0 0 0-5.76 5.76L74.08 528a40.32 40.32 0 0 0 0 53.28 32 32 0 0 0 45.44 4.32 27.52 27.52 0 0 0 4.32-4.32L512 155.04l388.96 425.6a32 32 0 0 0 45.6 4.32 26.56 26.56 0 0 0 4.16-4.32 40.32 40.32 0 0 0-1.28-52.64z"
                  p-id="10094"></path>
              </svg>
            </RouterLink>
          </li>
          <li :class="{ 'active': $route.path.includes('moment') }">
            <RouterLink to="/moment">
              <svg t="1719294511375" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="12340" width="30" height="30">
                <path
                  d="M1007.906287 7.197189C1001.808668 2.998829 994.811402 0.799688 987.214369 0.799688 980.616947 0.799688 974.619289 2.499024 968.921515 5.997657L18.89262 554.083561C5.897696 561.380711-0.199922 572.576337 0.599766 587.870363c0.99961 15.69387 8.696603 26.18977 22.791097 31.4877l216.415463 88.765326c5.597813 2.299102 11.995314 1.199531 16.493557-2.698945l602.864506-521.796174-478.912925 586.970715c-9.296369 11.395549-14.394377 25.689965-14.394377 40.484186v176.33112c0 7.696993 2.299102 14.594299 6.697384 20.891839 4.298321 6.397501 10.196017 10.695822 17.393206 13.394768 3.598594 1.499414 7.796954 2.299102 12.695041 2.299102 11.795392 0 21.091761-4.19836 27.989066-13.094885L553.883639 860.663803c8.896525-10.895744 23.790707-14.594299 36.785631-9.296368l236.707536 96.762202c4.898087 1.899258 9.496291 2.898868 13.69465 2.898867 6.397501 0 12.395158-1.699336 17.693089-4.598203 10.196017-6.097618 16.393596-14.69426 18.292854-25.689965l146.142913-876.957439c2.299102-15.194065-2.598985-27.489262-15.294025-36.585708zM236.707536 637.650918L99.561109 581.372901l606.563061-349.963295-469.416634 406.241312zM819.679813 875.757907l-226.711441-92.563842-32.787193-13.394768c-6.497462-2.698946-13.994533-0.799688-18.392815 4.698165l-22.491214 27.389301L429.832097 910.944162v-77.169855c0-14.69426 5.098009-28.988676 14.394377-40.484186l438.5287-537.590004 50.480281-61.775869L819.679813 875.757907z"
                  p-id="12341"></path>
              </svg>
            </RouterLink>
          </li>
          <li :class="{ 'active': $route.path.includes('chat') }">
            <RouterLink to="/chat">
              <svg t="1719287383645" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6851" id="mx_n_1719287383646" width="30" height="30">
                <path
                  d="M512 457.031816A55.033029 55.033029 0 1 0 567.033029 512.064845 55.033029 55.033029 0 0 0 512 457.031816z m220.132117 0A55.033029 55.033029 0 1 0 786.738533 512.064845a55.033029 55.033029 0 0 0-55.033029-55.033029z m-439.837621 0A55.033029 55.033029 0 1 0 346.900913 512.064845a55.033029 55.033029 0 0 0-55.03303-55.033029z"
                  p-id="6852"></path>
                <path
                  d="M917.70861 637.062345a405.70861 405.70861 0 0 1-93.854778 127.983789A442.823909 442.823909 0 0 1 682.645052 853.354948a475.246469 475.246469 0 0 1-324.225598 7.252415 35.835461 35.835461 0 0 0-29.436272 2.986288L213.37116 929.718609l-18.344343-154.860384a35.835461 35.835461 0 0 0-10.238703-20.904019 389.923943 389.923943 0 0 1-115.18541-274.738533 378.832015 378.832015 0 0 1 34.12901-157.846673 405.70861 405.70861 0 0 1 93.854778-127.983789A442.823909 442.823909 0 0 1 341.354948 104.223172a474.393244 474.393244 0 0 1 343.849779 0 441.117458 441.117458 0 0 1 138.649105 87.882201 406.135223 406.135223 0 0 1 93.854778 127.983789 380.111852 380.111852 0 0 1 0 315.266733zM981.273892 291.932729a476.099694 476.099694 0 0 0-110.492671-152.300709 511.935155 511.935155 0 0 0-160.406348-102.387031 546.91739 546.91739 0 0 0-396.749746 0 511.935155 511.935155 0 0 0-162.539411 102.387031A478.232757 478.232757 0 0 0 42.726108 291.932729a451.782774 451.782774 0 0 0-42.661263 187.282944 461.168252 461.168252 0 0 0 127.983789 316.119958l23.037082 196.668422a36.262073 36.262073 0 0 0 35.835461 31.995947 36.262073 36.262073 0 0 0 17.91773-4.692739l148.461195-85.322526a547.344003 547.344003 0 0 0 358.354608-13.651604 511.935155 511.935155 0 0 0 162.539412-102.387031A477.806145 477.806145 0 0 0 981.273892 666.925229a453.915837 453.915837 0 0 0 0-374.9925z"
                  p-id="6853"></path>
              </svg>
            </RouterLink>
          </li>
          <li :class="{ 'active': $route.path.includes('enterprise') }">
            <RouterLink to="/enterprise">
              <svg t="1719287407729" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="7882" width="30" height="30">
                <path
                  d="M928 832 896 832 896 384c0-70.4-57.6-128-128-128L576 256 576 192c0-70.4-57.6-128-128-128L192 64C121.6 64 64 121.6 64 192l0 640L32 832C14.08 832 0 846.08 0 864 0 881.92 14.08 896 32 896l896 0c17.92 0 32-14.08 32-32C960 846.08 945.92 832 928 832zM512 256l0 64 0 512L128 832 128 192c0-35.2 28.8-64 64-64l256 0c35.2 0 64 28.8 64 64L512 256zM832 832 576 832 576 320l192 0c35.2 0 64 28.8 64 64L832 832zM416 256l-192 0C206.08 256 192 270.08 192 288 192 305.92 206.08 320 224 320l192 0C433.92 320 448 305.92 448 288 448 270.08 433.92 256 416 256zM416 448l-192 0C206.08 448 192 462.08 192 480 192 497.92 206.08 512 224 512l192 0C433.92 512 448 497.92 448 480 448 462.08 433.92 448 416 448zM416 640l-192 0C206.08 640 192 654.08 192 672S206.08 704 224 704l192 0C433.92 704 448 689.92 448 672S433.92 640 416 640zM736 448l-64 0C654.08 448 640 462.08 640 480 640 497.92 654.08 512 672 512l64 0C753.92 512 768 497.92 768 480 768 462.08 753.92 448 736 448zM736 640l-64 0c-17.92 0-32 14.08-32 32s14.08 32 32 32l64 0c17.92 0 32-14.08 32-32S753.92 640 736 640z"
                  p-id="7883"></path>
              </svg>
            </RouterLink>
          </li>
          <li :class="{ 'active': $route.path.includes('notification') }">
            <RouterLink to="/notification">
              <svg t="1719767019029" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4288" width="30" height="30"><path d="M889.828994 749.637494c-1.204099-1.548127-119.205779-166.165631-119.205779-287.435579 0-168.401814-76.202251-254.752898-162.725349-286.919536L607.897867 159.973123c0-52.980346-43.175542-95.983874-95.983874-95.983874S415.930119 107.164791 415.930119 159.973123l0 16.685369c-10.836889 7.912649-16.169326 21.845792-11.868974 35.262893 5.332437 16.857383 23.393919 25.974131 40.251302 20.641693 17.717453-5.676466 36.983034-8.428691 56.936671-8.428691l21.32975 0c115.249454 0 184.055098 89.103309 184.055098 238.239543 0 108.024861 72.933983 235.315303 110.261045 293.456073-57.452713 26.146145-183.023014 76.202251-304.809004 76.202251-121.441962 0-247.356291-50.400134-304.809004-76.546279 37.327062-57.968755 110.089031-184.915169 110.089031-293.112044 0-62.441122 11.524945-114.217369 34.574836-153.952629 8.77272-15.309256 3.612296-34.918864-11.69696-43.691584-15.48127-8.944734-34.918864-3.612296-43.691584 11.69696-28.554342 49.540064-43.175542 112.1532-43.175542 185.947253 0 121.269948-118.00168 285.199395-119.205779 286.919536-5.332437 7.568621-7.396607 16.857383-5.332437 25.974131 2.064169 8.944734 7.912649 16.685369 15.997312 20.985721 5.676466 3.096254 107.336805 57.280699 233.423148 84.458928 21.32975 66.397447 73.966068 111.29313 133.654964 111.29313s112.325214-44.895683 133.654964-111.29313c126.086343-27.178229 227.746682-81.018646 233.423148-83.942886 8.084663-4.472367 13.933143-12.040988 16.169326-20.985721C897.225601 766.666891 895.333445 757.206115 889.828994 749.637494zM501.249118 159.973123c-7.224593 0-14.277171 1.032085-21.32975 1.548127L479.919368 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625 17.545439 0 31.994625 14.449185 31.994625 31.994625l0 0.860071c-7.224593-0.516042-14.277171-0.860071-21.32975-0.860071L501.249118 159.973123zM511.913993 928.016126c-22.361834 0-43.175542-13.417101-57.968755-35.262893 19.26558 2.064169 38.531161 3.268268 57.968755 3.268268s38.875189-1.376113 57.968755-3.268268C555.089535 914.599026 534.275827 928.016126 511.913993 928.016126z"  p-id="4289"></path></svg>
            </RouterLink>
          </li>
          <li :class="{ 'active': $route.path.includes('user') }">
            <RouterLink to="/user">
              <svg t="1719287452612" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="8900" width="30" height="30">
                <path
                  d="M516.352 448c-123.562667 0-224-100.48-224-224S392.789333 0 516.352 0s224.042667 100.48 224.042667 224-100.522667 224-224.042667 224z m0-362.666667c-76.458667 0-138.666667 62.208-138.666667 138.666667s62.208 138.666667 138.666667 138.666667c76.501333 0 138.709333-62.208 138.709333-138.666667S592.853333 85.333333 516.352 85.333333zM930.986667 1024h-85.333334c0-233.130667-147.754667-422.784-329.344-422.784S187.008 790.869333 187.008 1024h-85.333333c0-280.149333 186.026667-508.117333 414.677333-508.117333 228.650667 0 414.634667 227.968 414.634667 508.117333z"
                  p-id="8901"></path>
              </svg>
            </RouterLink>
          </li>
        </ul>
        <Color />
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </n-message-provider>
  </n-notification-provider>

</template>

<script setup>
import Banner from './components/banner/Banner.vue'
import Color from './components/color/Color.vue'
import colors from './components/color/colors.js'
import MessageWebSocket from "@/api/MessageWebSocket";
import { getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'

import { NMessageProvider, NNotificationProvider } from 'naive-ui';

// ******************** DO NOT MODIFY ******************** //
const colorMode = localStorage.getItem('color-mode')
const themeColorIndex = localStorage.getItem('theme-color-index')

if (!colorMode || colorMode === 'light') {
  localStorage.setItem('color-mode', 'light')
  document.documentElement.style.setProperty('--bg-color', '#f4f4f8')
  document.documentElement.style.setProperty('--bg-like', '#fafafc')
  document.documentElement.style.setProperty('--bg-grey', '#eaeaea')
  document.documentElement.style.setProperty('--bg-light-grey', '#f5f5f5')
  document.documentElement.style.setProperty('--font-color', '#333333')
  document.documentElement.style.setProperty('--shadow-color', '#d9d9d9')
} else {
  document.documentElement.style.setProperty('--bg-color', '#18181c')
  document.documentElement.style.setProperty('--bg-like', '#161619')
  document.documentElement.style.setProperty('--bg-grey', '#464649')
  document.documentElement.style.setProperty('--bg-light-grey', '#232325')//
  document.documentElement.style.setProperty('--font-color', '#eaeaea')
  document.documentElement.style.setProperty('--shadow-color', '#2f2f33')
}

if (!themeColorIndex) {
  localStorage.setItem('theme-color-index', '0')
} else {
  const index = parseInt(themeColorIndex)
  if (getComputedStyle(document.documentElement).getPropertyValue('--bg-color') === '#f4f4f8') {
    document.documentElement.style.setProperty('--theme-color', colors[index].default)
    document.documentElement.style.setProperty('--theme-color-similar', colors[index].lighter)
    document.documentElement.style.setProperty('--theme-color-lighter', colors[index].veryLight)
    document.documentElement.style.setProperty('--theme-color-contrast', colors[index].deeper)

  } else {
    document.documentElement.style.setProperty('--theme-color', colors[index].default)
    document.documentElement.style.setProperty('--theme-color-similar', colors[index].deeper)
    document.documentElement.style.setProperty('--theme-color-lighter', colors[index].deeper)
    document.documentElement.style.setProperty('--theme-color-contrast', colors[index].lighter)
  }
}

const { proxy } = getCurrentInstance()

onMounted(() => {
  const userId = proxy.$cookies.get('user_id')
  if (userId) {
    MessageWebSocket.connect(userId)
  }
})

onBeforeUnmount(() => {
  MessageWebSocket.disconnect()
})

</script>

<style scoped>
div.container {
  width: 100%;
  height: calc(100% - 60px);
  /* margin-top: 10px; */
  display: flex;
  align-items: center;
}

nav {
  height: 98%;
  margin-left: 10px;
  margin-bottom: 2%;
  width: 55px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

ul.nav {
  width: 50px;
  height: 80%;
  box-sizing: border-box;

  flex-wrap: wrap;
}

ul.nav li {
  height: 40px;
  width: 40px;
  padding: 5px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul.nav li:hover {
  background: var(--theme-color-similar);
}

ul.nav li:hover svg {
  fill: var(--bg-like);
}

ul.nav li a {
  display: flex;
  justify-content: center;
  align-items: center;
}

ul.nav li {
  margin-top: 30px;
}

ul.nav li:last-child {
  margin-bottom: 30px;
}

ul.nav svg {
  fill: var(--theme-color-similar);
}

ul.nav svg:hover {
  fill: var(--theme-color);
}

li.active {
  background: var(--theme-color) !important;
}

li.active svg,
li.active svg:hover {
  /* fill: var(--theme-color); */
  fill: var(--bg-like);
}

main {
  height: 100%;
  margin-right: 20px;
  flex: 1;
  box-sizing: border-box;
  /* background: var(--bg-like); */
  border-radius: 10px;
  padding-top: 10px;
  /* background: yellow; */
}
</style>
