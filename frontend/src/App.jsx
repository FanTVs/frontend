import { useState } from "react";

const API = "http://localhost:8000";

export default function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const send = async () => {
    try {
      const res = await fetch(`${API}/api/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(res.status);
      setStatus("Отправлено");
      setText("");
    } catch (e) {
      setStatus("Ошибка отправки: " + e.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Версия 1.0</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст"
        style={{ width: "70%", padding: 6 }}
      />
      <button onClick={send} style={{ marginLeft: 8, padding: 6 }}>
        Отправить
      </button>
      <p>{status}</p>
    </div>
  );
}