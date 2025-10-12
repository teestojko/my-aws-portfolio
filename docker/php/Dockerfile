FROM php:8.3-fpm

# カスタム php.ini をコピー
COPY docker/php/php.ini /usr/local/etc/php/

# 必要なライブラリ・ツールをインストール
RUN apt update \
    && apt install -y \
        curl \
        git \
        unzip \
        zip \
        default-mysql-client \
        zlib1g-dev \
        libzip-dev \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        gnupg \
        ca-certificates \
        lsb-release \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql zip gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer インストール
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && composer self-update \
    && composer clear-cache

# 作業ディレクトリ設定
WORKDIR /var/www/html

COPY src/ /var/www/html/

# ------------------------------
# Composer 依存関係インストール
# ------------------------------
RUN composer install --no-dev --optimize-autoloader

# ------------------------------
# エントリーポイント設定
# ------------------------------
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
