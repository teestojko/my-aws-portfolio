setup-laravel:
	composer create-project laravel/laravel src "11.*"
install-jetstream:
	docker compose exec app composer require laravel/jetstream
	docker compose exec app php artisan jetstream:install livewire --dark
build:
	docker compose build
up:
	@make backend-up
	@make frontend-up
backend-up:
	docker compose up --detach
npm:
	docker compose exec node npm install
	docker compose exec -d node npm run dev
stop:
	docker compose stop
down:
	docker compose down --remove-orphans
down-v:
	docker compose down --remove-orphans --volumes
restart:
	@make down
	@make up
destroy:
	docker compose down --rmi all --volumes --remove-orphans
tinker:
	docker compose exec app php artisan tinker
test:
	docker compose exec app php artisan test
migrate:
	docker compose exec app php artisan migrate
fresh:
	docker compose exec app php artisan migrate:fresh --seed
seed:
	docker compose exec app php artisan db:seed
optimize:
	docker compose exec app php artisan optimize
optimize-clear:
	docker compose exec app php artisan optimize:clear
cache:
	docker compose exec app composer dump-autoload --optimize
	@make optimize
	docker compose exec app php artisan event:cache
	docker compose exec app php artisan view:cache
cache-clear:
	docker compose exec app composer clear-cache
	@make optimize-clear
	docker compose exec app php artisan event:clear
	docker compose exec app php artisan view:clear
pint:
	docker compose exec app ./vendor/bin/pint --verbose