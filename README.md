# RSSchool Game

Последняя версия приложения доступна по адресу:

<https://zmichgen.github.io/result/>

## Внимание

В папке ./src/client собственно клиент

В папке ./src/server - сервер.

Сервер запускать не обязательно. Развернут на heroku.com.

Сервер создан с помощью Heroku Guide по созданию нового приложения.

- Node.js
- Express
- MongoDB
- Heroku

Доступен по адресу:

<https://sleepy-atoll-27552.herokuapp.com/>

Api :

- /user - взять список всех иргоков
- /user/add - добавление нового игрока (имя логин пароль)
- /user/login - взять данные одного игрока (по логину и паролю)
- /user/edit - изменение данных выбранного игрока (по логину и паролю)

Запуск локально:

(в папке ./src/client)

- в файле GameState.js :

  - изменить значение переменной localServ на true

 (из папки /src/server)

- npm install
- npm run start или heroku local (если установлен heroku)

-------
Сборка клиент-приложения как обычно из корневой папки

- yarn start
- yarn build

-------

## About game

Так как приближается Новый, 2019 год,
я решил сделать главным героем игры Деда Мороза (Санта Клауса) :)

## Предисловие

Пока дед Мороз развозил подарки, кто-то украл игрушки с Главной Ёлки...

## Главная концепция

- выполнить задания
- выиграть поединок
- получить игрушку (или несколько)
- повесить на елку
- следующий уровень

-------

Возможность сохранения:

- только между поединками

Игра закончена, когда Ёлка украшена полностью

## Разделы

### Об игре

- Лендинг пэйдж с информацией об игре , правила и скриншоты
- При нажатии на любую кнопку в лендтнг пейдж  переход к игре. Если не зарегистрирован то к регистрации
- Начало игры невозможно без входа зарегистрированным пользователем

### Таблица рекордов

- Таблица рекордов всех игроков

### Регистрация и вход

- если не зарегистрирован или не вошел - регистрация или вход

- если уже вошел или зарегистрировался - переход к игре
