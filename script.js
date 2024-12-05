document.addEventListener('DOMContentLoaded', () => {
    // 确保页面加载完成后，所有音频开始加载
    document.querySelectorAll('.audio').forEach(audio => {
      audio.preload = 'auto';  // 确保音频设置为预加载
      audio.load();            // 强制开始加载音频文件
    });
  
    document.querySelectorAll('.play-pause-btn').forEach((button, index) => {
      const audio = document.querySelectorAll('.audio')[index];
      const progressBar = document.querySelectorAll('.progress-bar')[index];
  
      button.addEventListener('click', () => {
          if (audio.paused) {
              audio.play();
              button.textContent = '暂停';
          } else {
              audio.pause();
              button.textContent = '播放';
          }
      });
  
      audio.addEventListener('timeupdate', () => {
          const progress = (audio.currentTime / audio.duration) * 100;
          progressBar.value = progress;
      });
  
      progressBar.addEventListener('input', () => {
          const newTime = (progressBar.value / 100) * audio.duration;
          audio.currentTime = newTime;
      });
    });
  });
  