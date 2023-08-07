let allPhotoUrls = [];
let currentPhotoIndex = 0;

export default () => ({
  setup(photoUrls, photoUrl) {
    allPhotoUrls = photoUrls;
    currentPhotoIndex = photoUrls.indexOf(photoUrl);
  },
  getCurrentPhoto() {
    return allPhotoUrls[currentPhotoIndex];
  },
  canGoBack() {
    return currentPhotoIndex > 0;
  },
  canGoForward() {
    return currentPhotoIndex < allPhotoUrls.length - 1;
  },
  goToPrevPhoto() {
    if (!this.canGoBack()) {
      return;
    }
    currentPhotoIndex = currentPhotoIndex - 1;
  },
  goToNextPhoto() {
    if (!this.canGoForward()) {
      return;
    }
    currentPhotoIndex = currentPhotoIndex + 1;
  },
});
