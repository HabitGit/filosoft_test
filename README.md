# filosoft_test

Проект выполнен в виде монорепозитория, имеет 2 модуля: gateway - модуль для работы с эндпоинтами, students - модуль для работы со студентами.
## Запуск проекта:
### Подготовка переменной среды:
- Создать файл .env в директории проекта "filosoft_test", на одном уровне с docker-compose файлом.
- Скопировать в него все содержимое из файла .env-example

### Подготовка базы данных:
- Запустите postgres в контейнере docker командой:
```bash
docker compose up postgres --detach
```
- Перейдите в каталог server и установите зависимости:
```bash
cd server && npm i
```
#### Первый вариант через миграции, база данных будет пустой (я не стал подготавливать сиды):
- Запустите команду для миграции:
```makefile
make migration-run
```
#### Второй вариант через дамп базы данных с имеющимися сущностями:
- Запустите команду для восстановления:
```make
make db-restore
```
### Запуск сервер-приложения:
- Выполните команду для запуска всего проекта в docker:
```bash
docker compose up
```
## О приложении:
- Хост: http://localhost:8080
- Стек: nats, NestJS, Sequelize, Postgres
### Рабочие эндпоинты:
- Лог оценок
```
GET /log?page=0&size=10
```
Квери параметры выставлены по дефолту page=0 size=10, можно менять как угодно. 
Сортировка выполнена по дате от меньшего к большему.
- Статистика студента
```
GET /statistic/:personalCode
```
Как параметр принимает персональный код студента.
## Заметки:
- Показ статистики не смог уложить в один запрос в базу данных, так как sequelize не дает
сгрупировать вложенные сущности по нужному мне полю, а просит только поле id. 
- Не сделал обработку ошибок и не прописывал валидацию типов для pipe с целью экономии времени.
- Не делал shared lib. для переиспользуемых элементов в каждом из сервисов, для работы с 
микросервисами она должна быть.
- Так как я не разобрался почему clientProxy по своему формирует объект, то взял родную библиотеку 
nats и на ее основе реализовал метод запроса. При данном походе нужно бы было вынести методы nats 
в отдельный класс, реализовав простые методы для управления.
