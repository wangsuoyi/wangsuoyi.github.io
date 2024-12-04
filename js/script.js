document.addEventListener("DOMContentLoaded", function() {
  const audioText = document.querySelector('.audio-text');
  const progressBar = document.querySelector('.audio-progress');
  const audioTime = document.querySelector('.audio-time');
  const playPauseBtn = document.querySelector('.play-pause-btn'); // 获取播放/暂停按钮

  let currentAudio = null; // 当前播放的音频
  let isPlaying = false;   // 音频播放状态

  audioText.addEventListener('click', function() {
    const audioFile = audioText.getAttribute('data-audio');
    togglePlayPause(audioFile);  // 切换播放/暂停
  });

  progressBar.addEventListener('input', function() {
    setAudioProgress(progressBar);
  });

  playPauseBtn.addEventListener('click', function() {
    if (isPlaying) {
      pauseAudio();
    } else {
      const audioFile = audioText.getAttribute('data-audio');
      playAudio(audioFile);
    }
  });

  function playAudio(audioFile) {
    // 如果有正在播放的音频，暂停它
    if (currentAudio && currentAudio.src !== audioFile) {
      currentAudio.pause();
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
    isPlaying = true;
    playPauseBtn.textContent = '暂停'; // 更新按钮文本为“暂停”
    progressBar.value = 0;
    audioTime.textContent = '0:00';
  }

  function pauseAudio() {
    if (currentAudio) {
      currentAudio.pause(); // 暂停音频
      isPlaying = false;
      playPauseBtn.textContent = '播放'; // 更新按钮文本为“播放”
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

  function setAudioProgress(progressBar) {
    if (currentAudio) {
      const seekTime = (progressBar.value / 100) * currentAudio.duration;
      currentAudio.currentTime = seekTime;
    }
  }

  function onAudioEnd(progressBar, audioTime) {
    isPlaying = false;
    playPauseBtn.textContent = '播放'; // 更新按钮文本为“播放”
    resetProgressBar(progressBar, audioTime);
  }

  function resetProgressBar(progressBar, audioTime) {
    progressBar.value = 0;
    audioTime.textContent = '0:00';
  }
});
