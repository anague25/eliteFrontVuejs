<template>
    <div class="video-player-container">
        <video ref="videoPlayer" class="video-js vjs-default-skin" controls preload="auto" controlsList="nodownload"
            disablePictureInPicture oncontextmenu="return false">
            <source :src="$baseUrlVideo + '/video/' + videoUrl" />
        </video>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';





// Props
const props = defineProps({
    videoUrl: {
        type: String,
        required: true,
    },
});

// Refs
const videoPlayer = ref(null);
let player = null;

// Initialisation du player
const initializePlayer = () => {
    nextTick(() => {
        if (videoPlayer.value) {
            player = videojs(videoPlayer.value, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                responsive: true,
                controlBar: {
                    playToggle: true,
                    volumePanel: {
                        inline: false,
                    },
                    currentTimeDisplay: true,
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: true,
                    progressControl: true,
                    playbackRateMenuButton: true,
                    fullscreenToggle: true,
                },
            });


        }
    });
};

// Gère le changement de vidéo
// watch(() => props.videoUrl, (newUrl) => {
//     console.log('Changement vidéo détecté', newUrl, player?.src());
//     if (player && player.src() !== newUrl) {
//         player.src({ src: newUrl });
//         player.play();
//     }
// });

watch(() => props.videoUrl, (newUrl) => {
    if (player && newUrl) {
        player.pause();
        player.src({ type: 'video/mp4', src: newUrl });
        player.load();
        player.play();
    }
});







// Lifecycle
onMounted(() => {
    initializePlayer();
});

onBeforeUnmount(() => {
    if (player) {
        player.dispose();
    }
});
</script>

<style scoped>
.video-player-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 0;
    padding-top: 56.25%;
    /* 16:9 */
    margin: 0 auto;
    overflow: hidden;
}

.video-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.video-js .vjs-control-bar {
    font-size: 14px;
}

.video-js .vjs-volume-panel {
    width: auto;
}

.video-js.vjs-playing .vjs-big-play-button {
    display: none;
}
</style>