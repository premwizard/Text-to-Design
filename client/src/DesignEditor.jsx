import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const DesignEditor = ({ data }) => {
  if (!data) return null;

  const {
    layout = "headline-center",
    bgColor = "#fff",
    textColor = "#000",
    font = "Arial",
    content = "Generated Design"
  } = data;

  // Canvas dimensions
  const width = 800;
  const height = 400;

  // Layout logic
  const x = layout === "left-text" ? 50 : width / 2;
  const align = layout === "left-text" ? "left" : "center";

  return (
    <div style={{ border: '1px solid #ccc', marginTop: '20px' }}>
      <Stage width={width} height={height}>
        <Layer>
          {/* Background */}
          <Rect width={width} height={height} fill={bgColor} />

          {/* Text */}
          <Text
            text={content}
            x={layout === "left-text" ? 50 : 100}
            y={150}
            width={layout === "left-text" ? width - 100 : width - 200}
            fontSize={32}
            fill={textColor}
            fontFamily={font}
            align={align}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default DesignEditor;
