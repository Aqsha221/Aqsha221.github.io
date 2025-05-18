export interface Character {
  name: string
  level: number
  exp: number
  expToNextLevel: number
  rank: string
  currentHP: number
  maxHP: number
  currentMP: number
  maxMP: number
  skillPoints: number
  stats: {
    attack: number
    defense: number
    speed: number
    intelligence: number
    vitality: number
    luck: number
  }
  skills: Skill[]
  titles: Title[]
}

export interface Skill {
  id: string
  name: string
  description: string
  level: number
  type: "active" | "passive"
  mpCost?: number
  cooldown?: number
  effect?: any
}

export interface Title {
  id: string
  name: string
  description: string
  bonuses?: {
    [key: string]: number
  }
}

export interface Item {
  id: string
  name: string
  description: string
  type: "weapon" | "armor" | "accessory" | "consumable" | "quest" | "material"
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythic"
  stats?: {
    attack?: number
    defense?: number
    speed?: number
    intelligence?: number
    vitality?: number
    luck?: number
  }
  effect?: {
    type: string
    value: number
  }
  sellPrice: number
  quantity: number
}

export interface Quest {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard" | "Impossible"
  location: string
  objectives: {
    description: string
    completed: boolean
    current?: number
    target?: number
  }[]
  rewards: {
    exp: number
    gold: number
    items?: string[]
  }
  timeLimit: string | null
  isMainQuest: boolean
  completedDate?: string
}

export interface Story {
  id: string
  title: string
  content: string
  choices: {
    text: string
    nextStoryId: string
    condition?: {
      type: string
      value: any
    }
  }[]
}

export interface Location {
  id: string
  name: string
  description: string
  connections: string[]
  npcs: string[]
}

export interface Enemy {
  id: string
  name: string
  level: number
  currentHP: number
  maxHP: number
  stats: {
    attack: number
    defense: number
    speed: number
  }
  skills: {
    name: string
    damage: number
    effect?: string
  }[]
  drops: {
    item: string
    chance: number
  }[]
  expReward: number
  goldReward: number
}
