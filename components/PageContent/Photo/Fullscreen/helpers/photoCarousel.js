let allPhotos = [];
let currentPhotoIndex = 0;

export default () => ({
  setup(photos, photo) {
    allPhotos = photos;
    currentPhotoIndex = allPhotos.map((x) => x.url).indexOf(photo.url);
  },
  canGoForward() {
    return currentPhotoIndex < allPhotos.length - 1;
  },
  canGoBack() {
    return currentPhotoIndex > 0;
  },
  getNextPhoto() {
    if (!this.canGoForward()) {
      return;
    }
    currentPhotoIndex = currentPhotoIndex + 1;
    return allPhotos[currentPhotoIndex];
  },
  getPrevPhoto() {
    if (!this.canGoBack()) {
      return;
    }
    currentPhotoIndex = currentPhotoIndex - 1;
    return allPhotos[currentPhotoIndex];
  },
});
