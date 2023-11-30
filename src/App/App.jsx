import './App.css'

import Spinner from '../components/spinner/Spinner'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["dados"],
    queryFn: () => axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/distritos?view=nivelado")
  })

  if (isLoading === true) {
    return <Spinner />
  }

  const dados = data.data

  return (
    <table>
      <thead>
        <tr>
          <th>Id do Município</th>
          <th>Nome do Município</th>
          <th>Id da Região Imediata</th>
          <th>Nome da Região Imediata</th>
          <th>Nome da Região Intermediária</th>
          <th>UF sigla</th>
          <th>UF nome</th>
        </tr>
      </thead>

      <tbody>
        {
          dados.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item["municipio-id"]}</td>
                <td>{item["municipio-nome"]}</td>
                <td>{item["regiao-imediata-id"]}</td>
                <td>{item["regiao-imediata-nome"]}</td>
                <td>{item["regiao-intermediaria-nome"]}</td>
                <td>{item["UF-sigla"]}</td>
                <td>{item["UF-nome"]}</td>
              </tr>
            )
          })
        }

      </tbody>
    </table>
  )
}

export default App
