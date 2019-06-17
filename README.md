# AceBooks
Proyecto Integrado DAW - Web desarrollada con Laravel, la web permitirá leer documentos PDF en cualquier dispositivo para así retomar la lectura en cualquier lugar.

## Instalación
Hay 2 formas de ejecutar el proyecto, usando docker (forma recomendada) o un servidor, sea local o remoto.

### Configuración para docker
1. Renombrar .env.docker a .env
2. En la raíz del proyecto hay que ejecutar los siguientes comandos:
    - docker-compose build -> Compilar la máquina de docker
    - docker-compose up -> Iniciar la máquina de docker
3. Accedemos a la máquina usando el comando npm run docker
4. Usamos el comando cd /var/www/html
5. Ejecutamos el comando composer install
6. Salimos de la máquina usando el comando exit
7. En la raíz del proyecto ejecutamos el comando npm install o yarn install
8. Usamos el comando npm run watch
9. Tras esto ya podemos acceder a localhost:8080 que es la dirección de phpmyadmin, aquí si no existe creamos una base de datos llamada acebooks
10. Importamos el sql que podemos encontrar en /resources/acebooks.sql

Con esto ya estaría todo, hay que tener en cuenta que en el .env tenemos la configuración del proyecto.

### Configuración para un servidor local o remoto
1. Renombrar .env.example a .env
2. Importamos el sql que podemos encontrar en /resources/acebooks.sql
3. Configuramos la base de datos y la URL de la web en el .env
4. En la raíz del proyecto ejecutamos los comandos composer install y npm install (en cado de no tener npm podemos usar el comando yarn install)

Se recuerda que el servidor tiene que ser compatible con Laravel, otra opción de ejecución es configurar el .env con una base de datos remota y ejecutar el comando php artisan serve.

Con esto ya estaría todo, hay que tener en cuenta que en el .env tenemos la configuración del proyecto.
