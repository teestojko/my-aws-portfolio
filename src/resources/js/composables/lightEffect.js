import { onMounted, onUnmounted, nextTick } from "vue";

export function useLightEffect() {
    let timeoutId = null;

    const updateLights = () => {
        const lightElements = document.querySelectorAll(".light-effect");

    lightElements.forEach((light) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomScale = Math.random() * 1 + 1;
        const randomOpacity = Math.random() * 0.4 + 0.3;
        const randomHue = Math.floor(Math.random() * 360);
        const randomSaturation = Math.random() * 50 + 50;
        const randomLightness = Math.random() * 30 + 50;
        const randomColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;
        const randomDuration = Math.random() * 3 + 2;

        Object.assign(light.style, {
            top: `${randomY}%`,
            left: `${randomX}%`,
            transform: `scale(${randomScale})`,
            opacity: randomOpacity.toString(),
            background: `radial-gradient(circle, ${randomColor}, transparent)`,
            transition: `all ${randomDuration}s ease-in-out`,
        });
    });

        timeoutId = setTimeout(updateLights, 4000);
    };

    onMounted(async () => {
        await nextTick();
        updateLights();
    });

    onUnmounted(() => {
        if (timeoutId) clearTimeout(timeoutId);
    });
}
