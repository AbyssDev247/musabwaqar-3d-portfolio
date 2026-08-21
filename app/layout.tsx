import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MUSABWAQAR // SYSTEMS IN MOTION',
  description: 'An immersive 3D portfolio for Musabwaqar — Computer Scientist, Builder and Systems Thinker.',
  keywords: ['Musabwaqar', 'Computer Science', 'Three.js', 'AI', 'Distributed Systems', 'Portfolio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
