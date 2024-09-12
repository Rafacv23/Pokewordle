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
  id: number
  weight: number
  height: number
  sprites: string
  types: string[]
  is_default: boolean
  evolvesFrom: string
  generation: string
}

export interface State {
  loading: boolean
  setLoading: (loading: boolean) => void
  turn: number
  increaseTurn: () => void
  pokemons: Pokemon[]
  selectedPokemon: Pokemon | null
  pokemonsByTheUser: Pokemon[]
  selectedGenerations: string[]
  toggleGeneration: (generation: string) => void
  addPokemonsByTheUser: (pokemon: Pokemon) => void
  getAllPokemons: () => Promise<void>
  selectPokemon: () => Promise<void>
  reset: () => void
}

export const usePokemonStore = create<State>()(
  persist(
    (set, get) => ({
      loading: false,
      setLoading: (loading: boolean) => {
        set({ loading })
      },
      turn: 0,
      increaseTurn: () => {
        set((state) => ({ turn: state.turn + 1 }))
      },
      pokemons: [],
      selectedPokemon: null,
      pokemonsByTheUser: [],
      selectedGenerations: [
        "generation-i",
        "generation-ii",
        "generation-iii",
        "generation-iv",
        "generation-v",
        "generation-vi",
        "generation-vii",
        "generation-viii",
        "generation-ix",
      ],
      toggleGeneration: (generation: string) => {
        set((state) => ({
          selectedGenerations: state.selectedGenerations.includes(generation)
            ? state.selectedGenerations.filter((g) => g !== generation)
            : [...state.selectedGenerations, generation],
        }))
      },

      addPokemonsByTheUser: async (pokemon: Pokemon) => {
        const res = await fetch(pokemon.url)
        const pokemonData = await res.json()
        const speciesRes = await fetch(pokemonData.species.url)
        const speciesData = await speciesRes.json()

        const generation = speciesData.generation.name
        const evolvesFrom = speciesData.evolves_from_species

        const filteredPokemonData = {
          id: pokemonData.id,
          name: pokemonData.name,
          url: pokemonData.url,
          weight: pokemonData.weight,
          height: pokemonData.height,
          sprites: pokemonData.sprites.front_default,
          is_default: pokemonData.is_default,
          types: pokemonData.types.map((type: PokemonType) => type.type.name),
          generation: generation,
          evolvesFrom: evolvesFrom ? evolvesFrom.name : null,
        }

        set((state) => ({
          ...state,
          pokemonsByTheUser: [...state.pokemonsByTheUser, filteredPokemonData],
        }))
      },

      getAllPokemons: async () => {
        try {
          set({ loading: true })
          set({ pokemonsByTheUser: [] })

          const selectedGenerations = get().selectedGenerations
          if (selectedGenerations.length === 0) {
            throw new Error("No generations selected")
          }

          const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
          )

          if (!response.ok) {
            throw new Error("Failed to fetch data")
          }

          const data = await response.json()

          // Almacenar todos los Pokémon en el estado
          set({ pokemons: data.results })

          const pokemons = get().pokemons

          if (pokemons.length === 0) {
            throw new Error("No pokemons available")
          }

          let selectedPokemonData = null
          let attempts = 0

          // Bucle while hasta encontrar un Pokémon de la generación seleccionada
          while (!selectedPokemonData && attempts < 100) {
            const randomPokemon =
              pokemons[Math.floor(Math.random() * pokemons.length)]
            const res = await fetch(randomPokemon.url)

            if (!res.ok) {
              throw new Error("Failed to fetch data")
            }

            const pokemonData = await res.json()

            console.log(pokemonData)

            const speciesRes = await fetch(pokemonData.species.url)
            if (!speciesRes.ok) {
              throw new Error("Failed to fetch species data")
            }

            const speciesData = await speciesRes.json()
            const generation = speciesData.generation.name

            // Comprobar si el Pokémon pertenece a una de las generaciones seleccionadas
            if (selectedGenerations.includes(generation)) {
              selectedPokemonData = {
                id: pokemonData.id,
                name: pokemonData.name,
                url: pokemonData.url,
                weight: pokemonData.weight,
                height: pokemonData.height,
                sprites: pokemonData.sprites.front_default,
                is_default: pokemonData.is_default,
                types: pokemonData.types.map(
                  (type: PokemonType) => type.type.name
                ),
                generation: generation,
                evolvesFrom: speciesData.evolves_from_species
                  ? speciesData.evolves_from_species.name
                  : null,
              }
            }

            attempts++
          }

          if (!selectedPokemonData) {
            throw new Error("No Pokémon found from the selected generations")
          }

          set({ selectedPokemon: selectedPokemonData })
        } catch (error) {
          console.error(error)
        } finally {
          set({ loading: false })
        }
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
        set({
          pokemons: [],
          selectedPokemon: null,
          pokemonsByTheUser: [],
          turn: 0,
          selectedGenerations: [
            "generation-i",
            "generation-ii",
            "generation-iii",
            "generation-iv",
            "generation-v",
            "generation-vi",
            "generation-vii",
            "generation-viii",
            "generation-ix",
          ],
        })
      },
    }),
    {
      name: "pokemon-storage", // unique name
    }
  )
)
