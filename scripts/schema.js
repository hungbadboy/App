module.exports = {
    'sql': 'CREATE DATABASE IF NOT EXISTS thitructuyen; \
    USE thitructuyen; \
    DROP TABLE user; \
    CREATE TABLE IF NOT EXISTS user ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `fist_name` CHAR(60), \
    `last_name` CHAR(60),\
    `email` CHAR(30),\
    `gen` CHAR(1),\
    `bid` CHAR(60),\
    `profile` CHAR(60),\
    `picture` text,\
    `last_login` text,\
    `status` CHAR(1),\
    PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
    ); \
    \
    '
};