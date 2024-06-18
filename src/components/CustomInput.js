import React from 'react';

const CustomInput = (props) => {
	const {type, name, placeholder, classname} = props;
    return (
        <div>
            <input
             type={type}
             className={`form-control ${classname}`}
             name={name}
             placeholder={placeholder}
            />
        </div>
    );
};

export default CustomInput;
