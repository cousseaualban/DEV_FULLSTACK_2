import { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

function Previsualisation({ open, onClose, text }) {
  if (!open) return null;

  const html = DOMPurify.sanitize(marked.parse(text || ''));
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-5 min-w-[300px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between gap-3">
          <div className="text-xl">Prévisualisation du bloc</div>
          <button onClick={onClose}>Fermer</button>
        </div>
        <hr />
        {html ? <div className="prose" dangerouslySetInnerHTML={{ __html: html }} /> : <p>Aucun contenu à afficher</p>}
  
      </div>
    </div>
  );
}

export default Previsualisation;