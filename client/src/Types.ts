export interface Character {
  name: string
  image: string
  player: number
  stats: Record<string, any>
}

export interface Location {
  name: string
  image: string
  stats: Record<string, any>
}