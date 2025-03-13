"use client"

import { useState } from "react"
import { Bold, Italic, List, ListOrdered, Undo, Redo, Heading1, Heading2, LinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function DocumentEditor() {
  const [content, setContent] = useState<string>(`
    <h1>The Effects of Microplastics on Marine Ecosystems</h1>
    <p>By Research Team: Alex Chen, Maya Patel, Jordan Taylor</p>
    <h2>Abstract</h2>
    <p>This study examines the prevalence and impact of microplastic pollution in coastal marine ecosystems. Through sampling at multiple locations along the eastern seaboard, we have identified concerning concentrations of microplastic particles that correlate with decreased biodiversity in affected areas.</p>
    <h2>Introduction</h2>
    <p>Microplastics, defined as plastic particles smaller than 5mm in diameter, have become ubiquitous in marine environments worldwide. These particles originate from various sources, including the breakdown of larger plastic debris, microbeads from personal care products, and synthetic fibers from clothing.</p>
    <p>Recent studies have demonstrated that microplastics can be ingested by marine organisms, potentially causing physical harm and introducing toxins into the food chain. However, the long-term ecological impacts of microplastic pollution remain poorly understood.</p>
    <h2>Methodology</h2>
    <p>Our research team collected water and sediment samples from 12 coastal locations between Maine and Florida over a six-month period. Samples were processed using density separation techniques to isolate microplastic particles, which were then categorized by size, shape, and polymer type using spectroscopic analysis.</p>
  `)

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="border-b p-2 flex items-center gap-1 flex-wrap">
        <Button variant="ghost" size="sm">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Redo className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="sm">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="sm">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="sm">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="ml-auto flex items-center text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          All changes saved
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
        />
      </div>

      <div className="border-t p-2 flex items-center justify-between text-sm text-muted-foreground">
        <div>Last edited by Maya Patel, 2 minutes ago</div>
        <div>3 collaborators viewing</div>
      </div>
    </div>
  )
}

