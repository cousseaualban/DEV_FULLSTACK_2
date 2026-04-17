function parseSingleBloc (content) {
    const match = content.match(/^\/\/(.*?)\/\/\n?([\s\S]*)$/); // j'ai demandé a chatgpt pour le regex

    if (!match) {
        return {
            name: "Sans nom",
            content
        }
    }

    return {
        name: match[1].trim(),
        content: match[2].trim()
    }
}

function parseMultipleBlocs(content) {
  const regex = /\/\/(.*?)\/\/\n?([\s\S]*?)(?=(\n\/\/|$))/g; // j'ai demandé a chatgpt pour le regex

  const blocs = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    blocs.push({
      name: match[1].trim(),
      content: match[2].trim(),
    });
  }

  return blocs;
}

export function importBloc(fileName, content) {
  const isMulti = fileName.endsWith(".parts.mdlc");

  if (isMulti) {
    return parseMultipleBlocs(content);
  }

  return [parseSingleBloc(content)];
}