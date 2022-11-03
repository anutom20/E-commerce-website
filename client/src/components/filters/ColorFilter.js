import React from 'react'
import { useGlobalContext } from '../../context'
import { colors } from '../../data'
import { CgCheck } from 'react-icons/cg'

const ColorFilter = () => {
    const {setColor , activeColorIndex , setActiveColorIndex} = useGlobalContext()
  return (
    <div className="colors">
      <button
        className={
          activeColorIndex === -1
            ? "all-color-btn all-color-active-btn"
            : "all-color-btn"
        }
        onClick={() => {
          setActiveColorIndex(-1);
          setColor("All");
        }}
      >
        All
      </button>
      {colors.map((item, index) => {
        return (
          <button
            className={
              index === activeColorIndex
                ? "color-btn color-active-btn"
                : "color-btn"
            }
            id={item.color}
            style={{ background: item.value }}
            key={index}
            onClick={() => {
              setActiveColorIndex(index);
              setColor(item.color);
            }}
          >
            {index === activeColorIndex && <CgCheck />}
          </button>
        );
      })}
    </div>
  );
}

export default ColorFilter
