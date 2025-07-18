

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  uploadImage.addEventListener("change", () => {
    const img = document.querySelector("[upload-image-preview]");
    img.src = URL.createObjectURL(uploadImage.files[0]);
  });
}