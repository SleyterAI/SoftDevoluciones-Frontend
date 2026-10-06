# Sistema de Gestión de Devoluciones
_______________________________________________________________
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
##  Backend:
- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- JJWT

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
- IntelliJ IDEA
- Postman
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
## Backend:
- Controller
- Service
- Repository
- Mapper
- Dto
- Entity
- Cors
- Security
- GlobalException

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

## Colección de endpoints
```bash
ORDER: 
	GET: http://localhost:8081/api/order/21, auth: token
	GET: http://localhost:8081/api/order, auth: token
	GET: http://localhost:8081/api/order/my-orders, auth: token
	GET: http://localhost:8081/api/order/product/21/1
LOGIN:
	POST: http://localhost:8081/api/auth/login
USER:
	GET: http://localhost:8081/api/user
```
```bash
RETURN:
	CLIENTE:
		GET: http://localhost:8081/api/return/my-returns, auth: token
		POST: http://localhost:8081/api/return, auth: token
		GET: http://localhost:8081/api/return/5
	ADMIN:
		PATCH: http://localhost:8081/api/admin/return/11/status
			SOLICITADO -> EN_REVISION -> APROBADO -> COMPLETADO || RECHAZADO
		PATCH: http://localhost:8081/api/admin/return/5/notes
		GET: http://localhost:8081/api/admin/return/5
		GET: http://localhost:8081/api/admin/return
		GET: http://localhost:8081/api/admin/return/filter?
			status=RECHAZADO&fromDate=29-08-2026&toDate=30-0
```
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
## Backend:
```bash
mvn spring-boot:run || -> IntelliJ Idea
port: 8081
```
## Seguridad del proyecto
Backend:
Autenticación con JJWT y autorizacion roles en backend

## Frontend:
Uso de cookie para validar la autenticación y rol
Uso de guards para validar el rol

## Autor: Sleyter Astete Ibañez
