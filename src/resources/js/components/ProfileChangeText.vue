<template>
    <p ref="textRef" class="profile-detail">
    <span
        v-for="(text, index) in profileTexts"
        :key="index"
        :class="['fade-in-text', { visible: isVisible }]"
        :style="{
            display: 'block',
            transitionDelay: `${index * 3}s`,
            marginBottom: index === 2 ? '3rem' : '0',
        }"
    >
        {{ text }}
    </span>
    </p>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)
const textRef = ref<HTMLElement | null>(null)

const profileTexts = [
    'プログラミングスクールで培った確かなスキルを活かし、現在フルスタックエンジニアとして活動中です。',
    'バックエンドのPHP・Laravelから、フロントエンドのReact・TypeScriptまで幅広く対応可能です。',
    'また、Docker・Git・MySQL・AWS を駆使した開発環境の構築やデプロイにも精通しています。',
    '✨アイデアを形にするお手伝いをいたします✨',
    '💻 webエンジニア 岸 哲也',
]

onMounted(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                isVisible.value = true
            }
        },
        { threshold: 0.5 }
    )

    if (textRef.value) {
        observer.observe(textRef.value)
    }

    onBeforeUnmount(() => {
        if (textRef.value) observer.unobserve(textRef.value)
    })
})
</script>

<style scoped>
.fade-in-text {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 1s ease, transform 1s ease;
}

.fade-in-text.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
