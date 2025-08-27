import React, { useEffect } from 'react';

const BandsintownWidget = ({ artistName }) => {
  useEffect(() => {
    if (!artistName) return;

    // 이미 로드되어 있으면 init만
    if (window.Bandsintown) {
      window.Bandsintown.init();
      return;
    }

    // 스크립트 없으면 추가
    const script = document.createElement('script');
    script.src = 'https://widgetv3.bandsintown.com/main.min.js';
    script.async = true;
    script.onload = () => {
      window.Bandsintown.init();
    };
    document.body.appendChild(script);

    // cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [artistName]);

  if (!artistName) return null;

  return (
    <div
      className="bit-widget-initializer"
      data-artist-name={artistName}
      data-text-color="#FFF"
      data-background-color="transparent"
      data-display-local-dates="true"
      data-auto-style="true"
      data-separator-color="#DDDDDD"
      data-link-color="#1DB954"
      data-display-limit="3"
      data-display-lineup="false"
      data-display-play-my-city="false"
    ></div>
  );
};

export default BandsintownWidget;
