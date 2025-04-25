"use client";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

import React from "react";
import LightGallery from "lightgallery/react/Lightgallery.es5";
import lgThumnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgVideo from "lightgallery/plugins/video";
import lgShare from "lightgallery/plugins/share";
import lgRotate from "lightgallery/plugins/rotate";

const Page = () => {
  return (
    <LightGallery
      speed={500}
      plugins={[lgThumnail, lgZoom, lgAutoplay, lgVideo, lgShare, lgRotate]}
    >
      <a href="/images/logo.png">
        <img src="/images/logo.png" alt="test" />
      </a>
    </LightGallery>
  );
};

export default Page;
