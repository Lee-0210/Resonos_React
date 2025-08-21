import React, { useState, useRef, useEffect } from "react";

const ExpandableText = ({ children, maxLines = 3 }) => {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  // 줄임표가 필요한지 판단
  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [children]);

  return (
    <div>
      <div
        ref={textRef}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "none" : maxLines,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "normal",
        }}
      >
        {children}
      </div>

      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-outline-gold btn-xs"
        >
          {expanded ? "줄이기" : "더보기"}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
