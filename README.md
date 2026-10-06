# Sistema de Gestión de Devoluciones
Proyecto FullStack, que permite gestionar devoluciones mediante
su creación, obtención y actualización, validación de estado en
un workflow planificado. 
Cuenta con validación de roles para cliente y admin
para visualizar características únicas de admin.

## Testing credentials
```bash
ADMIN:
Correo: admin@tienda.com
Contraseña: 12345678
```

```bash
CLIENTE:
Correo: juan@gmail.com
Contraseña: 12345678
```
## Tecnologías usadas
## Frontend:
- Angular 20
- Typescript
- Interceptors 
- Guards
- Cookies

## Base de datos:
- PostgreSQL

## Herramientas:
- VSC
- Git y GitHub
- pnpm

## Funcionalidades:
## Cliente:
- Login
- Visualización de sus compras
- Visualización de una compra detalle
- Solicitar devoluciones
- Visualización de sus devoluciones

## Admin - Operador:
- Login
- Lista general de compras 
- Visualizacion de detalle de una compra
- Lista general de devoluciones 
- Actualizacion de estado de la devolucion
- Actualizacion de notas de operador
- Filtro de devoluciones por estado, fecha desde - hasta
- Lista general de usuarios

## Arquitectura 
## Frontend:
- Components
- core
	- interceptos
	- guards
	- pipes
- environments
- features
	- order
		- components
		- interfaces
		- pages
		- services
	- return
	- start
	- user
- layout
	- full-page
	- sidebar
	- topbar
	- services
- shared

## Ejecución del proyecto 
Clonar del repositorio
```bash
git clone
```
## Instalar las dependencias
```bash
pnpm install
```
## Frontend:
```bash
ng serve -o
port: 4200
```

## Seguridad del proyecto
Backend:
Autenticación con JJWT y autorizacion roles en backend

## Frontend:
Uso de cookie para validar la autenticación y rol
Uso de guards para validar el rol

## Autor: Sleyter Astete Ibañez
