document.addEventListener("DOMContentLoaded", function() {
  const audioTexts = document.querySelectorAll('.audio-text');
  const progressBars = document.querySelectorAll('.audio-progress');
  const audioTimes = document.querySelectorAll('.audio-time');
  const pauseButtons = document.querySelectorAll('.pause-btn'); // 获取所有暂停按钮

  let currentAudio = null;  // 当前播放的音频
  let currentProgressBar = null;  // 当前播放的进度条
  let currentAudioTime = null;  // 当前音频时间显示
  let isPlaying = false;    // 音频播放状态

  audioTexts.forEach((text, index) => {
    const progressBar = progressBars[index];
    const audioTime = audioTimes[index];
    const pauseButton = pauseButtons[index];  // 获取对应的暂停按钮

    text.addEventListener('click', function() {
      const audioFile = text.getAttribute('data-audio');
      playAudio(audioFile, progressBar, audioTime);
    });

    progressBar.addEventListener('input', function() {
      setAudioProgress(progressBar, index);
    });

    pauseButton.addEventListener('click', function() {
      pauseAudio();
    });
  });

  function playAudio(audioFile, progressBar, audioTime) {
    // 如果有正在播放的音频，暂停它
    if (currentAudio && currentAudio.src !== audioFile) {
      currentAudio.pause();
      resetProgressBar(currentProgressBar, currentAudioTime);
    }

    // 创建新的音频对象
    currentAudio = new Audio(audioFile);
    currentAudio.addEventListener('timeupdate', function() {
      updateProgress(progressBar, audioTime);
    });
    currentAudio.addEventListener('ended', function() {
      onAudioEnd(progressBar, audioTime);
    });

    // 播放音频
    currentAudio.play();
    currentProgressBar = progressBar;
    currentAudioTime = audioTime;
    isPlaying = true;
    progressBar.value = 0;
    audioTime.textContent = '0:00';
  }

  function pauseAudio() {
    if (currentAudio) {
      currentAudio.pause(); // 暂停音频
      isPlaying = false;
    }
  }

  function updateProgress(progressBar, audioTime) {
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.value = progress;

    // 更新音频当前时间显示
    const currentMinutes = Math.floor(currentAudio.currentTime / 60);
    const currentSeconds = Math.floor(currentAudio.currentTime % 60);
    audioTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  }

  function setAudioProgress(progressBar, index) {
    if (currentAudio) {
      const seekTime = (progressBar.value / 100) * currentAudio.duration;
      currentAudio.currentTime = seekTime;
    }
  }

  function onAudioEnd(progressBar, audioTime) {
    isPlaying = false;
    resetProgressBar(progressBar, audioTime);
  }

  function resetProgressBar(progressBar, audioTime) {
    progressBar.value = 0;
    audioTime.textContent = '0:00';
  }
});
