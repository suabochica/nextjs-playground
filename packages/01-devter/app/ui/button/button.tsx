"use client";

import { colors } from "../../styles/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>
        {`
          button {
            font-family: "Geist Sans", system-ui, sans-serif;
            align-items: center;
            background: ${colors.black};
            border: 0;
            color: ${colors.white};
            display: flex;
            border-radius: 9999px;
            font-size: 16px;
            font-weight: 800;
            padding: 8px 24px;
            transition: opacity 0.3s ease;
          }

          button > :global(svg) {
            margin-right: 8px;
          }

          button:hover {
            opacity: 0.7;
          }
        `}
      </style>
    </>
  );
}
