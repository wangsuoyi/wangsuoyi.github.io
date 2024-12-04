document.addEventListener("DOMContentLoaded", function() {
  const audioTexts = document.querySelectorAll('.audio-text');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const progressBar = document.getElementById('audio-progress');
  const audioTime = document.getElementById('audio-time');

  let currentAudio = null;  // 当前播放的音频
  let isPlaying = false;    // 音频播放状态

  audioTexts.forEach(text => {
    text.addEventListener('click', function() {
      const audioFile = text.getAttribute('data-audio');
      playAudio(audioFile);
    });
  });

  playPauseBtn.addEventListener('click', togglePlayPause);
  progressBar.addEventListener('input', setAudioProgress);

  function playAudio(audioFile) {
    if (currentAudio && currentAudio.src === audioFile) {
      togglePlayPause();  // 如果点击同一音频则切换播放/暂停
      return;
    }

    // 如果有正在播放的音频，先暂停
    if (currentAudio) {
      currentAudio.pause();
    }

    // 创建新的音频对象
    currentAudio = new Audio(audioFile);
    currentAudio.addEventListener('timeupdate', updateProgress);
    currentAudio.addEventListener('ended', onAudioEnd);

    // 播放音频
    currentAudio.play();
    isPlaying = true;
    playPauseBtn.textContent = '暂停';
  }

  function togglePlayPause() {
    if (isPlaying) {
      currentAudio.pause();
      playPauseBtn.textContent = '播放';
    } else {
      currentAudio.play();
      playPauseBtn.textContent = '暂停';
    }
    isPlaying = !isPlaying;
  }

  function updateProgress() {
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.value = progress;

    // 更新音频当前时间显示
    const currentMinutes = Math.floor(currentAudio.currentTime / 60);
    const currentSeconds = Math.floor(currentAudio.currentTime % 60);
    audioTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  }

  function setAudioProgress() {
    if (currentAudio) {
      const seekTime = (progressBar.value / 100) * currentAudio.duration;
      currentAudio.currentTime = seekTime;
    }
  }

  function onAudioEnd() {
    isPlaying = false;
    playPauseBtn.textContent = '播放';
    progressBar.value = 0;
    audioTime.textContent = '0:00';
  }
});
