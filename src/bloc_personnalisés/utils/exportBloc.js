export function exportBloc(content, name) {
    const contentFinal = `//${name}//\n` + content
    const filename = name + '.part.mdlc'
    const blob = new Blob([contentFinal], { type: "text" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}