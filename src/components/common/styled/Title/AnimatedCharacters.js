import React from "react";
import { motion } from "framer-motion";

const Wrapper = (props) => {
  return (
    <span className="word-wrapper" style={{ display: "inline-block" }}>
      {props.children}
    </span>
  );
};

const tagMap = {
  paragraph: "p",
  heading1: "h2",
  heading2: "h3",
};

const AnimatedCharacters = (props) => {
  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  const splitWords = props.text.split(" ");

  const words = [];

  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }

  words.map((word) => {
    return word.push("\u00A0");
  });

  const Tag = tagMap[props.type];

  return (
    <>
      {words.map((word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
    </>
  );
};

export default AnimatedCharacters;
