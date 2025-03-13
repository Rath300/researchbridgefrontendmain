"use client"

import { useState } from "react"
import { Play, Plus, Save, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

// Mock data for code cells
const initialCells = [
  {
    id: "cell1",
    type: "markdown",
    content:
      "# Data Analysis for Microplastics Research\nThis notebook contains the code for analyzing our microplastics data samples.",
    output: null,
  },
  {
    id: "cell2",
    type: "code",
    content:
      "import pandas as pd\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# Load the dataset\ndf = pd.read_csv('microplastics_data.csv')",
    output: null,
  },
  {
    id: "cell3",
    type: "code",
    content: "# Display basic statistics\ndf.describe()",
    output: `
              count      mean       std       min       25%       50%       75%       max
count        12.00     12.00     12.00     12.00     12.00     12.00     12.00     12.00
particles    12.00    235.42    103.21     78.00    164.25    227.50    315.75    412.00
size_um      12.00    127.33     62.18     42.50     82.75    118.50    157.25    245.00
depth_m      12.00     15.83      7.93      5.00     10.00     14.50     20.75     30.00
    `,
  },
  {
    id: "cell4",
    type: "code",
    content:
      "# Create a visualization\nplt.figure(figsize=(10, 6))\nplt.scatter(df['depth_m'], df['particles'], alpha=0.7)\nplt.xlabel('Depth (meters)')\nplt.ylabel('Microplastic Particles (count/L)')\nplt.title('Microplastic Concentration by Depth')\nplt.grid(True, linestyle='--', alpha=0.7)\nplt.show()",
    output: "[Visualization: Scatter plot showing relationship between depth and microplastic concentration]",
  },
]

export function CodeNotebook() {
  const [cells, setCells] = useState(initialCells)
  const [activeCell, setActiveCell] = useState<string | null>(null)

  const addCell = (type: "code" | "markdown") => {
    const newCell = {
      id: `cell${Date.now()}`,
      type,
      content: type === "code" ? "# Enter your code here" : "Enter markdown here",
      output: null,
    }
    setCells([...cells, newCell])
  }

  const deleteCell = (id: string) => {
    setCells(cells.filter((cell) => cell.id !== id))
  }

  const updateCellContent = (id: string, content: string) => {
    setCells(cells.map((cell) => (cell.id === id ? { ...cell, content } : cell)))
  }

  const executeCell = (id: string) => {
    // In a real app, this would send the code to a backend for execution
    // For now, we'll just simulate an output
    setCells(
      cells.map((cell) =>
        cell.id === id
          ? {
              ...cell,
              output: "Execution result would appear here in a real implementation.",
            }
          : cell,
      ),
    )
  }

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="border-b p-2 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => addCell("code")}>
          <Plus className="h-4 w-4 mr-1" />
          Code Cell
        </Button>
        <Button variant="outline" size="sm" onClick={() => addCell("markdown")}>
          <Plus className="h-4 w-4 mr-1" />
          Markdown Cell
        </Button>
        <Button variant="outline" size="sm">
          <Save className="h-4 w-4 mr-1" />
          Save Notebook
        </Button>
        <div className="ml-auto flex items-center text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Connected to Jupyter kernel
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className={`border-b p-4 ${activeCell === cell.id ? "bg-muted/50" : ""}`}
            onClick={() => setActiveCell(cell.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{cell.type === "code" ? "Code" : "Markdown"}</span>
                {cell.type === "code" && (
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => executeCell(cell.id)}>
                    <Play className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                onClick={() => deleteCell(cell.id)}
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>

            <div
              className={`font-mono text-sm p-2 rounded-md ${cell.type === "code" ? "bg-muted" : ""}`}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => updateCellContent(cell.id, e.currentTarget.innerText)}
            >
              {cell.content}
            </div>

            {cell.output && (
              <div className="mt-2 p-2 bg-muted/50 rounded-md text-sm">
                <div className="text-xs text-muted-foreground mb-1">Output:</div>
                <pre className="whitespace-pre-wrap font-mono text-xs">{cell.output}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

