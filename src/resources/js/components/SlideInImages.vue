<template>
    <div class="work-container-img-all">
        <div
            v-for="(image, index) in images"
            :key="index"
            class="work-container-img-item"
        >
        <!-- router-link でページ遷移 -->
            <RouterLink
                :to="image.to"
                class="link"
                :class="index % 2 === 0 ? 'left-link' : 'right-link'"
            >
            <img
                :ref="(el) => (imagesRef[index] = el)"
                class="work-container-img"
                :class="index % 2 === 0 ? 'left' : 'right'"
                :src="image.src"
                :alt="image.alt"
            />
            </RouterLink>
        </div>

    <div class="price-content">
      <RouterLink class="link price-link" to="/price">
        単価のご相談をされたい方はこちら
      </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

interface ImageData {
  to: string
  src: string
  alt: string
}

const imagesRef = ref<(HTMLImageElement | null)[]>([])

const images: ImageData[] = [
  { to: '/atte', src: '/images/atte-index.png', alt: 'atte' },
  { to: '/rese', src: '/images/rese.png', alt: 'rese' },
  { to: '/furima', src: '/images/furima.png', alt: 'furima' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          el.classList.add('show')
        } else {
          el.classList.remove('show')
        }
      })
    },
    { threshold: 0.4 }
  )

  imagesRef.value.forEach((img) => {
    if (img) observer.observe(img)
  })

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<style scoped>
/* ベース画像 */
.work-container-img {
    opacity: 0;
    transform: translateX(100px);
    transition: all 1s ease;
}

.work-container-img.left {
    transform: translateX(-100px);
}

/* 表示時のアニメーション */
.work-container-img.show {
    opacity: 1;
    transform: translateX(0);
}

/* レイアウト例 */
.work-container-img-all {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
}

.link {
    display: inline-block;
    text-decoration: none;
}

.price-content {
    margin-top: 3rem;
}

.price-link {
    font-size: 1.2rem;
    font-weight: bold;
    color: #00aaff;
}
</style>
