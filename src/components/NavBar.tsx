'use client';
import React from 'react';
import styles from '../styles/Home.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <h1>IMDB Top 250 Movies</h1>
        </nav>
    );
};

export default Navbar;
