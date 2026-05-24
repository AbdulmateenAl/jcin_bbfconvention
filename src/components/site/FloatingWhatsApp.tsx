import { MessageCircle } from "lucide-react";
import { CONVENTION } from "@/lib/convention";

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${CONVENTION.whatsappSupport}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-rich text-primary-foreground shadow-elegant hover:scale-105 transition"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
