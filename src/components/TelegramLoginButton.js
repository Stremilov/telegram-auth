import React, { useRef, useEffect } from "react";

const TelegramLoginButton = ({
  botName,
  usePic = false,
  className = "",
  cornerRadius,
  requestAccess = true,
  dataAuthUrl,
  dataOnauth,
  buttonSize = "large",
  wrapperProps = {},
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current === null) return;

    if (!dataOnauth && !dataAuthUrl) {
      throw new Error(
        "Одно из свойств должно быть определено: dataAuthUrl (URL перенаправления) или dataOnauth (функция обратного вызова)."
      );
    }

    // Установка функции обратного вызова, если она передана
    if (typeof dataOnauth === "function") {
      window.TelegramLoginWidget = {
        dataOnauth: (user) => dataOnauth(user),
      };
    }

    // Создаем и настраиваем скрипт виджета Telegram
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);

    if (cornerRadius !== undefined) {
      script.setAttribute("data-radius", cornerRadius.toString());
    }

    if (requestAccess) {
      script.setAttribute("data-request-access", "write");
    }

    script.setAttribute("data-userpic", usePic.toString());

    if (dataAuthUrl) {
      script.setAttribute("data-auth-url", dataAuthUrl);
    } else {
      script.setAttribute(
        "data-onauth",
        "TelegramLoginWidget.dataOnauth(user)"
      );
    }

    script.async = true;

    // Добавляем скрипт в контейнер
    ref.current.appendChild(script);

    // Удаляем скрипт при размонтировании компонента
    return () => {
      ref.current.innerHTML = "";
    };
  }, [botName, buttonSize, cornerRadius, dataOnauth, requestAccess, usePic, dataAuthUrl]);

  return <div ref={ref} className={className} {...wrapperProps} />;
};

export default TelegramLoginButton;
