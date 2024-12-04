// script.js
document.addEventListener("DOMContentLoaded", function () {
  const textElements = document.querySelectorAll('.text');
  const audioPlayer = document.getElementById('audioPlayer');
  const audioSource = document.getElementById('audioSource');

  textElements.forEach(element => {
      element.addEventListener('click', function () {
          const audioFile = element.getAttribute('data-audio');
          audioSource.src = audioFile;
          audioPlayer.load();
          audioPlayer.play();
      });
  });
});
