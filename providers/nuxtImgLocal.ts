import { ProviderGetImage } from "@nuxt/image";

export const getImage: ProviderGetImage = (src: string) => {
  return {
    url: `${window.location.origin}/local${src}`,
  };
};
