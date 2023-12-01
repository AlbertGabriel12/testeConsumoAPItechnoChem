import './App.css'

import Spinner from '../components/spinner/Spinner'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import Tabela from '../components/Tabela/Tabela';

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["dados"],
    queryFn: () => axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/distritos?view=nivelado")
  })

  if (isLoading === true) {
    return <Spinner />
  }

  const dados = data.data

  function returnArrayChunks(arrayParam, quantPedacos) {
    const arrayComVariosPedacos = []
    for (let i = 0; i < arrayParam.length; i += quantPedacos) {
      arrayComVariosPedacos.push(arrayParam.slice(i, i + quantPedacos))
    }
    return arrayComVariosPedacos
  }
  const conjuntoDeDados = returnArrayChunks(dados, 100)

  return (
    <Tabela dados={conjuntoDeDados} />
  )
}

export default App
