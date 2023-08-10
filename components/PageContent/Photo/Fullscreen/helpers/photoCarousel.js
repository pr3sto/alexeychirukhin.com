let allPhotos = [];
let currentPhotoIndex = 0;

export default () => ({
  setup(photos, photo) {
    allPhotos = photos;
    currentPhotoIndex = allPhotos.map((x) => x.url).indexOf(photo.url);
  },
  getCurrentPhoto() {
    return allPhotos[currentPhotoIndex];
  },
  canGoBack() {
    return currentPhotoIndex > 0;
  },
  canGoForward() {
    return currentPhotoIndex < allPhotos.length - 1;
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
