import React, { useState } from "react";
import "./InputJogador.css";

export default function InputJogador({ identification, onValorChange }) {
  const id = `jogador${identification}`;

  const [valor, setValor] = useState("");

  function handleInputChange(event) {
    const novoValor = event.target.value.toUpperCase();
    setValor(novoValor);
    onValorChange(novoValor); // Chama a função de callback para passar o novo valor para o componente pai
  }

  return (
    <div className="jogadores">
      <label htmlFor={id}>Jogador {identification}</label>
      <input
        type="text"
        maxLength={10}
        id={id}
        value={valor}
        onChange={handleInputChange}
      />
    </div>
  );
}
