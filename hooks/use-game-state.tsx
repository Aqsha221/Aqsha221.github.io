"use client"

import { useState } from "react"
import type { Character, Quest, Story, Location, Enemy } from "@/types/game"

// Sample initial data
const initialCharacter: Character = {
  name: "Sung Jin-Woo",
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  rank: "E",
  currentHP: 100,
  maxHP: 100,
  currentMP: 50,
  maxMP: 50,
  skillPoints: 0,
  stats: {
    attack: 10,
    defense: 8,
    speed: 7,
    intelligence: 5,
    vitality: 10,
    luck: 3,
  },
  skills: [],
  titles: [],
}

const initialInventory = {
  items: [
    {
      id: "item1",
      name: "Belati Berkarat",
      description: "Belati usang dengan mata pisau yang tumpul. Lebih baik daripada tidak ada.",
      type: "weapon",
      rarity: "Common",
      stats: {
        attack: 5,
      },
      sellPrice: 10,
      quantity: 1,
    },
    {
      id: "item2",
      name: "Rompi Kulit",
      description: "Perlindungan dasar yang terbuat dari kulit tipis.",
      type: "armor",
      rarity: "Common",
      stats: {
        defense: 3,
      },
      sellPrice: 15,
      quantity: 1,
    },
    {
      id: "item3",
      name: "Ramuan Kesehatan",
      description: "Memulihkan 50 HP saat dikonsumsi.",
      type: "consumable",
      rarity: "Common",
      effect: {
        type: "heal",
        value: 50,
      },
      sellPrice: 20,
      quantity: 3,
    },
    {
      id: "item4",
      name: "Pecahan Batu Gerbang",
      description: "Pecahan misterius dari gerbang dungeon. Tampaknya berharga bagi para peneliti.",
      type: "quest",
      rarity: "Uncommon",
      sellPrice: 0,
      quantity: 1,
    },
  ],
  gold: 100,
  equippedItems: {
    weapon: null,
    armor: null,
    accessory: null,
  },
}

const initialQuests: { active: Quest[]; completed: Quest[] } = {
  active: [
    {
      id: "quest1",
      title: "Langkah Pertama sebagai Pemburu",
      description: "Selesaikan dungeon peringkat-E pertamamu untuk membuktikan kelayakanmu sebagai Pemburu.",
      difficulty: "Easy",
      location: "Lapangan Latihan",
      objectives: [
        {
          description: "Masuk ke dungeon peringkat-E",
          completed: false,
        },
        {
          description: "Kalahkan 5 monster",
          completed: false,
          current: 0,
          target: 5,
        },
        {
          description: "Kembali ke Asosiasi Pemburu",
          completed: false,
        },
      ],
      rewards: {
        exp: 100,
        gold: 500,
        items: ["Lencana Pemburu Dasar"],
      },
      timeLimit: null,
      isMainQuest: true,
    },
    {
      id: "quest2",
      title: "Mengumpulkan Tanaman Obat",
      description: "Apoteker lokal membutuhkan tanaman khusus yang hanya tumbuh di area yang dipenuhi monster.",
      difficulty: "Easy",
      location: "Hutan Ujian",
      objectives: [
        {
          description: "Kumpulkan Lumut Biru",
          completed: false,
          current: 0,
          target: 3,
        },
        {
          description: "Kumpulkan Jamur Merah",
          completed: false,
          current: 0,
          target: 5,
        },
      ],
      rewards: {
        exp: 50,
        gold: 200,
        items: ["Ramuan Penyembuhan Kecil x2"],
      },
      timeLimit: "2 hari",
      isMainQuest: false,
    },
  ],
  completed: [],
}

const initialLocations: Location[] = [
  {
    id: "loc1",
    name: "Asosiasi Pemburu",
    description: "Markas tempat para Pemburu berkumpul untuk menerima misi dan informasi.",
    connections: ["Lapangan Latihan", "Pasar", "Aula Guild"],
    npcs: ["Presiden Asosiasi Go Gun-Hee", "Woo Jin-Cheol"],
  },
  {
    id: "loc2",
    name: "Lapangan Latihan",
    description: "Fasilitas tempat para Pemburu dapat melatih kemampuan mereka dan bersiap untuk dungeon.",
    connections: ["Asosiasi Pemburu", "Dungeon Peringkat-E"],
    npcs: ["Instruktur Latihan Kim"],
  },
  {
    id: "loc3",
    name: "Pasar",
    description: "Area ramai tempat para pedagang menjual berbagai item, senjata, dan ramuan.",
    connections: ["Asosiasi Pemburu", "Area Perumahan"],
    npcs: ["Pandai Besi Baek", "Penjual Ramuan Min"],
  },
]

const initialStories: Story[] = [
  {
    id: "story1",
    title: "Pemburu Terlemah",
    content:
      "Kamu adalah Sung Jin-Woo, Pemburu peringkat-E terlemah yang dikenal di seluruh Asosiasi. Hampir tidak menghasilkan cukup uang untuk membayar tagihan rumah sakit ibumu, kamu tetap menghadapi dungeon berbahaya meskipun kemampuanmu lemah. Hari ini, kamu dipanggil ke Asosiasi Pemburu untuk tugas baru. Resepsionis melihatmu dengan campuran rasa kasihan dan khawatir saat dia menyerahkan detail dungeon peringkat-E yang perlu dibersihkan. 'Hati-hati,' katanya. 'Bahkan dungeon peringkat-E bisa berbahaya untuk seseorang sepertimu.'",
    choices: [
      {
        text: "Terima tugas dungeon",
        nextStoryId: "story2",
      },
      {
        text: "Tanyakan apakah ada misi yang lebih aman",
        nextStoryId: "story3",
      },
      {
        text: "Kunjungi Lapangan Latihan terlebih dahulu untuk bersiap",
        nextStoryId: "story4",
      },
      {
        text: "Pergi ke Pasar untuk membeli perlengkapan",
        nextStoryId: "story5",
      },
    ],
  },
]

const sampleEnemy: Enemy = {
  id: "enemy1",
  name: "Pengintai Goblin",
  level: 3,
  currentHP: 50,
  maxHP: 50,
  stats: {
    attack: 8,
    defense: 5,
    speed: 10,
  },
  skills: [],
  drops: [
    {
      item: "Telinga Goblin",
      chance: 0.7,
    },
    {
      item: "Belati Kasar",
      chance: 0.3,
    },
    {
      item: "Kantong Kecil Emas",
      chance: 0.1,
    },
  ],
  expReward: 20,
  goldReward: 15,
}

export function useGameState() {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start")
  const [character, setCharacter] = useState<Character>(initialCharacter)
  const [inventory, setInventory] = useState(initialInventory)
  const [quests, setQuests] = useState(initialQuests)
  const [currentLocation, setCurrentLocation] = useState<Location>(initialLocations[0])
  const [currentStory, setCurrentStory] = useState<Story>(initialStories[0])
  const [inBattle, setInBattle] = useState(false)
  const [enemy, setEnemy] = useState<Enemy | null>(null)

  const startGame = () => {
    setGameState("playing")
  }

  // For demonstration purposes, we'll simulate a battle
  const startBattle = () => {
    setInBattle(true)
    setEnemy(sampleEnemy)
  }

  const endBattle = (won: boolean) => {
    setInBattle(false)
    setEnemy(null)

    if (won) {
      // Add rewards, exp, etc.
    }
  }

  return {
    gameState,
    startGame,
    character,
    inventory,
    quests,
    currentLocation,
    currentStory,
    inBattle,
    enemy,
    startBattle,
    endBattle,
  }
}
