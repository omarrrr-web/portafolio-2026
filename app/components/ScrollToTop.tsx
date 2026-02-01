"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Detectar el scroll
    useEffect(() => {
        const toggleVisibility = () => {
            // Muestra el botón cuando bajas más de 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    // 1. ANIMACIÓN DE ENTRADA (Rebote elástico)
                    initial={{ opacity: 0, scale: 0, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 100 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}

                    // 2. INTERACCIÓN (Hover y Clic)
                    whileHover={{ scale: 1.1 }} // Se agranda al pasar el mouse
                    whileTap={{ scale: 0.9 }}   // Se encoge al hacer clic

                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/40 cursor-pointer border-2 border-slate-900 group"
                    aria-label="Volver arriba"
                >
                    {/* 3. LA FLECHA ANIMADA (Se mueve siempre) */}
                    <motion.div
                        animate={{ y: [0, -4, 0] }} // Sube 4px y baja
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <FaArrowUp className="text-xl" />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}