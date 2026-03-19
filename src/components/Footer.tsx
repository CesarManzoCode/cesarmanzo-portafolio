import { portfolioData } from '../data/portfolio';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-white/6 py-8">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {portfolioData.name} Portafolio </p>
          <p>Diseño oscuro, responsive y optimizado con React, Vite, Tailwind y Framer Motion.</p>
        </div>
      </Container>
    </footer>
  );
}
