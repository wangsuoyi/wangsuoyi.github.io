// Toggle play/pause for each audio element
function toggleAudio(audioIndex) {
  const audio = document.getElementById(`audio-${audioIndex}`);
  const playPauseBtn = document.getElementById(`play-pause-btn-${audioIndex}`);
  const progressBar = document.getElementById(`progress-${audioIndex}`);

  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "Pause";
  } else {
    audio.pause();
    playPauseBtn.textContent = "Play";
  }

  // Update progress bar when audio is playing
  audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    const currentTimeText = formatTime(audio.currentTime);
    document.getElementById(`current-time-${audioIndex}`).textContent = currentTimeText;
  });
}

// Update audio progress when the user drags the progress bar
function updateProgress(audioIndex) {
  const audio = document.getElementById(`audio-${audioIndex}`);
  const progressBar = document.getElementById(`progress-${audioIndex}`);
  const newTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newTime;
}

// Format time in minutes:seconds (e.g., 1:23)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
