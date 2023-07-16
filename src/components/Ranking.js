import "./Ranking.css";

import pos0 from "../assets/pos0.png";
import pos1 from "../assets/pos1.png";
import pos2 from "../assets/pos2.png";
import pos3 from "../assets/pos3.png";

export default function Ranking({ resultado, jogadores }) {
  const medalhas = [pos0, pos1, pos2, pos3];

  function definirVencedor() {
    const pontosOrdenados = Object.entries(resultado).sort(
      ([, valorA], [, valorB]) => valorB - valorA
    );
    return pontosOrdenados;
  }

  const ordenado = definirVencedor();

  function reiniciarJogo() {
    window.location.reload();
  }

  return (
    <div className="ranking">
      <div className="reiniciar-game">
        <button onClick={reiniciarJogo} className="botao-reiniciar">
          Reinicar Jogo
        </button>
      </div>

      {ordenado.map(([index, ponto], i) => (
        <div className="itens-resultado">
          <div className="imagem-item">
            <img src={medalhas[i]} alt={`Posição ${i}`} />
          </div>
          <div className="nome-jogador" key={index}>
            {jogadores[index]}
          </div>
          <div className="pontos-jogador">{ponto}</div>
        </div>
      ))}
    </div>
  );
}
