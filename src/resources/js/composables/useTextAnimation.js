import { ref, onMounted } from "vue";

export function useTextAnimation(initialText, targetText, delay = 4000, speed = 100) {
    const text = ref("");
    const index = ref(0);

    onMounted(() => {
        // 初期テキストのアニメーション
        const initialInterval = setInterval(() => {
            if (index.value < initialText.length) {
                index.value++;
                text.value = initialText.slice(0, index.value);
            } else {
                clearInterval(initialInterval);
            }
        }, 100);

    // 初期テキスト表示後にターゲットテキストのアニメーション
        const timeout = setTimeout(() => {
            const targetInterval = setInterval(() => {
                if (index.value < initialText.length + targetText.length) {
                    index.value++;
                    text.value = targetText.slice(0, index.value - initialText.length);
                } else {
                    clearInterval(targetInterval);
                }
            }, speed);
        }, delay);

        // クリーンアップ関数（必要に応じて）
        onUnmounted(() => {
            clearInterval(initialInterval);
            clearTimeout(timeout);
        });
    });

    return text;
}
