import React, { useState, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../../styled/Title/AnimatedCharacters";

const Title = forwardRef(({ aniTitle }, ref) => {
  const [Hidden, setHidden] = useState(true);
  const placeholderText = [{ type: "heading2", text: aniTitle }];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  // Quick and dirt for the example
  const handleHidden = () => {
    setHidden(!Hidden);
  };

  useImperativeHandle(ref, () => {
    return {
      hidden: () => {
        handleHidden();
      },
    };
  });

  return (
    <motion.span
      className="App"
      initial="hidden"
      animate={Hidden ? "visible" : "hidden"}
      variants={container}
      style={{ display: "block" }}
    >
      <span className="container" style={{ display: "block" }}>
        {placeholderText.map((item, index) => {
          return <AnimatedText {...item} key={index} />;
        })}
      </span>
    </motion.span>
  );
});

export default Title;
