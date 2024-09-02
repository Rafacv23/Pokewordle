import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Pokemon {
  name: string
  url: string
}

export interface State {
  pokemons: Pokemon[]
  selectedPokemon: Pokemon | null
  getAllPokemons: () => Promise<void>
  reset: () => void
}

export const usePokemonStore = create<State>()(
  persist(
    (set) => ({
      pokemons: [],
      selectedPokemon: null,
      getAllPokemons: async () => {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        )
        const data = await response.json()

        console.log("Pokemons received")
        set({ pokemons: data.results })
      },
      reset: () => {
        set({ pokemons: [], selectedPokemon: null })
      },
    }),
    {
      name: "pokemon-storage", // unique name
    }
  )
)
