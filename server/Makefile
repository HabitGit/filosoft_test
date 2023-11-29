migration-generate:
	npx sequelize-cli migration:generate --name ${M_NAME}
migration-run:
	npx sequelize-cli db:migrate
migration-revert:
	npx sequelize-cli db:migrate:undo
db-dump:
	docker exec -i postgres_students pg_dump -U postgres filosoft > ./initdb/dump_filosoft.sql
db-restore:
	docker exec -i postgres_students psql -U postgres filosoft < ./initdb/dump_filosoft.sql
