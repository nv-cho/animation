import "./App.css";
import { useEffect, useState } from "react";

import anotherAbstractShape from "./assets/another-abstract-shape.gif";
import abstractShape from "./assets/abstract-shape.gif";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const rowsLength = [1, 2, 4, 6, 7];

  const [binaryNumbers, setBinaryNumbers] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const initialBinaryNumbers = rowsLength.map((rowLength) =>
      Array.from({ length: rowLength }, () => ({
        value: Math.floor(Math.random() * 2),
        color: "white",
      }))
    );

    setBinaryNumbers(initialBinaryNumbers);

    const intervalId = setInterval(() => {
      setBinaryNumbers(
        rowsLength.map((rowLength) =>
          Array.from({ length: rowLength }, () => ({
            value: Math.floor(Math.random() * 2),
            color: Math.random() < 0.5 ? "green" : "white",
          }))
        )
      );
    }, 800);

    return () => clearInterval(intervalId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsFlipped(true);
    }, 7000);

    return () => clearTimeout(timeoutId);
  }, []);

  const numbers = binaryNumbers.map((row, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 + index * 0.15 }}
      className="numbers-row-container">
      <AnimatePresence>
        {row.map((number, numberIndex) => (
          <motion.p
            key={numberIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 + (row.length - numberIndex - 1) * 0.15 }}
            style={{ color: number.color, fontSize: 22 }}>
            {number.value}
          </motion.p>
        ))}
      </AnimatePresence>
    </motion.div>
  ));

  return (
    <div className="main-container">
      <motion.div
        className="card-container"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          height: 600,
        }}
        transition={{
          duration: 1,
          delay: 1.9,
          rotateY: { delay: 0, duration: 1 },
        }}
        style={{ perspective: 1000 }}>
        <div className="upper-horizontal-line" />
        <div className="upper-vertical-line" />
        <div className="bottom-horizontal-line" />
        <div className="bottom-vertical-line" />

        {!isFlipped && (
          <div className="card-side-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="numbers-container">
              {numbers}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
              style={{ height: 300, marginTop: "auto", marginBottom: 50 }}>
              <img
                src={anotherAbstractShape}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          </div>
        )}

        {isFlipped && (
          <motion.div
            className="card-side-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              rotateY: "-180deg",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}>
            <div className="text-container">
              <p>ANIMUS REC.</p>
              <div className="inner-text-container">
                <p>#3335</p>

                <span className="flickering-text">
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      times: [0, 0.5, 1],
                      duration: 0.2,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                    }}
                    style={{
                      height: "10px",
                      width: "10px",
                      marginTop: "7px",
                      backgroundColor: "green",
                    }}
                  />
                  <p>ON</p>
                </span>
              </div>
            </div>

            <div style={{ height: 300, marginTop: "auto", marginBottom: 100 }}>
              <img
                src={abstractShape}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
