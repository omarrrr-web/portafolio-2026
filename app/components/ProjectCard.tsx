import { FaExternalLinkAlt } from "react-icons/fa"; // Asegúrate de importar el icono

interface ProjectCardProps {
  title: string;
  type: string;
  description: string;
  role: string;
  techStack: string[];
  link?: string; // <--- NUEVO: Opcional, por si algún proyecto no tiene link
}

export default function ProjectCard({ title, type, description, role, techStack, link }: ProjectCardProps) {
  return (
    <div className="bg-dark-surface/50 border border-dark-border rounded-2xl p-8 hover:border-primary-cyan/50 transition-all group relative overflow-hidden">

      {/* Encabezado con Link */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-primary-cyan text-xs font-bold uppercase tracking-wider mb-2 block font-mono">
            {type}
          </span>
          <h3 className="text-2xl font-bold text-text-title group-hover:text-primary-cyan transition-colors font-display">
            {title}
          </h3>
        </div>

        {/* Botón de enlace */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-dark-bg hover:bg-primary-cyan hover:text-dark-bg text-text-muted rounded-xl transition-all"
            title="Ver Proyecto en vivo"
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>

      <p className="text-text-muted mb-6 leading-relaxed">
        {description}
      </p>

      <div className="mb-6">
        <strong className="text-text-title text-sm block mb-2 font-mono uppercase tracking-wide">Mi Rol:</strong>
        <p className="text-text-muted text-sm">{role}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-dark-bg border border-dark-border rounded-lg text-xs text-text-muted font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}