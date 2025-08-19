import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content }: { content: string | undefined }) {
  if (!content) return null;
  return (
    <div className="rich-text prose prose-lg max-w-none text-gray-700">
      <Markdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-4 text-gray-900" {...props} />,
          h2: ({ ...props }) => <h2 className="text-2xl font-bold mb-3 text-gray-900" {...props} />,
          h3: ({ ...props }) => <h3 className="text-xl font-semibold mb-2 text-gray-800" {...props} />,
          p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          a: ({ ...props }) => <a className="text-blue-600 hover:text-blue-700 underline" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
          li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
          blockquote: ({ ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4" {...props} />,
          code: ({ className, ...props }) => (
            className ? (
              <code className="block bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto" {...props} />
            ) : (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm" {...props} />
            )
          ),
          pre: ({ ...props }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
          table: ({ ...props }) => <table className="w-full border-collapse border border-gray-300 mb-4" {...props} />,
          th: ({ ...props }) => <th className="border border-gray-300 p-2 bg-gray-100 font-semibold text-left" {...props} />,
          td: ({ ...props }) => <td className="border border-gray-300 p-2" {...props} />,
          img: ({ ...props }) => <img className="max-w-full h-auto rounded-lg mb-4" {...props} />,
          hr: ({ ...props }) => <hr className="border-gray-300 my-8" {...props} />,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}