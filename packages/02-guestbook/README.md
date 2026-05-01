# Guestbook

Proyecto para sintetizar los contenidos en [The Full Linux Self-hosting Course](https://fireship.dev/linux).

## Paso 1: Servidor Virtual Privado (VPS)

Un servidor virtual privado es una máquina Linux con alguna dirección IP en el internet capaz de almacenar aplicaciones web. A continuación se comparten alternativas de VPS.

Opciones Popular VPS Hosting

- Linode
- Vultr
- Digital Ocean

Opciones Big Cloud

- AWS EC2
- Google Compute Engine
- Azure Virtual Machines

Dentro de estas pociones tenemos algunos tipos de VPS:

- **Optimizados para computación en la nube - CPU (Unidades Centrales de Procesamiento) dedicado**: Máquinas virtuales para aplicaciones de negocios con demanda e.g., sitios web productivos, CI/CD, transcodificación de videos, ó bases de datos enormes.
- **Computación en la nube - CPU compartida**: Máquinas virtuales para aplicaciones con rendimiento explosivo e.g., trafico bajo, CMS, blogs, ambientes de pruebas, ó bases de datos pequeñas.
- **GPU en la nube**: Máquinas virtuales con GPUs (Unidades de Procesamiento Gráfico) fraccionadas o completas de NVIDIA para IA, machine learning, HPC, computación visual y VDI. También disponible como Bare Metal.
- **Bare Metal (Metal Desnudo)**: Servidor bare metal de un solo inquilino para aplicaciones con los requisitos de rendimiento o seguridad más exigentes.

El siguiente paso esta es escoger una distribución de sistema operativo. Entre las más populares tenemos Ubuntu, pero también suelen haber alternativas como Debian, FreeVSD, OpenBSD, Fedora, entre otros.

Luego tenemos la elección del plan para elegir capacidades en términos de:

- Número de núcleos e.g., 1 vCPU
- Memoria RAM e.g., 8 GB
- Almacenamiento e.g., 150 GB NVMe
- Ancho de banda e.g., 4 TB
- Precio ~$75/mes

Este plan tiene que adaptarse a las necesidades y consumes de nuestra aplicación web. Estas estimación bruta entre una aplicación NodeJS con una base de datos Postgres hace de 100 a 1000 peticiones por segundo. Para estos casos 1 vCPU y 8 GB de RAM puede ser suficiente.

El almacenamiento de la base de datos puede hacerse directamente en la VPS, pero no es lo recomendado. Lo mejor es utilizar un **bloque de almacenamiento** aparte. Por otro lado si queremos tener flexibilidad para agregar un almacenamiento escalable por demanda es recomendable utilizad un **objeto de almacenamiento**.

Hay funcionalidades adicionales como:

- Estrategia de back ups.
- Protección a DDoS (Ataques de Negación de Servicio). Hay herramientas como Cloudfare, que nos ofrece este servicio de manera gratuita.

## Paso 2: Secure Shell (SSH)

Una vez montada nuestra VPS, hay que configurar una llave SSH para conectarnos a ella. En pocas palabras, el secure shell es un protocolo que nos permite conectarnos desde nuestra máquina local al servidor remoto por medio de una llave y una terminal. Para ellos es necesario conocer la dirección IP del servidor remoto y un usuario raíz con acceso al mismo. Con dicha información se corre el siguiente comando:

```sh
ssh root@your.ip.address
```

Sin embargo, la recomendación es crear una pareja de llave pública y privada SSH para acceder al servidor sin necesidad de escribir la contraseña del usuario raíz y mejorar la seguridad al acceso del servidor remoto. Para crear la llave se ejecuta el siguiente comando:

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

en donde:

- `ssh-keygen`: es el comando
- `-t`: indica el algoritmos con el que se cifra la llave (e.g., `ed25518`)
- `-C`: bandera para indicar a que correo electrónico asociar la llave.

Este comando creara la pareja de llaves en el directorio `~/.ssh`. Copiamos el contenido de la llave pública con el comando:

```sh
pbcopy ~/.ssh/id_ed25519.pub
```
finalmente copiamos este valor en nuestro VPS.

## Paso 3: Construye la aplicación

Esta aplicación se compone de:

- Guestbook: una aplicación frontend en NextJS donde el usuario se registra con GitHub y su visita es guardada en el libro de invitados.
- Pocketbase: una aplicación backend con una base de datos SQL para almacenar los usuarios que visitan la página. Pocketbase ofrece una interfaz de usuario para el rol de administrador y así administrar los datos.

## Paso 4: Networking y Firewall

Por defecto, los accesos a los servidores remotos son muy limitados para garantizar seguridad. Los accesos utilizan los puertos asociados a protocolos para recibir mensajes esperados. Los siguientes puertos son abiertos para usos externos:

- 80 HTTP Cerrado
- 443 HTTPS Cerrado
- 22 SSH Abierto
- 
Estos puertos son solo de uso interno, i.e., por el  localhost:

- 3000 Next.js
- 8090 Pocketbase

Para abrir los puertos es necesario modificar el Firewall. El Firewall es la primera línea de defensa para el tráfico en red y define las reglas sobre cuales puertos están abiertos ó cerrados. En las páginas de los VPS hay opciones para administrar los grupos de firewall, pero una alternativa es la configuración del  **uncomplicated firewall** en el servidor remoto para habilitar los puertos 80 y 443 de los protocolos HTTP y HTTPS respectivamente. Para hacer esta configuración utilizamos NGINX.

## Paso 5: NGINX

Nginx es un servidor web que se puede usar como proxy inverso para enrutar el tráfico hacia aplicaciones web. Para configurar Nginx en nuestro servidor remoto, se ejecutan los siguientes comandos:

```sh
apt update
apt install nginx
systemctl start nginx // enable the service
systemctl enable nginx // run in background
systemctl status nginx // check if is runing
```

El `systemctl` es una utilidad de linux que nos permite prender y apagar servicios en nuestra máquina remota para que corran en un segundo plano. Al intentar navegar hacia `http://your.vps.ip.address` no se va a mostrar nada en esta ruta, y es allí donde la configuración del  **uncomplicated firewall** toma protagonismo con los siguientes comandos:

```sh
ufw status // see which ports are open
ufw app list // check what apps are available. Here you should see Nginx.
ufw allow 'Nginx Full' // add rule to use the Nginx Full
```

Ahora, al navegar `http://your.vps.ip.address` se verá el mensaje **Welcome to nginx!**.


## Paso 6: Transferencia de código

Al tener disponible tu servidor remoto, es momento de identificar una forma para trasferir el código de tu máquina local a la máquina remota. Existen varias alternativas:

- Copia segura con el comando `scp`. e.g., `scp -r /path/to/local/code root@123.45.67.89:/apps/guestbook`
- Protocolo FTP para la transferencia de archivo con FileZilla.
- git y GitHub.


En este paso vamos a usar **git**, ya que se puede clonar el repositorio en GitHub a tu máquina remota. git es una tecnología que merece un curso y por ende no se va a desarrollar a profundidad. En caso de no estar familiarizado con ella, se recomienda capacitarse en su uso. Por ahora, solo nos conformaremos con saber que es una estrategia para poner nuestro código en un servidor remoto.

Primero, se va a instalar node.js en la VPS por medio del Node Version Manager (`nvm`) con el siguiente comando:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Este comando nos instala `nvm`. Para instalar node.js se ejecuta:

```sh
nvm install 20
```

Segundo, si usas tu propio código, primero tendrás que enviar tu código a un repositorio remoto en GitHub. Posteriormente podemos clonar el repositorio con el siguiente comando:

```sh
mkdir apps
cd apps
git clone https://github.com/fireship-io/linux-course guestbook
```

Tercero, instalamos las dependencias de la aplicación, y se ejecuta el build.

```sh
cd guestbook

npm install
npm run build
npm run star
```

Para validar que el frontend de la aplicación esta montada se puede usar el siguiente comando en otra terminal:

```sh
curl http://localhost:3000
```

Ahora vamos a ejecutar el backend de la aplicación en nuestro VPS. Abrimos otra pestaña en la terminal y se corren los siguientes comandos:

```sh
chmod +x pocketbase
./pocketbase serve
```

Para validar, en la consola el funcionamiento del backend, se debe ver en la terminal la siguiente salida:

```txt
Server started at http://127.0.0.1:8090
```


## 🧰 Tool Kit

La siguiente lista recopila las tecnologías utilizadas en este proyecto.

- [tailwindcss](https://tailwindcss.com/), la forma rápida de construir sitios web sin nunca salir de su HTML; se utiliza en gran parte del proyecto.
- [NextJs](https://nextjs.org/), el Framework de React para la Web.
- [Pocketbase](https://pocketbase.io/), backend Open Source.
- [nginx](https://nginx.org/), a web server used as reverse proxy.


## 🧞 Comandos

Todos los comandos se corren desde la raíz del proyecto.

| Command            | Action                                            |
| ------------------ | ------------------------------------------------- |
| pnpm install       | Installs dependencies                             |
| pnpm run dev       | Starts local NextJS at localhost:3000             |
| pnpm run build     | Build your production site to ./dist/             |
| ./pocketbase serve | Starts the backend app at http://127.0.0.0.1:8090 |

Para correr el archivo pocketbase, es necesario habilitar los permisos, tal y como muestran los siguiente comandos.

```sh
sudo chmod +x pocketbase
./pocketbase serve
```