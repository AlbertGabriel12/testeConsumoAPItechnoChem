import { useEffect, useState } from "react"

import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

export default function Tabela(props) {
    const dados = props.dados

    const [indexDados, setIndexDados] = useState(0)
    const [nomeMunicipio, setNomeMunicipio] = useState("")
    const [dadosFiltrados, setDadosFiltrados] = useState(dados[indexDados])

    function handlePesquisaNomeMunicipio(event) {
        const novoTermoPesquisa = event.target.value
        setNomeMunicipio(novoTermoPesquisa)

        const itensFiltrados = dados[indexDados].filter(item => item["municipio-nome"].toLowerCase().includes(novoTermoPesquisa.toLowerCase()))

        setDadosFiltrados(itensFiltrados)
    }

    useEffect(() => {
        setDadosFiltrados(dados[indexDados])
    }, [indexDados])

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className='containerTabela'>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8, alignSelf: "flex-end" }}>
                    <CiSearch size={24} style={{ marginRight: 4 }} />
                    <input className='inputNomeMunicipio' type='text' placeholder='Nome do Município' value={nomeMunicipio} onChange={handlePesquisaNomeMunicipio} />
                </div>
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
                            dadosFiltrados.map((item) => {
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

                <div className="footer">
                    <h2 style={{ marginLeft: 32 }}>
                        Página {indexDados + 1} de {dados.length}
                    </h2>

                    <div className="containerBtns">
                        <button onClick={() => {
                            if (indexDados > 0) setIndexDados(indexDados - 1)
                        }} >
                            <FaAngleLeft size={16} />
                        </button>

                        <button onClick={() => {
                            if (indexDados < dados.length - 1) setIndexDados(indexDados + 1)
                        }} >
                            <FaAngleRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}