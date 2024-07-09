import React from "react";

const Colors = (props) => {
  const {colorData, setColor} = props;
  return (
    <>
      <ul className="colors ps-0">
      {
        colorData && colorData.map((item,index) => {
          return(
            <li onClick={() => setColor(item?.id)} key={index} style={{backgroundColor:item?.title}}></li>
          )
        })
      }
      </ul>
    </>
  );
};

export default Colors;
