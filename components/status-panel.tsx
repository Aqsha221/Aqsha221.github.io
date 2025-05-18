import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sword, Shield, Zap, Star, Heart, Award } from "lucide-react"
import type { Character } from "@/types/game"

interface StatusPanelProps {
  character: Character
}

export default function StatusPanel({ character }: StatusPanelProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <Card className="bg-gray-700 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-emerald-400">Status Karakter</CardTitle>
          <CardDescription>
            {character.name} - Pemburu Peringkat-{character.rank}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-yellow-500" /> Level
                </span>
                <span>{character.level}</span>
              </div>
              <Progress value={(character.exp / character.expToNextLevel) * 100} className="h-2" />
              <div className="text-xs text-right text-gray-400">
                {character.exp}/{character.expToNextLevel} EXP
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-purple-500" /> Poin Skill
                </span>
                <span>{character.skillPoints}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Statistik Dasar</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <span className="flex items-center">
                  <Sword className="h-4 w-4 mr-2 text-orange-500" /> Serangan
                </span>
                <span>{character.stats.attack}</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <span className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-gray-400" /> Pertahanan
                </span>
                <span>{character.stats.defense}</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <span className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-yellow-500" /> Kecepatan
                </span>
                <span>{character.stats.speed}</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-purple-500" /> Kecerdasan
                </span>
                <span>{character.stats.intelligence}</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <span className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-red-500" /> Vitalitas
                </span>
                <span>{character.stats.vitality}</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800 p-2 rounded">
                <span className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-blue-500" /> Keberuntungan
                </span>
                <span>{character.stats.luck}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Kemampuan</h4>
            {character.skills.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {character.skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                    <span className="flex items-center">
                      <span
                        className={`h-2 w-2 rounded-full mr-2 ${skill.type === "active" ? "bg-emerald-500" : "bg-amber-500"}`}
                      ></span>
                      {skill.name}
                    </span>
                    <span className="text-xs">Lv. {skill.level}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400 italic">Belum ada kemampuan yang dipelajari</div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Gelar</h4>
            {character.titles.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {character.titles.map((title, index) => (
                  <div key={index} className="bg-gray-800 p-2 rounded">
                    <div className="font-medium">{title.name}</div>
                    <div className="text-xs text-gray-400">{title.description}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400 italic">Belum ada gelar yang diperoleh</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
