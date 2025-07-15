import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Udyam Clone',
  description: 'Styled with Tailwind CSS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
