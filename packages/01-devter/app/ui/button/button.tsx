"use client";

import styles from '@/app/ui/button/button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <>
      <button className={styles.button} disabled={disabled} onClick={onClick}>{children}</button>
    </>
  );
}
