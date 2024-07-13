import React, { useState } from 'react';
import { Info } from 'lucide-react';
import './App.css'; // Ensure CSS is imported

const SVGLearningApp = () => {
  const [x, setX] = useState(90);
  const [y, setY] = useState(10);
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(20);
  const [color, setColor] = useState('#0000FF');
  const [showCoordinateSystem, setShowCoordinateSystem] = useState(false);

  const handleChange = (setter) => (e) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setter(e.target.type === 'number' ? (isNaN(value) ? 0 : Math.max(0, Math.min(value, 200))) : value);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto app-container">
      <h1 className="text-2xl font-bold mb-4">Interactive SVG Learning App</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Introduction to SVG</h2>
        <p>SVG (Scalable Vector Graphics) is an XML-based format for vector graphics. SVG images can be scaled up or down without losing quality.</p><p> The interactivity in this app teaches users how to manipulate basic SVG properties such as position, size, and color of shapes, and understand the SVG coordinate system.</p>
      </div>

      <div className="form-group">
        <div className="label-group">
          <label>
            X Position:
            <input
              type="number"
              value={x}
              onChange={handleChange(setX)}
              className="ml-2 p-1 border rounded w-16"
              min="0"
              max="180"
            />
          </label>
          <label>
            Y Position:
            <input
              type="number"
              value={y}
              onChange={handleChange(setY)}
              className="ml-2 p-1 border rounded w-16"
              min="0"
              max="180"
            />
          </label>
        </div>
      </div>

      <div className="form-group">
        <div className="label-group">
          <label>
            Width:
            <input
              type="number"
              value={width}
              onChange={handleChange(setWidth)}
              className="ml-2 p-1 border rounded w-16"
              min="1"
              max="200"
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleChange(setHeight)}
              className="ml-2 p-1 border rounded w-16"
              min="1"
              max="200"
            />
          </label>
        </div>
      </div>

      <div className="form-group svg-controls">
        <label>
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

      <svg width="200" height="200" className="border mb-4">
        <rect width="100%" height="100%" fill="lightgrey" />
        {showCoordinateSystem && (
          <>
            <line x1="0" y1="0" x2="200" y2="0" stroke="black" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="200" stroke="black" strokeWidth="0.5" />
            <text x="190" y="10" fontSize="10">x</text>
            <text x="5" y="190" fontSize="10">y</text>
          </>
        )}
        <rect x={x} y={y} width={width} height={height} fill={color} />
      </svg>

      <div className="bg-blue-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Info className="mr-2" /> SVG Explanation
        </h2>
        <p>
          The rectangle is positioned at ({x}, {y}) with a width of {width} and a height of {height}.
          Its color is {color}.
        </p>
        <p className="mt-2">
          In SVGs, the coordinate system starts at the top-left corner (0, 0).
          X increases to the right, and Y increases downwards.
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">SVG Code</h2>
        <pre className="bg-gray-800 text-white p-2 rounded overflow-x-auto">
          {`<svg width="200" height="200">
  <rect width="100%" height="100%" fill="lightgrey" />
  <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${color}" />
</svg>`}
        </pre>
      </div>
    </div>
  );
};

export default SVGLearningApp;

