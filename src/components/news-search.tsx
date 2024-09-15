"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define the Article type
type Article = {
  id: number;
  title: string;
  description: string;
  source: string;
  date: string;
  image: string;
}

// Simulated function to generate fake news articles
const generateFakeArticles = (topic: string, count: number): Article[] => {
  const colors = ["4F46E5", "EF4444", "10B981", "F59E0B", "6366F1", "EC4899", "14B8A6", "8B5CF6"]
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${topic} News Article ${i + 1}`,
    description: `This is a simulated news article about ${topic}. It contains important information and updates related to the topic.`,
    source: `News Source ${i + 1}`,
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    image: `/api/placeholder/300/200?text=${encodeURIComponent(topic)}+${i + 1}&fontsize=24&bg=${colors[i % colors.length]}`
  }))
}

export function NewsSearch() {
  const [topic, setTopic] = useState("")
  const [articleCount, setArticleCount] = useState("4")
  const [articles, setArticles] = useState<Article[]>([])
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) {
      setError("Please enter a topic")
      return
    }
    setError("")
    const fakeArticles = generateFakeArticles(topic, parseInt(articleCount))
    setArticles(fakeArticles)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>News Article Search</CardTitle>
          <CardDescription>Enter a topic and select the number of articles to display</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="topic" className="text-sm font-medium">Topic</label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic"
                aria-describedby="topic-error"
              />
              {error && <p id="topic-error" className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="articleCount" className="text-sm font-medium">Number of Articles</label>
              <Select value={articleCount} onValueChange={setArticleCount}>
                <SelectTrigger id="articleCount">
                  <SelectValue placeholder="Select article count" />
                </SelectTrigger>
                <SelectContent>
                  {[4, 6, 8, 10, 12].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Search Articles</Button>
          </form>
        </CardContent>
      </Card>

      {articles.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Search Results for "{topic}"</h2>
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <Image
                    src={article.image}
                    alt={`Cover image for ${article.title}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription>{article.source} - {article.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p>{article.description}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}