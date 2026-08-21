import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Musabwaqar — Systems in Motion',
  description: 'An immersive anime-inspired portfolio for Musabwaqar, Computer Science student and builder.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
