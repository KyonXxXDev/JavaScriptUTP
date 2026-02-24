import { motion as Motion } from "framer-motion";

export default function FadeInSection({ children }) {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 50 }} // comienza abajo y transparente
            whileInView={{ opacity: 1, y: 0 }} // cuando entra en pantalla
            viewport={{ once: true, amount: 0.2 }} // solo una vez
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            {children}
        </Motion.div> 
    );
}