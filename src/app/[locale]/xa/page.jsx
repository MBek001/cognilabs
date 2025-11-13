import React from 'react'
export default function page() {

     const images = [
    "/images/img1.png",
    "/images/img2.png",
    "/images/img3.png",
    "/images/img4.png",
    "/images/img5.png",
  ]; 



  return (
    <div>
      <ThreeDImageRing
        images={images}
        width={400}
        imageDistance={600}
        perspective={1500}
        hoverOpacity={0.3}
        animationDuration={1.2}
        staggerDelay={0.08}
        mobileScaleFactor={0.7}
        backgroundColor="transparent"
      />
    </div>
  )
}
