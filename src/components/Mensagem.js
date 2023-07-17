import "./Mensagem.css";
import { IoWarning } from "react-icons/io5";

export default function Mensagem({ msg }) {
  return (
    <div className="mensagens-diversas">
      {<IoWarning className="icon-warning" />} {msg}
    </div>
  );
}
