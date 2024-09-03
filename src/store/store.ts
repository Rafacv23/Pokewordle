import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface PokemonType {
  type: {
    name: string
  }
}

export interface Pokemon {
  name: string
  url: string
  id?: number
  weight?: number
  height?: number
  sprites?: string
  types?: PokemonType[]
  evolvesFrom?: string
  generation?: string
}

export interface State {
  pokemons: Pokemon[]
  selectedPokemon: Pokemon | null
  pokemonsByTheUser: Pokemon[]
  addPokemonsByTheUser: (pokemon: Pokemon) => void
  getAllPokemons: () => Promise<void>
  selectPokemon: () => Promise<void>
  reset: () => void
}

export const usePokemonStore = create<State>()(
  persist(
    (set, get) => ({
      pokemons: [],
      selectedPokemon: null,
      pokemonsByTheUser: [],
      addPokemonsByTheUser: async (pokemon: Pokemon) => {
        const res = await fetch(pokemon.url)

        if (!res.ok) {
          throw new Error("Failed to fetch data")
        }

        const pokemonData = await res.json()

        const speciesUrl = pokemonData.species.url // To get the generation of the pokemon and the evos

        const response = await fetch(speciesUrl)

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const speciesData = await response.json()

        const generation = await speciesData.generation.name
        const evolvesFrom = await speciesData.evolves_from_species

        const filteredPokemonData = {
          id: pokemonData.id,
          name: pokemonData.name,
          url: pokemonData.url,
          weight: pokemonData.weight,
          height: pokemonData.height,
          sprites: pokemonData.sprites.front_default,
          types: pokemonData.types.map((type: PokemonType) => type),
          generation: generation,
          evolvesFrom: evolvesFrom ? evolvesFrom.name : null,
        }

        set((state) => ({
          ...state,
          pokemonsByTheUser: [...state.pokemonsByTheUser, filteredPokemonData],
        }))
      },
      getAllPokemons: async () => {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        )

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()
        console.log("Pokemons received")

        set({ pokemons: data.results })

        const pokemons = get().pokemons

        if (pokemons.length === 0) {
          throw new Error("No pokemons available")
        }

        let selectedPokemonData = null
        while (!selectedPokemonData) {
          const selectedPokemon =
            pokemons[Math.floor(Math.random() * pokemons.length)]
          const res = await fetch(selectedPokemon.url)

          if (!res.ok) {
            throw new Error("Failed to fetch data")
          }

          const pokemonData = await res.json()

          if (pokemonData.is_default) {
            const speciesUrl = pokemonData.species.url
            const speciesRes = await fetch(speciesUrl)

            if (!speciesRes.ok) {
              throw new Error("Failed to fetch data")
            }

            const speciesData = await speciesRes.json()
            const generation = speciesData.generation.name
            const evolvesFrom = speciesData.evolves_from_species

            selectedPokemonData = {
              id: pokemonData.id,
              name: pokemonData.name,
              url: pokemonData.url,
              weight: pokemonData.weight,
              height: pokemonData.height,
              sprites: pokemonData.sprites.front_default,
              types: pokemonData.types.map(
                (type: PokemonType) => type.type.name
              ),
              generation: generation,
              evolvesFrom: evolvesFrom ? evolvesFrom.name : null,
            }
          }
        }

        set({ selectedPokemon: selectedPokemonData })
      },
      selectPokemon: async () => {
        const pokemons = get().pokemons
        if (pokemons.length > 0) {
          const selectedPokemon =
            pokemons[Math.floor(Math.random() * pokemons.length)]
          set({ selectedPokemon: selectedPokemon })
        }
      },
      reset: () => {
        set({ pokemons: [], selectedPokemon: null, pokemonsByTheUser: [] })
      },
    }),
    {
      name: "pokemon-storage", // unique name
    }
  )
)
