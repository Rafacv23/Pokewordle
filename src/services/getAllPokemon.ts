export default async function getAllPokemon() {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
  )

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data = await res.json()

  console.log('Todos los pokemon recuperados')
  return data
}
