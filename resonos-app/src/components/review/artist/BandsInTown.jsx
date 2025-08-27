import React, { useEffect, useState } from 'react';
import TextPressure from '../../../assets/TextPressure';

const BandsintownWidget = ({ artistName }) => {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!artistName) {
      return;
    }

    const scriptId = 'bandsintown-widget-script';

    // 1. 스크립트가 이미 로드되었는지 확인
    if (window.Bandsintown) {
      window.Bandsintown.init();
      setIsReady(true);
      return;
    }

    // 2. 스크립트가 없으면 동적으로 스크립트 추가
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://widgetv3.bandsintown.com/main.min.js";
      script.async = true;

      // 3. 스크립트 로드 완료 시 위젯 초기화
      script.onload = () => setIsReady(true);
      document.body.appendChild(script);
    } else {
      setIsReady(true);
    }
  }, [artistName]);
  useEffect(() => {
    if (isReady && window.Bandsintown) {
      window.Bandsintown.init();
    }
  }, [isReady, artistName]);


  return (
    <>
      {!isReady ? (
        <div style={{ height: '160px' }}>
          <TextPressure
            text="LOADING...!"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
          />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default BandsintownWidget;