"use client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sword, Shield, Heart, Zap, Star, Scroll, Map, Package, Award } from "lucide-react"
import StatusPanel from "./status-panel"
import StoryPanel from "./story-panel"
import InventoryPanel from "./inventory-panel"
import QuestPanel from "./quest-panel"
import BattlePanel from "./battle-panel"
import { useGameState } from "@/hooks/use-game-state"

export default function Game() {
  const { gameState, startGame, character, inventory, quests, currentLocation, currentStory, inBattle, enemy } =
    useGameState()

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-center my-6 text-emerald-400">Solo Leveling: Petualangan Teks</h1>

      {gameState === "start" && (
        <div className="flex flex-col items-center justify-center space-y-6 py-10">
          <div className="max-w-md text-center space-y-4">
            <h2 className="text-2xl font-bold text-emerald-300">Selamat Datang di Dunia Para Pemburu</h2>
            <p className="text-gray-300">
              Di dunia di mana portal menghubungkan realitas kita dengan dungeon yang dipenuhi monster, kamu adalah
              Pemburu peringkat-E yang berjuang untuk bertahan hidup. Akankah kamu bangkit menjadi pemburu terkuat di
              dunia?
            </p>
          </div>
          <Button onClick={() => startGame()} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2">
            Mulai Petualanganmu
          </Button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{character.name}</span>
                <span className="px-2 py-1 bg-emerald-800 text-emerald-200 text-xs rounded-full">
                  {character.rank}-Rank Hunter
                </span>
              </div>
              <div className="text-sm text-gray-400">Level {character.level}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-500 mr-1" />
                    <span>HP</span>
                  </div>
                  <span>
                    {character.currentHP}/{character.maxHP}
                  </span>
                </div>
                <Progress
                  value={(character.currentHP / character.maxHP) * 100}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-red-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-blue-500 mr-1" />
                    <span>MP</span>
                  </div>
                  <span>
                    {character.currentMP}/{character.maxMP}
                  </span>
                </div>
                <Progress
                  value={(character.currentMP / character.maxMP) * 100}
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Sword className="h-4 w-4 text-orange-500 mr-1" />
                <span>ATK: {character.stats.attack}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-gray-400 mr-1" />
                <span>DEF: {character.stats.defense}</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                <span>SPD: {character.stats.speed}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-purple-500 mr-1" />
                <span>INT: {character.stats.intelligence}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="story" className="w-full">
            <TabsList className="grid grid-cols-5 bg-gray-800">
              <TabsTrigger value="story" className="data-[state=active]:bg-gray-700">
                <Scroll className="h-4 w-4 mr-1" /> Cerita
              </TabsTrigger>
              <TabsTrigger value="status" className="data-[state=active]:bg-gray-700">
                <Star className="h-4 w-4 mr-1" /> Status
              </TabsTrigger>
              <TabsTrigger value="inventory" className="data-[state=active]:bg-gray-700">
                <Package className="h-4 w-4 mr-1" /> Inventaris
              </TabsTrigger>
              <TabsTrigger value="quests" className="data-[state=active]:bg-gray-700">
                <Award className="h-4 w-4 mr-1" /> Misi
              </TabsTrigger>
              <TabsTrigger value="map" className="data-[state=active]:bg-gray-700">
                <Map className="h-4 w-4 mr-1" /> Peta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="mt-0">
              {inBattle ? (
                <BattlePanel enemy={enemy} character={character} />
              ) : (
                <StoryPanel currentStory={currentStory} currentLocation={currentLocation} />
              )}
            </TabsContent>

            <TabsContent value="status" className="mt-0">
              <StatusPanel character={character} />
            </TabsContent>

            <TabsContent value="inventory" className="mt-0">
              <InventoryPanel inventory={inventory} />
            </TabsContent>

            <TabsContent value="quests" className="mt-0">
              <QuestPanel quests={quests} />
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Current Location: {currentLocation.name}</h3>
                <p className="text-gray-400 mb-4">{currentLocation.description}</p>

                <div className="grid grid-cols-2 gap-2">
                  {currentLocation.connections.map((location, index) => (
                    <Button key={index} variant="outline" className="justify-start">
                      <Map className="h-4 w-4 mr-2" />
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
