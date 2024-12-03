function playAudio(audioId) {
    // 停止其他音频播放
    let audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0; // 重置播放时间
        }
    });

    // 播放选中的音频
    let audio = document.getElementById(audioId);
    if (audio) {
        audio.play();
    }
}
