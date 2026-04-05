<template>
    <section class="ar-page" :class="{ 'is-ready': arPronto }">
        <button @click="voltarParaLanding" class="btn-voltar">Voltar para a Arena</button>

        <div v-if="arErro" class="ar-erro">{{ arErro }}</div>
        <div v-if="!arErro && !arPronto" class="ar-loader">Iniciando camera...</div>

        <a-scene v-if="arIniciado" embedded style="position: fixed; inset: 0;" renderer="logarithmicDepthBuffer: true;"
            arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;" vr-mode-ui="enabled: false"
            @loaded="arPronto = true">
            <a-nft type="nft" url="image/trex" smooth="true" smoothCount="10">
                <a-entity gltf-model="image/Tree.glb" scale="5 5 5" position="50 150 -100"
                    rotation="-90 0 0"></a-entity>
            </a-nft>

            <a-entity camera></a-entity>
        </a-scene>
    </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const arIniciado = ref(false);
const arPronto = ref(false);
const arErro = ref('');
let htmlClasseAnterior = '';
let bodyClasseAnterior = '';
let arEncerrado = false;

const encerrarAR = () => {
    if (arEncerrado) return;
    arEncerrado = true;

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

    if (!window.isSecureContext) {
        arErro.value = 'Para usar a camera, abra o projeto via localhost (Vite) ou HTTPS.';
        return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
        arErro.value = 'Seu navegador nao suporta acesso a camera.';
        return;
    }

    try {
        // Tenta camera frontal para comportamento de espelho; se falhar, usa camera padrao.
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            });
        } catch {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        }
        stream.getTracks().forEach((track) => track.stop());

        arIniciado.value = true;
    } catch {
        arErro.value = 'Permissao da camera bloqueada. Libere a camera nas configuracoes do navegador.';
    }
};

const voltarParaLanding = () => {
    encerrarAR();
    // AR.js altera estado global do documento. Recarregar a landing evita layout preso.
    window.location.assign('/');
};

onMounted(() => {
    htmlClasseAnterior = document.documentElement.className;
    bodyClasseAnterior = document.body.className;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    iniciarAR();
});

onBeforeUnmount(() => {
    encerrarAR();
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
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
    background: #000;
}

.ar-page.is-ready {
    background: transparent;
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

:global(video.arjs-video),
:global(#arjs-video),
:global(.a-canvas),
:global(canvas.a-canvas) {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100svh !important;
}

:global(video.arjs-video),
:global(#arjs-video) {
    object-fit: cover !important;
    transform: scaleX(-1) !important;
    transform-origin: center center !important;
    z-index: 9997 !important;
}

:global(.a-canvas),
:global(canvas.a-canvas) {
    transform: scaleX(-1) !important;
    transform-origin: center center !important;
    z-index: 9998 !important;
}
</style>
