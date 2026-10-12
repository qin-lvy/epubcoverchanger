export interface BlogSource {
  label: string;
  url: string;
}

export function Cite({ n }: { n: number }) {
  return (
    <sup>
      <a
        href={`#source-${n}`}
        className="ml-0.5 text-xs font-medium text-primary hover:underline"
      >
        [{n}]
      </a>
    </sup>
  );
}

export function SourceList({ sources }: { sources: BlogSource[] }) {
  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-lg font-semibold text-gray-950">Sources</h2>
      <ol className="mt-4 space-y-2 text-sm leading-6 text-gray-600">
        {sources.map((source, index) => (
          <li key={source.url} id={`source-${index + 1}`}>
            [{index + 1}]{" "}
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words text-primary hover:underline"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
