# SlackBot
Slack бот, предназначенный для заказа пиццы
## Алгоритм запуска приложения
Для запуска приложения необходимо:
1. Скопировать данный репозиторий на свой ПК
2. Загрузить все пакеты, необходимые для работы приложения
````
    npm install
````
3. Создать рабочее пространство, перейдя по ссылке (при отсутсвии аккаунта - зарегестрироваться): https://slack.com/get-started#/createnew
4. Далее создать приложение (выбрать опцию From scratch), выбрав созданное рабочее пространство![изображение](https://user-images.githubusercontent.com/97241097/210188445-4d8a8721-8988-4c25-a6e7-51e9e3999de1.png)
![изображение](https://user-images.githubusercontent.com/97241097/210188589-d2643009-2078-43e9-a939-7d1f12f52647.png)

5. Отредактировать приложение![изображение](https://user-images.githubusercontent.com/97241097/210188493-f5bdabb2-a24f-4fb0-bb10-92f1d7498083.png)
6. Во вкладке "OAuth & Permissions" во вкладке "Scopes" во вкладке "Bot Token Scopes" добавить следующие события ![изображение](https://user-images.githubusercontent.com/97241097/210188742-be858e59-91a1-4063-af0c-cfb723fe530b.png)
7. Во вкладке "Incoming Webhooks" добавить webhook в выбранный текстовый канал
8. Создать файл .env, куда поместить переменные окружения, необходимые для работы программы:
> + Signing secret во вкладке "Basic Information" во вкладке "App Credentials"
> + Bot User OAuth Token во вкладке "OAuth & Permissions"
> + Номер порта, через который будут отправляться запросы (выбрать самостоятельно)
> + ИД участника в приложении Slack в рабочем пространстве в сведениях о приложении
````
SLACK_SIGNING_SECRET=<Signing secret>
SLACK_BOT_TOKEN=<Bot User OAuth Token>
SLACK_BOT_PORT=<Номер порта>
PARTICIPANT_ID=<ИД участника>
````
9. Запустить туннель с помощью пакета ngrok на том же порте, который записан в .env
````
ngrok http <Номер порта>
````
10. Запустить файл app.js
````
node app.js
````
11. Скопировать URL с протоколом https, сгенерированный с помощью ngrok и вставить во вкладку "Event Subcriptions"
## Команды для использования бота
Для общения с ботом необходимо упоминать бота при вызове каждой команды
````
@<Имя бота> <Часть заказа>
````
Заказ состоит из нескольких составляющих:
+ Название пиццы (Marinara, Margarita, Calzone)
+ Размер (Small, Medium, Large)
+ Толщина теста (Thin, Normal)
+ Бортик (Regular, Cheese, Sausage)
+ Адрес доставки (Tomsk, Novokuznetsk, Novosibirsk)
Также есть команды передачи заказа в обработку и очищения уже заданных составляющих заказа
````
@<Имя бота> Save
@<Имя бота> Clear order
````
