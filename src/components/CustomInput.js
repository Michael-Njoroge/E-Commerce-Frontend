import React from 'react';

const CustomInput = (props) => {
	const {type, name, placeholder, classname, value, id, onChange, disabled} = props;
    return (
        <div>
            <input
             type={type}
             className={`form-control ${classname}`}
             name={name}
             placeholder={placeholder}
             value ={value}
             id={id}
             onChange={onChange}
             disabled={disabled}
            />
        </div>
    );
};

export default CustomInput;
