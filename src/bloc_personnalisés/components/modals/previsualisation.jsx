import { useState } from "react";
import style from './previsualisation.module.css';
import { marked } from "marked";

function Previsualisation({ open, onClose, text }) {
  if (!open) return null;

  const html = marked.parse(text || '');
  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Prévisualisation du bloc</h2>
        <hr />
        {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <p>Aucun contenu à afficher</p>}
        <hr />
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

export default Previsualisation;