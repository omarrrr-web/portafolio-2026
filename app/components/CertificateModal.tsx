"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaExternalLinkAlt } from "react-icons/fa";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certUrl: string;
  certTitle: string;
}

export default function CertificateModal({ isOpen, onClose, certUrl, certTitle }: CertificateModalProps) {
  if (!isOpen) return null;

  const isPdf = certUrl.toLowerCase().endsWith(".pdf");
  const isCv = certUrl.includes("CVOMAR");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-dark-surface border border-dark-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-surface/50">
              <div className="flex flex-col">
                <h3 className="text-text-title font-bold font-display text-lg">{certTitle}</h3>
                <span className="text-xs text-text-muted font-mono uppercase tracking-widest">
                  {isCv ? "Documento Profesional" : "Vista Previa de Certificado"}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <a 
                  href={certUrl} 
                  download 
                  className="p-2.5 rounded-xl bg-dark-bg border border-dark-border text-text-muted hover:text-accent-amber hover:border-accent-amber transition-all"
                  title="Descargar"
                >
                  <FaDownload />
                </a>
                <a 
                  href={certUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-dark-bg border border-dark-border text-text-muted hover:text-primary-cyan hover:border-primary-cyan transition-all"
                  title="Abrir en pestaña nueva"
                >
                  <FaExternalLinkAlt />
                </a>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-dark-bg border border-dark-border text-text-muted hover:text-red-400 hover:border-red-400 transition-all cursor-pointer"
                  title="Cerrar"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-auto bg-black/20 p-2 md:p-4 flex items-center justify-center min-h-[50vh]">
              {isPdf ? (
                <iframe
                  src={`${certUrl}#toolbar=0`}
                  className="w-full h-full min-h-[60vh] rounded-xl border border-dark-border shadow-inner"
                  title={certTitle}
                />
              ) : (
                <img
                  src={certUrl}
                  alt={certTitle}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />
              )}
            </div>

            {/* Footer / Status Bar */}
            <div className="px-6 py-3 border-t border-dark-border bg-dark-surface/50 flex justify-between items-center text-[10px] font-mono text-text-muted/60">
              <span>ESTADO: VISUALIZANDO ARCHIVO SEGURO</span>
              <span className="hidden sm:block">SISTEMA DE GESTIÓN DE CREDENCIALES v2.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
