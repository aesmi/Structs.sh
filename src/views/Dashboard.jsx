import React from 'react';
import Pane from 'components/Panes/Pane';
import LinkedList from 'components/Visualisation/LinkedList/LinkedList';
import { Lesson } from 'components/Lesson';
import { Terminal } from 'components/Terminal';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.scss';

const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: { duration: 1.5 }
    },
    exit: {
        opacity: "-100vw",
        transition: { ease: "easeInOut" }
    }
}

const Dashboard = ({ match }) => {
    // Extract route parameters
    const { params } = match;
    const topic = params.topic;

    return (
        <motion.div className={styles.container} variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <Pane orientation="vertical" minSize={'50%'}>
                <Pane orientation="horizontal" minSize={'50%'}>
                    <LinkedList>Visualiser here</LinkedList>
                    <Terminal>Terminal here</Terminal>
                </Pane>
                <Lesson topic={topic}></Lesson>
            </Pane>
        </motion.div>
    );
};

export default Dashboard;