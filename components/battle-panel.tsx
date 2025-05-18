"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Sword, Shield, Zap, Heart, Pill } from "lucide-react"
import type { Character, Enemy } from "@/types/game"

interface BattlePanelProps {
  enemy: Enemy
  character: Character
}

export default function BattlePanel({ enemy, character }: BattlePanelProps) {
  const [battleLog, setBattleLog] = useState<string[]>([`${enemy.name} muncul!`, "Apa yang akan kamu lakukan?"])

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-red-400">{enemy.name}</h4>
              <div className="px-2 py-0.5 bg-red-900 text-red-300 text-xs rounded-full">Lv. {enemy.level}</div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-1" /> HP
                </span>
                <span>
                  {enemy.currentHP}/{enemy.maxHP}
                </span>
              </div>
              <Progress
                value={(enemy.currentHP / enemy.maxHP) * 100}
                className="h-2 bg-gray-800"
                indicatorClassName="bg-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center">
                <Sword className="h-3 w-3 text-orange-500 mr-1" />
                <span>ATK: {enemy.stats.attack}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-3 w-3 text-gray-400 mr-1" />
                <span>DEF: {enemy.stats.defense}</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-3 w-3 text-yellow-500 mr-1" />
                <span>SPD: {enemy.stats.speed}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-emerald-400">{character.name}</h4>
              <div className="px-2 py-0.5 bg-emerald-900 text-emerald-300 text-xs rounded-full">
                Lv. {character.level}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-1" /> HP
                </span>
                <span>
                  {character.currentHP}/{character.maxHP}
                </span>
              </div>
              <Progress
                value={(character.currentHP / character.maxHP) * 100}
                className="h-2 bg-gray-800"
                indicatorClassName="bg-red-500"
              />
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Zap className="h-4 w-4 text-blue-500 mr-1" /> MP
                </span>
                <span>
                  {character.currentMP}/{character.maxMP}
                </span>
              </div>
              <Progress
                value={(character.currentMP / character.maxMP) * 100}
                className="h-2 bg-gray-800"
                indicatorClassName="bg-blue-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-700 border-gray-600">
        <CardContent className="p-4">
          <div className="h-32 overflow-y-auto mb-4 bg-gray-800 rounded p-2 text-sm">
            {battleLog.map((log, index) => (
              <p key={index} className="mb-1">
                {log}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Sword className="h-4 w-4 mr-2" /> Serang
              </Button>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled={character.skills.length === 0}>
                <Zap className="h-4 w-4 mr-2" /> Kemampuan
              </Button>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Pill className="h-4 w-4 mr-2" /> Item
              </Button>

              <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-900/20">
                Lari
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
