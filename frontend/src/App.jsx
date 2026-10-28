import { useState } from "react";

const API = "";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  const send = async () => {
    if (!text.trim()) return;
    try {
      const res = await fetch(`${API}/api/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(res.status);
      setStatus("Отправлено!");
      setText("");
      load();
    } catch (e) {
      setStatus("Ошибка отправки: " + e.message);
    }
  };


  const load = async () => {
    try {
      const res = await fetch(`${API}/api/data`);
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      setResult(data.content);
      setStatus("Данные получены");
    } catch (e) {
      setStatus("Ошибка получения: " + e.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Работа с data.txt</h2>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст"
          style={{ flex: 1, padding: 6 }}
        />
        <button onClick={send} style={{ padding: "6px 12px" }}>
          Отправить
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={load} style={{ padding: "6px 12px", width: "100%" }}>
          Получить содержимое data.txt
        </button>
      </div>

      <textarea
        readOnly
        value={result}
        rows={8}
        style={{ width: "100%", marginTop: 12, padding: 6, boxSizing: "border-box" }}
        placeholder="Здесь появится полное содержимое data.txt"
      />

      <p>{status}</p>
    </div>
  );
}