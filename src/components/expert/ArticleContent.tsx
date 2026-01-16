'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-editorial prose-headings:text-primary prose-p:text-primary/90 prose-p:leading-relaxed prose-a:text-accent-sport prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent-sport prose-blockquote:bg-secondary/30 prose-blockquote:py-1 prose-blockquote:not-italic prose-strong:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
