import React, { useState } from 'react';

const Circle = () => (
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="red" />
  </svg>
);

const Square = () => (
  <svg width="100" height="100">
    <rect width="80" height="80" fill="green" />
  </svg>
);

const Heptagon = () => (
  <svg width="100" height="100">
    <polygon points="50,5 90,30 90,90 50,95 10,90 10,30" fill="purple" />
  </svg>
);

const ComponentsCollection = () => {
  const [selectedComponent, setSelectedComponent] = useState('circle');

  const components = ['circle', 'square', 'heptagon'];
  const currentIndex = components.indexOf(selectedComponent);

  const prevComponent = () => {
    const prevIndex = (currentIndex - 1 + components.length) % components.length;
    setSelectedComponent(components[prevIndex]);
  };

  const nextComponent = () => {
    const nextIndex = (currentIndex + 1) % components.length;
    setSelectedComponent(components[nextIndex]);
  };

  const componentMap = {
    circle: Circle,
    square: Square,
    heptagon: Heptagon,
  };

  const ComponentToRender = componentMap[selectedComponent];

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex items-center justify-between w-48 mb-4">
        <button
          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
          onClick={prevComponent}
        >
          &lt;
        </button>
        {components.map((component) => (
          <button
            key={component}
            className={`w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center ${
              selectedComponent === component && 'bg-blue-500'
            }`}
            onClick={() => setSelectedComponent(component)}
          >
            {component.charAt(0).toUpperCase()}
          </button>
        ))}
        <button
          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
          onClick={nextComponent}
        >
          &gt;
        </button>
      </div>
      <div className="border border-gray-300 p-4">
        <ComponentToRender />
      </div>
    </div>
  );
};

export default ComponentsCollection;
