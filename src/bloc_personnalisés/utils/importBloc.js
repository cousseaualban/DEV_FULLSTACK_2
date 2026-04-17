export function importBloc (content) {
    const match = content.match(/^\/\/(.*?)\/\/\n?([\s\S]*)$/);

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