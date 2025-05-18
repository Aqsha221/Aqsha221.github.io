"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sword, Shield, Pill, Scroll, Package, Info } from "lucide-react"
import type { Item } from "@/types/game"

interface InventoryPanelProps {
  inventory: {
    items: Item[]
    gold: number
    equippedItems: {
      weapon: Item | null
      armor: Item | null
      accessory: Item | null
    }
  }
}

export default function InventoryPanel({ inventory }: InventoryPanelProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const itemCategories = {
    all: inventory.items,
    equipment: inventory.items.filter(
      (item) => item.type === "weapon" || item.type === "armor" || item.type === "accessory",
    ),
    consumable: inventory.items.filter((item) => item.type === "consumable"),
    quest: inventory.items.filter((item) => item.type === "quest"),
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Inventaris</h3>
        <div className="flex items-center text-yellow-400">
          <span className="font-medium">{inventory.gold}</span>
          <span className="ml-1">Emas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4 bg-gray-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-600">
                Semua
              </TabsTrigger>
              <TabsTrigger value="equipment" className="data-[state=active]:bg-gray-600">
                <Sword className="h-4 w-4 mr-1" /> Perlengkapan
              </TabsTrigger>
              <TabsTrigger value="consumable" className="data-[state=active]:bg-gray-600">
                <Pill className="h-4 w-4 mr-1" /> Konsumsi
              </TabsTrigger>
              <TabsTrigger value="quest" className="data-[state=active]:bg-gray-600">
                <Scroll className="h-4 w-4 mr-1" /> Misi
              </TabsTrigger>
            </TabsList>

            {Object.entries(itemCategories).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="bg-gray-700 p-2 rounded-lg h-[300px] overflow-y-auto">
                  {items.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {items.map((item, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className={`h-auto flex flex-col items-center justify-center p-2 space-y-1 rounded border ${
                            selectedItem?.id === item.id
                              ? "border-emerald-500 bg-gray-800"
                              : "border-transparent hover:bg-gray-800"
                          }`}
                          onClick={() => setSelectedItem(item)}
                        >
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-full">
                            {item.type === "weapon" && <Sword className="h-5 w-5 text-orange-500" />}
                            {item.type === "armor" && <Shield className="h-5 w-5 text-gray-400" />}
                            {item.type === "consumable" && <Pill className="h-5 w-5 text-purple-500" />}
                            {item.type === "quest" && <Scroll className="h-5 w-5 text-yellow-500" />}
                            {item.type === "accessory" && <Package className="h-5 w-5 text-blue-500" />}
                          </div>
                          <span className="text-xs font-medium text-center">{item.name}</span>
                          {item.quantity > 1 && <span className="text-xs text-gray-400">x{item.quantity}</span>}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <p>Tidak ada item ditemukan</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div>
          <Card className="bg-gray-700 border-gray-600 h-full">
            <CardContent className="p-4">
              {selectedItem ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full">
                      {selectedItem.type === "weapon" && <Sword className="h-5 w-5 text-orange-500" />}
                      {selectedItem.type === "armor" && <Shield className="h-5 w-5 text-gray-400" />}
                      {selectedItem.type === "consumable" && <Pill className="h-5 w-5 text-purple-500" />}
                      {selectedItem.type === "quest" && <Scroll className="h-5 w-5 text-yellow-500" />}
                      {selectedItem.type === "accessory" && <Package className="h-5 w-5 text-blue-500" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{selectedItem.name}</h4>
                      <p className="text-xs text-gray-400">
                        {selectedItem.rarity} {selectedItem.type}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300">{selectedItem.description}</p>

                  {(selectedItem.type === "weapon" ||
                    selectedItem.type === "armor" ||
                    selectedItem.type === "accessory") && (
                    <div className="space-y-1">
                      <h5 className="text-xs font-medium">Statistik</h5>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {selectedItem.stats?.attack && (
                          <div className="flex items-center">
                            <Sword className="h-3 w-3 mr-1 text-orange-500" />
                            <span>ATK +{selectedItem.stats.attack}</span>
                          </div>
                        )}
                        {selectedItem.stats?.defense && (
                          <div className="flex items-center">
                            <Shield className="h-3 w-3 mr-1 text-gray-400" />
                            <span>DEF +{selectedItem.stats.defense}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex space-x-2">
                    {selectedItem.type === "consumable" && (
                      <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Gunakan
                      </Button>
                    )}
                    {(selectedItem.type === "weapon" ||
                      selectedItem.type === "armor" ||
                      selectedItem.type === "accessory") && (
                      <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Pakai
                      </Button>
                    )}
                    {selectedItem.sellPrice > 0 && (
                      <Button size="sm" variant="outline" className="w-full">
                        Jual ({selectedItem.sellPrice} G)
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
                  <Info className="h-8 w-8" />
                  <p className="text-sm">Pilih item untuk melihat detail</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="p-3 flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full">
              <Sword className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Senjata</p>
              <p className="text-xs text-gray-400">
                {inventory.equippedItems.weapon ? inventory.equippedItems.weapon.name : "Tidak Ada"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="p-3 flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full">
              <Shield className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Baju Zirah</p>
              <p className="text-xs text-gray-400">
                {inventory.equippedItems.armor ? inventory.equippedItems.armor.name : "Tidak Ada"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="p-3 flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full">
              <Package className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Aksesoris</p>
              <p className="text-xs text-gray-400">
                {inventory.equippedItems.accessory ? inventory.equippedItems.accessory.name : "Tidak Ada"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
