import React, { useEffect, useState } from "react";
import InputJogador from "./InputJogador";
import "./Jogadores.css";

import Ranking from "./Ranking";
import Mensagem from "./Mensagem";

export default function Jogadores() {
  const [valoresJogadores, setValoresJogadores] = useState({});
  const [rodada, setRodada] = useState(1);
  const [pontos, setPontos] = useState({});
  const [finalizar, setFinalizar] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function handleValorChange(index, novoValor) {
    if (novoValor && novoValor.trim() !== "") {
      setValoresJogadores((prevValores) => ({
        ...prevValores,
        [index]: novoValor,
      }));
    } else {
      setValoresJogadores((prevValores) => {
        const novosValores = { ...prevValores };
        delete novosValores[index];
        return novosValores;
      });
    }
  }

  function handleConfirmar() {
    escondeBoxJogadores();
  }

  function handleComputar() {
    somarPontos();

    const listPontos = document.getElementById("pontsJog");
    listPontos.classList.remove("escondes-lista-pontos");

    zerarInputs();
    setRodada(rodada + 1);
  }

  function escondeBoxJogadores() {
    if (Object.keys(valoresJogadores).length < 2) {
      setMensagem(
        "Para jogar Scrabble, é preciso informar pelo menos dois jogadores!"
      );
    } else {
      const boxJogadores = document.getElementById("boxJog");
      boxJogadores.classList.add("esconde-jogadores");
      const listJogadores = document.getElementById("listJog");
      listJogadores.classList.remove("esconde-lista");
    }
  }

  function zerarInputs() {
    const inputs = document.querySelectorAll(
      '.listagem-jogadores input[name="pontuacao"]'
    );
    inputs.forEach((input) => {
      input.value = 0;
    });
  }

  function somarPontos() {
    const inputs = document.querySelectorAll(
      '.listagem-jogadores input[name="pontuacao"]'
    );
    let novoEstadoPontos = { ...pontos };

    inputs.forEach((input, index) => {
      const pontos = parseInt(input.value, 10);

      novoEstadoPontos = {
        ...novoEstadoPontos,
        [index]: (novoEstadoPontos[index] || 0) + pontos,
      };
    });

    setPontos(novoEstadoPontos);
  }

  function finalizarJogo() {
    const ranking = document.getElementById("ranking");
    ranking.classList.remove("esconder-ranking");

    const listJogadores = document.getElementById("listJog");
    listJogadores.classList.add("esconde-lista");
    const listPontos = document.getElementById("pontsJog");
    listPontos.classList.add("escondes-lista-pontos");

    if (Object.entries(pontos).length === 0) {
      setMensagem(
        "Nenhum ponto foi computado, assim não há maneiras de identificar o vencedor!"
      );
    }
    setFinalizar(true);
  }

  return (
    <div>
      <div className="jogadores-nomes" id="boxJog">
        <h1>Identificação dos Jogadores</h1>
        {mensagem !== "" && <Mensagem msg={mensagem} />}
        <InputJogador
          identification={1}
          onValorChange={(valor) => handleValorChange(0, valor)}
        />
        <InputJogador
          identification={2}
          onValorChange={(valor) => handleValorChange(1, valor)}
        />
        <InputJogador
          identification={3}
          onValorChange={(valor) => handleValorChange(2, valor)}
        />
        <InputJogador
          identification={4}
          onValorChange={(valor) => handleValorChange(3, valor)}
        />
        <div className="confirmar-jogadores">
          <button onClick={handleConfirmar} className="botao-confirmar">
            Confirmar
          </button>
        </div>
      </div>

      <div className="resultado-pontos">
        <div className="esconde-lista" id="listJog">
          <div className="listagem-jogadores">
            <div className="rodada">{`Rodada ${rodada}`}</div>
            <div>Pontos</div>
            {Object.entries(valoresJogadores).map(([index, nome]) => (
              <>
                <div className="nomeJogador" key={index}>
                  {nome}
                </div>
                <input type="number" name="pontuacao" defaultValue={0} />
              </>
            ))}
            <div className="confirmar-pontuacao">
              <button onClick={handleComputar} className="botao-computar">
                Computar
              </button>
            </div>
            <div className="finalizar">
              <button onClick={finalizarJogo} className="botao-finalizar">
                Finalizar
              </button>
            </div>
          </div>
        </div>

        <div className="escondes-lista-pontos" id="pontsJog">
          <div className="listagem-pontuacao">
            <div className="rodada">Jogadores</div>
            <div>Pontos</div>
            {Object.entries(valoresJogadores).map(([index, nome]) => (
              <>
                <div className="nomeJogador" key={index}>
                  {nome}
                </div>
                <div>{pontos[index]}</div>
              </>
            ))}
          </div>
        </div>
      </div>

      <div className="esconder-ranking" id="ranking">
        <Ranking resultado={pontos} jogadores={valoresJogadores} />
      </div>
      {mensagem !== "" && finalizar && <Mensagem msg={mensagem} />}
    </div>
  );
}
