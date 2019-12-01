import React, { useState, useRef, useEffect } from 'react';

// Should be faded out 50%
const MobileHeroImage = ({ image, setShow, show, indicatorColor }) => {
  const wrapperRef = useRef();
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="mobile-hero-image-container" style={{ overflow: "hidden" }} >
      <style>{`
        .mobile-hero-image-container {
          margin-top: -367px;
          height: 667px;
        }
        .hero-image--mobile {
          transform: translate(0px, 367px);
          transition: 0.3s transform;
        }
        .hero-image--mobile__show {
          transform: translate(0px, 50px) scale(0.8);
          transition: 0.3s transform;
        }
        @media only screen and (max-width: 974px) {
          .mobile-hero-image-container {
            margin-right: 0px;
          }
        }
        @media only screen and (min-width: 974px) {
          .mobile-hero-image-container {
            margin-right: 50px;
          }
          .hero-image--mobile {
            width: 375px;
          }
        }
      `}</style>
      <div ref={wrapperRef} className={ `hero-image--mobile ${show ? "hero-image--mobile__show" : ""}` } style={{ backgroundSize: "cover", maxWidth: 375, borderRadius: "20px" }}>
        <img src={image} style={{ width: "100%" }} />
        <div onClick={() => setShow(!show)} style={{ cursor: "pointer"}} ><Circle indicatorColor={indicatorColor} /></div>
      </div>
    </div>
  )
}

const DesktopHeroImage = ({ image }) =>
<div style={{ background: `url(${image})`, backgroundSize: "cover", height: "50vw", maxHeight: 720, maxWidth: 1280, margin: "auto", borderRadius: "20px 20px 0 0", }}>
  <div style={{width: "100%"}}/>
</div>

const DesktopContent = ({ image, Action }) =>
<React.Fragment>
  <div style={{ flex: 1, height: 200, marginBottom: 50 }}>
    <Action />
  </div>
  <div style={{ flex: 1 }}>
    { image && <DesktopHeroImage image={image} /> }
  </div>
</React.Fragment>

const MobileContent = ({ image, setShow, show, Action, indicatorColor }) =>
<React.Fragment>
  <style>{`
  .mail-list--mobile {
    flex: 1;
    max-width: 375px;
    height: 200px;
    transition: filter 0.3s;
    min-width: 355px;
  }
  .section-container--content {
    width: fit-content;
  }
  @media only screen and (max-width: 974px) {
    .mail-list--mobile__right {
      display: none;
      text-align: left;
    }
  }
  @media only screen and (min-width: 974px) {
    .mail-list--mobile__top {
      display: none;
      text-align: center;
    }
  }
  `}</style>
  <div className="mail-list--mobile mail-list--mobile__top" style={{ marginBottom: 50, filter: show ? "blur(5px)" : ""}}>
    <Action />
  </div>
  <div style={{ flex: 1 }}>
    { image && <MobileHeroImage image={image} show={show} setShow={setShow} indicatorColor={indicatorColor} /> }
  </div>
  <div className="mail-list--mobile mail-list--mobile__right" style={{ marginBottom: 100, filter: show ? "blur(5px)" : "" }}>
    <Action />
  </div>
</React.Fragment>

const Hero = ({ isMobile, title, image, Action, indicatorColor }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="section" style={{ minHeight: "inherit" }}>
    <style>{`
      @media only screen and (max-width: 974px) {
        .section-container--content {
          text-align: center;
        }
      }
      @media only screen and (min-width: 974px) {
        .section-container--content {
          display: flex;
        }
      }
    `}</style>
      <div className={`section-container`}>
        <div className="title-container" style={{ filter: show ? "blur(5px)" : "", transition: "filter 0.3s"}}>
          <h2>{title}</h2>
        </div>
        <div className="section-container--content" style={isMobile ? { margin: "auto" } : {display: "block"}}>
          { isMobile ? <MobileContent image={image} show={show} setShow={setShow} Action={Action} indicatorColor={indicatorColor} /> : <DesktopContent image={image} Action={Action} />}
        </div>
      </div>
    </div>
  )
}
export default Hero


const Circle = ({ indicatorColor }) =>
<div>
  <style>{`
    @keyframes pulse {
      0% {
        transform: scale(1.5);
        opacity: 0.5; }

      50% {
        transform: scale(1.67);
        opacity: 0.5; }

      100% {
        transform: scale(1.5);
        opacity: 0.5; }
    }
    .circle-base {
      position: absolute;
      left: 20px;
      top: 20px;
      width: 15px;
      height: 15px;
      border-radius: 80px;
      z-index: 1000;
      opacity: 1;
    }
    .animated-circle {
      background: ${indicatorColor};
      -webkit-transform: scale(0.8);
      -webkit-animation: pulse 1s ease-in-out infinite;
      animation: pulse 1s ease-in-out infinite;
    }
    .top-circle {
      background: ${indicatorColor};
    }
  `}
  </style>
  <div className="circle-base animated-circle"/>
  <div className="circle-base top-circle"/>
</div>
