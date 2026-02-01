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
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all group relative overflow-hidden">

      {/* Encabezado con Link */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">
            {type}
          </span>
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </div>

        {/* Botón de enlace */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all"
            title="Ver Proyecto en vivo"
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>

      <p className="text-slate-400 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="mb-6">
        <strong className="text-slate-200 text-sm block mb-2">Mi Rol:</strong>
        <p className="text-slate-400 text-sm">{role}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}