// 获取所有文段
const textItems = document.querySelectorAll('.text-item');
let currentAudio = null;
let currentProgressBar = null;
let isPlaying = false;
let audio = new Audio(); // 使用 HTML5 Audio API

// 播放音频的函数
function playAudio(src, progressBar) {
    // 如果已经在播放，暂停当前音频
    if (isPlaying && currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        return;
    }

    // 设置当前音频
    audio.src = src;
    audio.play();
    isPlaying = true;
    currentAudio = audio;
    currentProgressBar = progressBar;

    // 更新进度条
    audio.ontimeupdate = function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    };

    // 音频播放结束
    audio.onended = function() {
        isPlaying = false;
        currentProgressBar.value = 100;
    };
}

// 处理进度条的拖动
function handleProgressBarDrag(event) {
    const progressBar = event.target;
    const newTime = (event.offsetX / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = newTime;
}

// 给每个文段添加点击事件
textItems.forEach(item => {
    const progressBar = item.querySelector('.progress-bar');
    const audioSrc = item.getAttribute('data-audio');
    
    item.addEventListener('click', () => {
        playAudio(audioSrc, progressBar);
    });

    // 添加拖动进度条的事件
    progressBar.addEventListener('mousedown', (event) => {
        document.addEventListener('mousemove', handleProgressBarDrag);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleProgressBarDrag);
        });
    });
});
