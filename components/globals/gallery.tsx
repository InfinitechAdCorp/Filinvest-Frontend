"use client";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

import React from "react";
import LightGallery from "lightgallery/react/Lightgallery.es5";
import Thumnail from "lightgallery/plugins/thumbnail";
import Zoom from "lightgallery/plugins/zoom";
import Autoplay from "lightgallery/plugins/autoplay";
import Video from "lightgallery/plugins/video";
import Share from "lightgallery/plugins/share";
import Rotate from "lightgallery/plugins/rotate";

type Props = {
  images: {
    url: string;
    name: string;
  }[];
};

const Gallery = ({ images }: Props) => {
  return (
    <LightGallery
      speed={500}
      plugins={[Thumnail, Zoom, Autoplay, Video, Share, Rotate]}
    >
      {images.map((image, index) => (
        <a key={index} href={image.url}>
          <img src={image.url} alt={image.name} />
        </a>
      ))}
    </LightGallery>
  );
};

export default Gallery;
