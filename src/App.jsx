import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [raposas, setRaposas] = useState([])
  const [imagemSelecionada, setImagemSelecionada] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const total = 5

  const carregarRaposas = async () => {
    try {
      setCarregando(true);
      const listaTemporaria = []
      
      for (let i = 0; i < total; i++) {
        const response = await fetch('https://randomfox.ca/floof/')
        const data = await response.json()
        listaTemporaria.push(data.image)
      }

      setRaposas(listaTemporaria)
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  const atualizarFotos = () => {
    setRaposas([]);
    carregarRaposas();
  }

  useEffect(() => {
    carregarRaposas()
  }, [])

  return (
      <div className="container-principal">
        <h1 className="titulo">Galeria de Raposas</h1>
        <p className="subtitulo">Clique em uma Imagem para Ampliar!</p>
        {carregando ? (
          <div className="carregamento-container">
            <div className="spinner"></div>
            <p className="texto-carregando">Buscando raposas...</p>
          </div>
        ) : ( 
        <div className="galeria-fotos">
          {raposas.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt="Raposa" 
              className="foto-raposa"
              onClick={() => setImagemSelecionada(url)} 
              />
            ))}
          </div>
        )}

        <button className="botao" onClick={atualizarFotos}>Atualizar Página</button>

        {imagemSelecionada && (
          <div className="modal" onClick={() => setImagemSelecionada(null)}>
            <span className="fechar">&times;</span>
            <img className="modal-conteudo" src={imagemSelecionada} alt="Raposa Ampliada" />
          </div>
        )}
      </div>
    )
  }

export default App