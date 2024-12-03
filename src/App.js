import React from "react";
import TelegramLoginButton from "./components/TelegramLoginButton";

function App() {
  const handleTelegramAuth = (user) => {
    console.log("Пользователь авторизован:", user);
    // Здесь можно отправить данные на ваш сервер
  };

  return (
    <div className="App">
      <h1>Авторизация через Telegram</h1>
      <TelegramLoginButton
        botName="PlayItAuth_bot" // Замените на имя вашего бота
        dataOnauth={handleTelegramAuth}
        buttonSize="large"
        usePic={true}
        cornerRadius={10}
      />
    </div>
  );
}

export default App;
