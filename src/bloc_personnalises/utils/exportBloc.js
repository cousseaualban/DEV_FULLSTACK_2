function exportBloc(content, name) {
  const blob = new Blob([content], { type: "text" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();

  URL.revokeObjectURL(url);
}

export function exportSelectedBlocs(selected, blocs) {
  if (!selected || selected.length === 0) return;

  const selectedBlocs = blocs.filter((b) =>
    selected.includes(b.id)
  );

  const contentFinal = selectedBlocs
    .map((bloc) => `//${bloc.name}//\n${bloc.content}`)
    .join("\n\n");

  const filename =
    selected.length === 1
      ? `${selectedBlocs[0].name}.part.mdlc`
      : `export-blocs.parts.mdlc`;

  exportBloc(contentFinal, filename);
}