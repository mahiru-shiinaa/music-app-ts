

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  uploadImage.addEventListener("change", () => {
    const img = document.querySelector("[upload-image-preview]");
    img.src = URL.createObjectURL(uploadImage.files[0]);
  });
}
// Upload Audio
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio) {
  uploadAudio.addEventListener("change", () => {
    const audio = document.querySelector("[upload-audio-play]");
    audio.src = URL.createObjectURL(uploadAudio.files[0]);
  });
}