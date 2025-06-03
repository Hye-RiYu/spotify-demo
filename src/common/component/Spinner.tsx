import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      <ClipLoader color="#fff" size={40} />
    </div>
  );
};

export default Spinner;
