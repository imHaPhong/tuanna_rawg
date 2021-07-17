import React from "react";

const testHo = (InnerComponent) => {
  const Authenticated = () => {
    return <InnerComponent />;
  };

  return Authenticated;
};

export default testHo;
