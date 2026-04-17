import { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

function Previsualisation({ open, onClose, text, title }) {
  if (!open) return null;

  const html = DOMPurify.sanitize(marked.parse(text || ''));
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-5 min-w-[300px] max-w-[95vw] max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between gap-3 mb-3">
          <div className="text-xl">{title}</div>
          <button className="bg-white hover:bg-gray-200 border py-2 px-4 rounded" onClick={onClose}>Fermer</button>
        </div>
        <hr />
        {html ? <div className="prose max-w-none break-words" dangerouslySetInnerHTML={{ __html: html }} /> : <p>Aucun contenu à afficher</p>}
  
      </div>
    </div>
  );
}

export default Previsualisation;