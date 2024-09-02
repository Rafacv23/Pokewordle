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
    (set, get) => ({
      pokemons: [],
      selectedPokemon: null,
      getAllPokemons: async () => {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        )
        const data = await response.json()

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        console.log("Pokemons received")

        // Actualiza el estado con los datos obtenidos
        set({ pokemons: data.results })

        // Obtén la lista de pokemons actualizada
        const pokemons = get().pokemons

        // Selecciona un Pokémon aleatorio
        const selectedPokemon =
          pokemons[Math.floor(Math.random() * pokemons.length)]
        // Actualiza el estado con el Pokémon seleccionado
        set({ selectedPokemon })
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
