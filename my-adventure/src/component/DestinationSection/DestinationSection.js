import React from "react";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

class DestinationSection extends React.Component {
  render() {
    return (
      <div className={styles.destinationSectionView}>
        <h1 className={styles.destinationSectionTitle}>{this.props.children}</h1>
        <p className={styles.destinationSectionText}>{this.props.text}</p>
        <div className={styles.illustrationView}>
          <motion.img
            alt="illus01"
            src={this.props.img[0]}
            id="illusImage"
            whileHover={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
            whileTap={{ opacity: 0.75 }}
          />
          <motion.img
            alt="illus02"
            src={this.props.img[1]}
            id="illusImage"
            whileHover={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
            whileTap={{ opacity: 0.75 }}
          />
          <motion.img
            alt="illus03"
            src={this.props.img[2]}
            id="illusImage"
            whileHover={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
            whileTap={{ opacity: 0.75 }}
          />
          <motion.img
            alt="illus04"
            src={this.props.img[3]}
            id="illusImage"
            whileHover={{
              scale: 0.95,
              transition: { duration: 0.1 },
            }}
            whileTap={{ opacity: 0.75 }}
          />
        </div>
      </div>
    );
  }
}
export default DestinationSection;
