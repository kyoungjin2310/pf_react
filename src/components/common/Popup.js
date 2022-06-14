import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
/*
	단계1 - 기존의 컴포넌트 함수를 대입형(화살표) 함수로 변경
	단계2 - 해당 화살표함수를 forwardRef()의 인수로 전달
	단계3 - forwardRef의 인수로 전달받는 함수의 두번채 파라미터로 ref추가
*/

const Popup = forwardRef(({ children }, ref) => {
  //자신의 open여부를 결정하는 state생성
  const [Open, setOpen] = useState(false);

  const open = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  //해당 컴포넌트에서 만들어지는 함수를 부모컴포넌트에서 사용가능하도록 외부로 반환가능
  useImperativeHandle(ref, () => {
    return {
      //팝업열기 함수
      open: () => {
        open();
      },
      //팝업닫기 함수
      close: () => {
        close();
      },
    };
  });

  useEffect(() => {}, []);

  return (
    <>
      <AnimatePresence>
        {Open && (
          <motion.aside
            initial={{ y: "-100%" }}
            animate={{
              y: "0",
              transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
            }}
            exit={{
              y: "-100%",
              transition: {
                duration: 0.5,
                delay: 0.8,
                ease: [0.25, 1, 0.5, 1],
              },
            }}
            className="pop"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5, delay: 1 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.5 } }}
              className="con"
            >
              {children}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 1 },
                }}
                exit={{ opacity: 0 }}
                className="close"
                onClick={close}
              >
                close
              </motion.span>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
});

export default Popup;
