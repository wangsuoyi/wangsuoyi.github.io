document.addEventListener("DOMContentLoaded", function() {
  const audioTexts = document.querySelectorAll('.audio-text');

  // 遍历所有的音频项
  audioTexts.forEach((text, index) => {
      const playPauseBtn = text.closest('.audio-item').querySelector('.play-pause-btn');
      const progressBar = text.closest('.audio-item').querySelector('.audio-progress');
      const audioTime = text.closest('.audio-item').querySelector('.audio-time');
      
      let currentAudio = null;  // 当前音频对象
      let isPlaying = false;    // 播放状态

      text.addEventListener('click', function() {
          const audioFile = text.getAttribute('data-audio');
          playAudio(audioFile);
      });

      playPauseBtn.addEventListener('click', togglePlayPause);
      progressBar.addEventListener('input', setAudioProgress);

      function playAudio(audioFile) {
          // 如果当前音频正在播放，点击同一音频则暂停
          if (currentAudio && currentAudio.src === audioFile) {
              togglePlayPause();
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
          const seekTime = (progressBar.value / 100) * currentAudio.duration;
          currentAudio.currentTime = seekTime;
      }

      function onAudioEnd() {
          isPlaying = false;
          playPauseBtn.textContent = '播放';
          progressBar.value = 0;
          audioTime.textContent = '0:00';
      }
  });
});
