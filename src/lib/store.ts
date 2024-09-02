import { create } from 'zustand'

const useStore = create((set) => ({
  pokemons: [],
  removeAllPokemons: () => set({ pokemons: [] }),
  updatePokemons: (newPokemons) => set({ pokemons: newPokemons }),
}))
