// 获取DOM元素
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const audioText = document.getElementById("audioText");
const audioButtons = document.querySelectorAll(".audio-segment-btn");
let isPlaying = false;
let audio = new Audio();

// 音频文件和段落
const audioFiles = [
    { url: "audio1.mp3", text: "段落 1 的文本内容" },
    { url: "audio/audio2.mp3", text: "段落 2 的文本内容" },
    { url: "audio3.mp3", text: "段落 3 的文本内容" }
];

// 播放或暂停音频
playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = "播放";
    } else {
        audio.play();
        playPauseBtn.textContent = "暂停";
    }
    isPlaying = !isPlaying;
});

// 音频进度更新
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// 拖拽进度条
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// 播放音频段落
audioButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        // 更新参考文本
        audioText.value = audioFiles[index].text;

        // 停止当前音频并播放新的
        if (audio.src !== audioFiles[index].url) {
            audio.src = audioFiles[index].url;
            audio.play();
            playPauseBtn.textContent = "暂停";
            isPlaying = true;
        } else if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "暂停";
            isPlaying = true;
        } else {
            audio.pause();
            playPauseBtn.textContent = "播放";
            isPlaying = false;
        }
    });
});
