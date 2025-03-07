import React, { useState } from 'react';


const FilterSidebar = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedColors, setSelectedColors] = useState([]);

  const colors = [
    'Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 
    'Pink', 'Purple', 'Orange', 'Gray', 'Brown'
  ];

  const handlePriceChange = (values) => {
    setPriceRange(values);
    onFilterChange({ priceRange: values, colors: selectedColors });
  };

  const handleColorChange = (color) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);
    onFilterChange({ priceRange, colors: newColors });
  };

  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>
      
      <div className="filter-section">
        <h4>Price Range</h4>
        <input
          type="range"
          min={0}
          max={10000}
          value={priceRange[1]}
          onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
        />
        <div className="price-range-values">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div className="filter-section">
        <h4>Colors</h4>
        <div className="color-filters">
          {colors.map(color => (
            <label key={color} className="color-filter">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              <span className="color-label">{color}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
