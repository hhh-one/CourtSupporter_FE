import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const addressHook = (props) => {
  const oncomplete = (data) => {
    console.log(data);
    // let fullAddress = data.address;
    // let postcode = data.zonecode;
  }

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: "600px",
    height: "600px",
    padding: "7px",
    border: "2px solid #666"
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} autoClose onComplete={oncomplete} />
    </div>
  );
};

export default addressHook;