<template>
    <section class="ar-page" :class="{ 'is-ready': arPronto }">
        <button @click="voltarParaLanding" class="btn-voltar">Voltar para a Arena</button>

        <div v-if="arErro" class="ar-erro">{{ arErro }}</div>
        <div v-if="!arErro && !arPronto" class="ar-loader">Iniciando camera...</div>

        <a-scene v-if="arIniciado" embedded class="ar-scene"
            style="position: fixed; inset: 0; width: 100vw; height: 100vh; height: 100svh; display: block; overflow: hidden; background: transparent;"
            renderer="alpha: true; antialias: true; logarithmicDepthBuffer: true;" :arjs="arJsConfig"
            device-orientation-permission-ui="enabled: false" vr-mode-ui="enabled: false" @loaded="arPronto = true">
            <a-assets timeout="20000">
                <a-asset-item id="tree-model" :src="treeModelUrl"></a-asset-item>
            </a-assets>

            <a-nft type="nft" :url="markerUrl" smooth="true" smoothCount="10">
                <a-entity gltf-model="#tree-model" scale="1.5 1.5 1.5" position="0 0 0" rotation="0 0 0"></a-entity>
            </a-nft>

            <a-entity camera></a-entity>
        </a-scene>
    </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';

const arIniciado = ref(false);
const arPronto = ref(false);
const arErro = ref('');
const arJsConfig = ref('trackingMethod: best; sourceType: webcam; debugUIEnabled: false;');
const baseUrl = import.meta.env.BASE_URL;
const markerUrl = `${baseUrl}image/trex`;
const treeModelUrl = `${baseUrl}image/Tree.glb`;
let htmlClasseAnterior = '';
let bodyClasseAnterior = '';
const router = useRouter();

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

    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
        const stream = video.srcObject;
        if (stream && typeof stream.getTracks === 'function') {
            stream.getTracks().forEach((track) => track.stop());
            video.srcObject = null;
        }
        video.pause();
    });

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

    document.documentElement.className = htmlClasseAnterior;
    document.body.className = bodyClasseAnterior;
};

const iniciarAR = async () => {
    arErro.value = '';
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
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false
        });
        stream.getTracks().forEach((track) => track.stop());
        arIniciado.value = true;
    } catch {
        arErro.value = 'Nao foi possivel abrir a camera traseira. Libere a permissao e tente novamente.';
    }
};

const voltarParaLanding = () => {
    encerrarAR();
    router.replace({ name: 'landing' });
};

onMounted(() => {
    htmlClasseAnterior = document.documentElement.className;
    bodyClasseAnterior = document.body.className;

    document.documentElement.classList.add('ar-mode');
    document.body.classList.add('ar-mode');

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    iniciarAR();
});

onBeforeUnmount(() => {
    encerrarAR();
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.classList.remove('ar-mode');
    document.body.classList.remove('ar-mode');
    document.documentElement.className = htmlClasseAnterior;
    document.body.className = bodyClasseAnterior;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
});
</script>

<style scoped>
.ar-page {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    height: 100svh;
    z-index: 9999;
    background: transparent;
    overflow: hidden;
}

.ar-page.is-ready {
    background: transparent;
}

.ar-scene {
    position: fixed;
    inset: 0;
    width: 100vw !important;
    height: 100vh !important;
    height: 100svh !important;
    display: block;
    background: transparent !important;
}

.btn-voltar {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10002;
    padding: 10px 20px;
    background: #ff4444;
    color: #fff;
    border: none;
    font-family: "VT323", monospace;
    font-size: 1.25rem;
    cursor: pointer;
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
:global(.arjs-video) {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100svh !important;
    background: transparent !important;
}

:global(a-scene.ar-scene),
:global(a-scene.ar-scene canvas),
:global(a-scene.ar-scene video) {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100svh !important;
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
    background: transparent !important;
}

:global(video),
:global(#arjs-video),
:global(.arjs-video) {
    object-fit: cover !important;
    transform: scaleX(-1) !important;
    transform-origin: center center !important;
    z-index: 9997 !important;
}

:global(.a-canvas),
:global(canvas) {
    transform: scaleX(-1) !important;
    transform-origin: center center !important;
    z-index: 9998 !important;
}
</style>
