import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, CheckCircle, Clock, MapPin } from "lucide-react"
import type { Quest } from "@/types/game"

interface QuestPanelProps {
  quests: {
    active: Quest[]
    completed: Quest[]
  }
}

export default function QuestPanel({ quests }: QuestPanelProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Misi</h3>

      <Tabs defaultValue="active">
        <TabsList className="grid grid-cols-2 bg-gray-700">
          <TabsTrigger value="active" className="data-[state=active]:bg-gray-600">
            Aktif ({quests.active.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-gray-600">
            Selesai ({quests.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4 space-y-3">
          {quests.active.length > 0 ? (
            quests.active.map((quest, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{quest.title}</h4>
                    <div
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        quest.difficulty === "Easy"
                          ? "bg-green-900 text-green-300"
                          : quest.difficulty === "Medium"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-red-900 text-red-300"
                      }`}
                    >
                      {quest.difficulty}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-3">{quest.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{quest.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{quest.timeLimit ? quest.timeLimit : "No time limit"}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-medium">Tujuan:</h5>
                    <div className="space-y-1">
                      {quest.objectives.map((objective, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div
                            className={`h-4 w-4 mr-2 rounded-full border ${
                              objective.completed
                                ? "bg-emerald-900 border-emerald-500"
                                : "bg-transparent border-gray-600"
                            } flex items-center justify-center`}
                          >
                            {objective.completed && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                          </div>
                          <span className={objective.completed ? "text-gray-400 line-through" : ""}>
                            {objective.description}
                            {objective.current !== undefined && objective.target !== undefined && (
                              <span className="text-gray-400 text-xs ml-1">
                                ({objective.current}/{objective.target})
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <h5 className="text-xs font-medium mb-1">Hadiah:</h5>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {quest.rewards.exp && (
                        <div className="flex items-center">
                          <Award className="h-3 w-3 mr-1 text-purple-400" />
                          <span>{quest.rewards.exp} EXP</span>
                        </div>
                      )}
                      {quest.rewards.gold && (
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">G</span>
                          <span>{quest.rewards.gold} Emas</span>
                        </div>
                      )}
                    </div>
                    {quest.rewards.items && quest.rewards.items.length > 0 && (
                      <div className="mt-1 text-xs">
                        <span className="text-gray-400">Item: </span>
                        {quest.rewards.items.map((item, idx) => (
                          <span key={idx} className="text-gray-300">
                            {item}
                            {idx < quest.rewards.items!.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Award className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>Tidak ada misi aktif</p>
              <p className="text-sm">Kunjungi Aula Guild untuk menerima misi baru</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-3">
          {quests.completed.length > 0 ? (
            quests.completed.map((quest, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 opacity-80">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{quest.title}</h4>
                    <div className="px-2 py-0.5 bg-emerald-900 text-emerald-300 text-xs rounded-full">Selesai</div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{quest.description}</p>
                  <div className="text-xs text-gray-500">Diselesaikan pada {quest.completedDate}</div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>Belum ada misi yang diselesaikan</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
