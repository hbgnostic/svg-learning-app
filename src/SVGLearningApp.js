import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import './App.css';

const SVGLearningApp = () => {
  const [x, setX] = useState(90);
  const [y, setY] = useState(10);
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);
  const [color, setColor] = useState('#0000FF');
  const [showCoordinateSystem, setShowCoordinateSystem] = useState(false);
  const [svgSize, setSvgSize] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      setSvgSize(Math.min(window.innerWidth - 40, 400));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (setter) => (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setter(e.target.type === 'number' ? (isNaN(value) ? 0 : Math.max(0, Math.min(value, svgSize))) : value);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto app-container">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Interactive SVG Learning App</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Introduction to SVG</h2>
        <p className="text-sm sm:text-base">SVG (Scalable Vector Graphics) is an XML-based format for vector graphics. SVG images can be scaled up or down without losing quality.</p>
        <p className="text-sm sm:text-base mt-2">The interactivity in this app teaches users how to manipulate basic SVG properties such as position, size, and color of shapes, and understand the SVG coordinate system.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <label className="block mb-2">
            X Position:
            <input
              type="number"
              value={x}
              onChange={handleChange(setX)}
              className="ml-2 p-1 border rounded w-full sm:w-20"
              min="0"
              max={svgSize - width}
            />
          </label>
          <label className="block mb-2">
            Y Position:
            <input
              type="number"
              value={y}
              onChange={handleChange(setY)}
              className="ml-2 p-1 border rounded w-full sm:w-20"
              min="0"
              max={svgSize - height}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="block mb-2">
            Width:
            <input
              type="number"
              value={width}
              onChange={handleChange(setWidth)}
              className="ml-2 p-1 border rounded w-full sm:w-20"
              min="1"
              max={svgSize - x}
            />
          </label>
          <label className="block mb-2">
            Height:
            <input
              type="number"
              value={height}
              onChange={handleChange(setHeight)}
              className="ml-2 p-1 border rounded w-full sm:w-20"
              min="1"
              max={svgSize - y}
            />
          </label>
        </div>
      </div>

      <div className="form-group svg-controls mb-4 flex flex-col sm:flex-row items-center justify-center">
        <label className="flex items-center mb-2 sm:mb-0 sm:mr-4">
          Color:
          <input
            type="color"
            value={color}
            onChange={handleChange(setColor)}
            className="ml-2 p-1 border rounded"
          />
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showCoordinateSystem}
            onChange={() => setShowCoordinateSystem(!showCoordinateSystem)}
            className="mr-2"
          />
          Show Coordinate System
        </label>
      </div>

      <svg width={svgSize} height={svgSize} className="border mb-4 mx-auto">
        <rect width="100%" height="100%" fill="lightgrey" />
        {showCoordinateSystem && (
          <>
            <line x1="0" y1="0" x2={svgSize} y2="0" stroke="black" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2={svgSize} stroke="black" strokeWidth="0.5" />
            <text x={svgSize - 10} y="10" fontSize="10" fill="black">x</text>
            <text x="5" y={svgSize - 10} fontSize="10" fill="black">y</text>
          </>
        )}
        <rect x={x} y={y} width={width} height={height} fill={color} />
      </svg>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center">
          <Info className="mr-2" /> SVG Explanation
        </h2>
        <p className="text-sm sm:text-base">
          The rectangle is positioned at ({x}, {y}) with a width of {width} and a height of {height}.
          Its color is {color}.
        </p>
        <p className="text-sm sm:text-base mt-2">
          In SVGs, the coordinate system starts at the top-left corner (0, 0).
          X increases to the right, and Y increases downwards.
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">SVG Code</h2>
        <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto text-xs sm:text-sm">
          {`<svg width="${svgSize}" height="${svgSize}">
  <rect width="100%" height="100%" fill="lightgrey" />
  <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />
</svg>`}
        </pre>
      </div>
    </div>
  );
};

export default SVGLearningApp;