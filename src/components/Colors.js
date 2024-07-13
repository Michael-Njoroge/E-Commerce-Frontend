import React from "react";

const Colors = (props) => {
  const {colorData, setColor, selectedColor} = props;
  return (
    <>
      <ul className="colors ps-0">
      {
        colorData && colorData.map((item,index) => {
          const isSelected = item?.id === selectedColor;
          return(
            <li 
              onClick={() => setColor(item?.id)} 
              key={index} 
               style={{
                  backgroundColor: item?.title,
                  border: isSelected ? "2px solid black" : "none",
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
              </li>
          )
        })
      }
      </ul>
    </>
  );
};

export default Colors;
