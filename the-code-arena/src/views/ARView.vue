<template>
    <section class="ar-page" :class="{ 'is-ready': arPronto }">
        <div class="ar-top-controls">
            <button @click="voltarParaLanding" class="btn-voltar">Voltar para a Arena</button>
        </div>

        <div v-if="arErro" class="ar-erro">{{ arErro }}</div>
        <div v-if="!arErro && !arPronto" class="ar-loader">Iniciando camera...</div>

        <a-scene v-if="arIniciado" :key="sceneKey" class="ar-scene"
            style="position: fixed; inset: 0; width: 100vw; height: 100vh; height: 100svh; display: block; overflow: hidden; background: transparent;"
            renderer="alpha: true; antialias: true; logarithmicDepthBuffer: true;" :arjs="arJsConfig" embedded
            device-orientation-permission-ui="enabled: false" vr-mode-ui="enabled: false" @loaded="onSceneLoaded">
            <a-nft type="nft" url="image/trex" smooth="true" smoothCount="10">
                <a-entity gltf-model="image/Tree.glb" scale="5 5 5" position="50 150 -100"
                    rotation="-90 0 0"></a-entity>
            </a-nft>

            <a-entity camera></a-entity>
        </a-scene>
    </section>
</template>

<script setup>
import { nextTick, onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';

const arIniciado = ref(false);
const arPronto = ref(false);
const arErro = ref('');
const arJsConfig = ref('trackingMethod: best; sourceType: webcam; facingMode: environment; debugUIEnabled: false;');
const sceneKey = ref(0);
let htmlClasseAnterior = '';
let bodyClasseAnterior = '';
let appClasseAnterior = '';
const router = useRouter();
let resizeTimeoutId;
let mudouOrientacao = false;

const atualizarViewport = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--app-vh', `${vh}px`);
};

const montarArJsConfig = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    arJsConfig.value = [
        'trackingMethod: best',
        'sourceType: webcam',
        'facingMode: environment',
        `sourceWidth: ${viewportWidth}`,
        `sourceHeight: ${viewportHeight}`,
        `displayWidth: ${viewportWidth}`,
        `displayHeight: ${viewportHeight}`,
        'debugUIEnabled: false'
    ].join('; ') + ';';
};

const encerrarAR = () => {
    arIniciado.value = false;
    arPronto.value = false;

    // Para qualquer stream ainda ligado pelos elementos de video.
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
        const stream = video.srcObject;
        if (stream && typeof stream.getTracks === 'function') {
            stream.getTracks().forEach((track) => track.stop());
            video.srcObject = null;
        }
        video.pause();
    });

    // Remove elementos injetados pelo AR.js para evitar persistencia visual.
    const seletoresAR = [
        'video.arjs-video',
        '#arjs-video',
        'canvas.a-canvas',
        '.a-canvas',
        '.arjs-loader',
        '.a-enter-vr',
        '.a-orientation-modal',
        '.a-loader-title',
        'a-scene[arjs]'
    ];

    seletoresAR.forEach((seletor) => {
        document.querySelectorAll(seletor).forEach((el) => el.remove());
    });

    // Restaura classes globais caso A-Frame/AR.js as tenha alterado.
    document.documentElement.className = htmlClasseAnterior;
    document.body.className = bodyClasseAnterior;
};

const iniciarAR = async () => {
    arErro.value = '';
    arPronto.value = false;
    arIniciado.value = false;
    montarArJsConfig();

    if (!window.isSecureContext) {
        arErro.value = 'Para usar a camera, abra o projeto via localhost (Vite) ou HTTPS.';
        return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
        arErro.value = 'Seu navegador nao suporta acesso a camera.';
        return;
    }

    try {
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { exact: 'environment' },
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });
        } catch {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: 'environment' } },
                audio: false
            });
        }
        stream.getTracks().forEach((track) => track.stop());

        sceneKey.value += 1;
        await nextTick();
        arIniciado.value = true;

        requestAnimationFrame(() => {
            window.dispatchEvent(new Event('resize'));
        });
    } catch {
        arErro.value = 'Permissao da camera bloqueada. Libere a camera nas configuracoes do navegador.';
    }
};

const onSceneLoaded = (event) => {
    const renderer = event.target?.renderer;
    if (renderer?.setClearColor) {
        renderer.setClearColor(0x000000, 0);
    }
    arPronto.value = true;
};

const tratarMudancaDeOrientacao = () => {
    if (mudouOrientacao) return;
    mudouOrientacao = true;
    atualizarViewport();

    if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId);
    }

    resizeTimeoutId = window.setTimeout(() => {
        iniciarAR();
        mudouOrientacao = false;
    }, 250);
};

const voltarParaLanding = () => {
    encerrarAR();
    router.replace({ name: 'landing' });
};

onMounted(() => {
    htmlClasseAnterior = document.documentElement.className;
    bodyClasseAnterior = document.body.className;
    appClasseAnterior = document.getElementById('app')?.className || '';

    document.documentElement.classList.add('ar-mode');
    document.body.classList.add('ar-mode');
    document.getElementById('app')?.classList.add('ar-mode');

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    atualizarViewport();
    window.addEventListener('resize', atualizarViewport, { passive: true });
    window.addEventListener('orientationchange', tratarMudancaDeOrientacao, { passive: true });

    iniciarAR();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', atualizarViewport);
    window.removeEventListener('orientationchange', tratarMudancaDeOrientacao);
    if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId);
    }

    encerrarAR();
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.classList.remove('ar-mode');
    document.body.classList.remove('ar-mode');
    document.getElementById('app')?.classList.remove('ar-mode');
    document.documentElement.className = htmlClasseAnterior;
    document.body.className = bodyClasseAnterior;
    if (document.getElementById('app')) {
        document.getElementById('app').className = appClasseAnterior;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
});
</script>

<style scoped>
.ar-page {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    height: 100svh;
    z-index: 9999;
    background: #000;
    overflow: hidden;
    min-height: calc(var(--app-vh, 1vh) * 100);
}

.ar-page.is-ready {
    background: transparent;
}

.ar-scene {
    position: fixed;
    inset: 0;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    height: 100svh !important;
    display: block;
    background: transparent !important;
}

.btn-voltar {
    z-index: 10003;
    padding: 10px 20px;
    background: #ff4444;
    color: #fff;
    border: none;
    font-family: "VT323", monospace;
    font-size: 1.25rem;
    cursor: pointer;
}

.ar-top-controls {
    position: fixed;
    top: max(12px, env(safe-area-inset-top));
    left: 50%;
    transform: translateX(-50%);
    z-index: 10003;
    width: min(92vw, 340px);
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(6px);
}

.ar-loader {
    position: fixed;
    inset: 0;
    z-index: 10001;
    display: grid;
    place-items: center;
    color: #fff;
    font-family: "VT323", monospace;
    font-size: 1.35rem;
    background: rgba(0, 0, 0, 0.7);
}

.ar-erro {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10001;
    color: #ff8080;
    text-align: center;
    font-size: 1.1rem;
    max-width: min(90vw, 560px);
}

:global(video),
:global(#arjs-video),
:global(.a-canvas),
:global(canvas),
:global(.a-canvas-container),
:global(.arjs-video) {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    height: 100svh !important;
    min-width: 100vw !important;
    min-height: 100vh !important;
    min-height: 100dvh !important;
    background: transparent !important;
}

:global(a-scene.ar-scene),
:global(a-scene),
:global(a-scene .a-canvas),
:global(a-scene.ar-scene canvas),
:global(a-scene.ar-scene video) {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    height: 100svh !important;
    min-width: 100vw !important;
    min-height: 100vh !important;
    min-height: 100dvh !important;
    background: transparent !important;
}

:global(html.ar-mode),
:global(body.ar-mode),
:global(#app.ar-mode) {
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    margin: 0 !important;
    overflow: hidden !important;
    background: #000 !important;
}

:global(video),
:global(#arjs-video),
:global(.arjs-video) {
    object-fit: cover !important;
    object-position: center center !important;
    transform-origin: center center !important;
    z-index: 9997 !important;
}

:global(html.ar-mode video),
:global(html.ar-mode #arjs-video),
:global(html.ar-mode .arjs-video) {
    transform: scaleX(1) !important;
}

:global(.a-canvas),
:global(canvas) {
    transform: scaleX(1) !important;
    transform-origin: center center !important;
    z-index: 9998 !important;
    background: transparent !important;
}

@media (max-width: 640px) {
    .btn-voltar {
        width: 100%;
        font-size: 1rem;
    }
}
</style>
