"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Story, Location } from "@/types/game"

interface StoryPanelProps {
  currentStory: Story
  currentLocation: Location
}

export default function StoryPanel({ currentStory, currentLocation }: StoryPanelProps) {
  const [showingFullStory, setShowingFullStory] = useState(false)

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <Card className="bg-gray-700 border-gray-600">
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{currentStory.title}</h3>

          <div className="prose prose-sm prose-invert max-w-none">
            {showingFullStory ? (
              <p className="text-gray-300">{currentStory.content}</p>
            ) : (
              <p className="text-gray-300">{currentStory.content.substring(0, 150)}...</p>
            )}
          </div>

          {currentStory.content.length > 150 && (
            <Button
              variant="link"
              onClick={() => setShowingFullStory(!showingFullStory)}
              className="p-0 h-auto text-emerald-400"
            >
              {showingFullStory ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
            </Button>
          )}
        </div>
      </Card>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Apa yang akan kamu lakukan?</h3>
        <div className="grid grid-cols-1 gap-2">
          {currentStory.choices.map((choice, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start text-left h-auto py-3 border-gray-600 hover:bg-gray-700"
            >
              {choice.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
