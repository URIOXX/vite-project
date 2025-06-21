import { useState } from "react";
import { marked } from "marked";

function MarkdownPreviewer() {
  // Markdown por defecto con todos los elementos requeridos
  const defaultMarkdown = `# Heading (H1)
## Subheading (H2)

[Link](https://www.freecodecamp.org)

\`inline code\`

\`\`\`
// code block
function example() {
  return 'Hello World';
}
\`\`\`

- List item 1
- List item 2
- List item 3

> Blockquote

![FreeCodeCamp Logo](https://design-style-guide.freecodecamp.org/downloads/fcc_secondary_small.svg)

**Bolded Text**`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);

  // Configurar marked para convertir saltos de línea en <br>
  marked.setOptions({
    breaks: true,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Markdown Previewer
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Editor */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Editor</h2>
            <textarea
              id="editor"
              className="w-full h-96 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
            <div
              id="preview"
              className="w-full h-96 p-4 border border-gray-300 rounded-lg shadow-sm bg-white overflow-auto prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(markdown) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkdownPreviewer;
