"use client";

import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

import Autoplay from "lightgallery/plugins/autoplay";
import Rotate from "lightgallery/plugins/rotate";
import Share from "lightgallery/plugins/share";
import Thumnail from "lightgallery/plugins/thumbnail";
import Video from "lightgallery/plugins/video";
import Zoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react/Lightgallery.es5";

type Props = {
  images: {
    url: string;
    name: string;
  }[];
  className?: string;
};

const Gallery = ({ images, className }: Props) => {
  return (
    <LightGallery
      speed={500}
      plugins={[Thumnail, Zoom, Autoplay, Video, Share, Rotate]}
    >
      {images.map((image, index) => (
        <a key={index} href={image.url}>
          <img src={image.url} alt={image.name} className={className} />
        </a>
      ))}
    </LightGallery>
  );
};

export default Gallery;
