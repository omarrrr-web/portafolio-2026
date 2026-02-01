import { ImageResponse } from "next/og";

export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 18,
                    background: "#0f172a", // slate-950 (Tu fondo oscuro)
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "8px", // Bordes redondeados
                    border: "2px solid #3b82f6", // Borde Azul (blue-500)
                    fontWeight: 700,
                }}
            >
                OE
            </div>
        ),
        {
            ...size,
        }
    );
}