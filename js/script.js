document.addEventListener("DOMContentLoaded", function() {
    const audioTexts = document.querySelectorAll('.audio-text');
    
    audioTexts.forEach(text => {
      text.addEventListener('click', function() {
        const audioFile = text.getAttribute('data-audio');
        playAudio(audioFile);
      });
    });
  
    function playAudio(audioFile) {
      const audio = new Audio(audioFile);
      audio.play();
    }
  });
  