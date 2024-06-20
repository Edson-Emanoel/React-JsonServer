import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const url = "http://localhost:3000/produto"

  const [ idData, setIdData ] = useState('')
  const [ produto, setProduto ] = useState("")
  const [ valor, setValor ] = useState()
  const [ quantidade, setQuantidade ] = useState()
  const [ foto, setFoto ] = useState("")

  const [ classInserir, setClassInserir ] = useState("")
  const [ classAlterar, setClassAlterar ] = useState("sumir")
  const [ data, setData ] = useState([])

  // Carrega os Dados no JSON
  useEffect(() => {
    axios.get(url)
    .then( res => setData(res.data))

    console.log(data[0].id);
  }, [data, setData])

  // Confirma se os Campos foram preenchidos
  const Validar = (e) => {
    e.preventDefault()

    if (produto === '') {
      alert("Preencha o Campo de Nome do Produto!! ")
    } else if (valor === 0) {
      alert("Preencha o Campo de Valor do Produto!! ")
    } else if (quantidade === 0) {
      alert("Preencha o Campo de Quantidade do Produto!! ")
    } else {
      Inserir()
      alert("Produto Cadastrad com Sucesso !!")
      setProduto('')
      setValor('')
      setQuantidade('')
      setFoto('')
    }
  }

  // Cadastra os Dados no JSON
  const Inserir = () => {
    axios.post(url, {
      produto, valor, quantidade, foto
    })
  }

  // 

  // Corpo da Página(HTML)
  return (
    <div className='container'>

      <h2 className='mt-5 mb-3 text-center'>Criar Produtos</h2>

      <form className='mb-3'onSubmit={Validar} > 
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder='Nome do Produto'
              className='form-control'
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
            />
          </div>

          <div className="col">
            <input
              type="text"
              placeholder='Valor do Produto'
              className='form-control'
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          <div className="col">
            <input
              type="text"
              placeholder='Qtd do Produto'
              className='form-control'
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder='Url do Produto'
              className='form-control'
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
            />
          </div>
        </div>

        <div className="btn-group">
          <button type='submit' className={`btn btn-success rounded-1 ${classInserir}`}>Inserir</button>
          <button className={`btn btn-primary rounded-1 ${classAlterar}`}>Salvar</button>
        </div>

      </form>

      <h2 className='mt-5 mb-3 text-center'>Lista de Produtos</h2>

      <table className='table table'>
        <thead>
          <tr>
            <th scope="col" className="text-center">#</th>
            <th scope="col" className="text-center">Produto</th>
            <th scope="col" className="text-center">Valor</th>
            <th scope="col" className="text-center">Qtd</th>
            <th scope="col" className="text-center">Imagem</th>
            <th scope="col" className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          { data.map((item) => (
            <tr key={item.id}>
              <th className="text-center">{item.id}</th>
              <td className="text-center">{item.produto}</td>
              <td className="text-center">{item.valor}</td>
              <td className="text-center">{item.quantidade}</td>
              <td className="text-center"><img width={30} src={item.foto} alt="Imagem do Produto" /></td> 
              <td>
                <div className="btn-group d-flex gap-1">
                  <button className="btn btn-warning rounded-1">
                  <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="btn btn-danger rounded-1">
                    <i><i className="fa-solid fa-trash"></i></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default App