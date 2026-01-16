'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArticleContent } from '@/components/expert'
import type { ArticleCategory } from '@/types/expert'
import { categoryLabels } from '@/types/expert'

interface ArticleEditorProps {
  userId: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function ArticleEditor({ userId }: ArticleEditorProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    contentMd: '',
    coverImage: '',
    category: 'analysis' as ArticleCategory,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()

      const slug = slugify(formData.title)
      const readTime = calculateReadTime(formData.contentMd)

      const { data, error: insertError } = await supabase
        .from('expert_articles')
        .insert({
          author_id: userId,
          title: formData.title,
          slug,
          excerpt: formData.excerpt || null,
          content_md: formData.contentMd,
          cover_image: formData.coverImage || null,
          category: formData.category,
          read_time: readTime,
          is_published: !isDraft,
        })
        .select()
        .single()

      if (insertError) {
        throw new Error(insertError.message)
      }

      router.push(isDraft ? '/experts' : `/experts/${slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-editorial">
        <button
          type="button"
          onClick={() => setIsPreview(false)}
          className={`px-4 py-3 font-medium transition-colors ${
            !isPreview 
              ? 'text-accent-sport border-b-2 border-accent-sport' 
              : 'text-muted hover:text-primary'
          }`}
        >
          Rédiger
        </button>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
          className={`px-4 py-3 font-medium transition-colors ${
            isPreview 
              ? 'text-accent-sport border-b-2 border-accent-sport' 
              : 'text-muted hover:text-primary'
          }`}
        >
          Aperçu
        </button>
      </div>

      {!isPreview ? (
        <form className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Titre de l'article *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Un titre accrocheur pour votre analyse..."
              className="w-full px-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-2 focus:ring-accent-sport/20 outline-none transition-all font-editorial text-2xl font-bold"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Extrait / Chapô
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Un résumé qui donne envie de lire la suite..."
              rows={2}
              maxLength={300}
              className="w-full px-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-2 focus:ring-accent-sport/20 outline-none transition-all resize-none"
            />
            <p className="text-xs text-muted mt-1">{formData.excerpt.length}/300</p>
          </div>

          {/* Category & Cover */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Catégorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-2 focus:ring-accent-sport/20 outline-none transition-all"
              >
                {Object.entries(categoryLabels).map(([key, { label }]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Image de couverture (URL)
              </label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-2 focus:ring-accent-sport/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Contenu (Markdown) *
            </label>
            <textarea
              name="contentMd"
              value={formData.contentMd}
              onChange={handleChange}
              placeholder={`## Introduction

Commencez votre article ici...

### Un sous-titre

Du texte avec **gras** et *italique*.

> Une citation importante

- Point 1
- Point 2

| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Valeur    | Valeur    |`}
              rows={20}
              className="w-full px-4 py-3 border border-editorial rounded-lg focus:border-accent-sport focus:ring-2 focus:ring-accent-sport/20 outline-none transition-all font-mono text-sm resize-y"
              required
            />
            <p className="text-xs text-muted mt-1">
              Supporte le Markdown : titres (##), gras (**), italique (*), liens, listes, tableaux, citations (&gt;)
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-editorial">
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting || !formData.title || !formData.contentMd}
              className="flex-1 px-6 py-3 bg-secondary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer comme brouillon'}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting || !formData.title || !formData.contentMd}
              className="flex-1 px-6 py-3 bg-accent-sport text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publication...' : 'Publier l\'article'}
            </button>
          </div>
        </form>
      ) : (
        /* Preview Mode */
        <div className="bg-white border border-editorial rounded-xl p-8">
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Couverture"
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
          
          <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 ${categoryLabels[formData.category].color}`}>
            {categoryLabels[formData.category].label}
          </span>

          <h1 className="font-editorial text-4xl font-black text-primary mb-4">
            {formData.title || 'Titre de l\'article'}
          </h1>

          {formData.excerpt && (
            <p className="text-xl text-muted mb-8 leading-relaxed">
              {formData.excerpt}
            </p>
          )}

          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-editorial">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-sport flex items-center justify-center text-white font-bold">
              V
            </div>
            <div>
              <p className="font-semibold text-primary">Vous</p>
              <p className="text-muted text-sm">
                {calculateReadTime(formData.contentMd)} min de lecture
              </p>
            </div>
          </div>

          {formData.contentMd ? (
            <ArticleContent content={formData.contentMd} />
          ) : (
            <p className="text-muted italic">
              Commencez à rédiger pour voir l'aperçu ici...
            </p>
          )}
        </div>
      )}
    </div>
  )
}
