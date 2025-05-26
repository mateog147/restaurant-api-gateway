# Gateway API para Restaurante

Este es un gateway API basado en Express para el sistema de microservicios del restaurante.

## Características
- Proxy para solicitudes a los microservicios de cocina y bodega
- Organización modular de rutas
- Configuración mediante variables de entorno

## Servicios

### Servicio de Cocina
- GET `/kitchen/orders` - Listar todas las órdenes
- POST `/kitchen/orders` - Crear nueva orden
- GET `/kitchen/orders/:orderId` - Obtener orden específica
- GET `/kitchen/orders/recipes` - Obtener información de recetas
- GET `/kitchen/orders/today` - Obtener órdenes de hoy

### Servicio de Bodega
- GET `/cellar/ingredients/available` - Obtener ingredientes disponibles
- GET `/cellar/movements/in` - Obtener movimientos de entrada de ingredientes
- GET `/cellar/movements/out` - Obtener movimientos de salida de ingredientes

## Configuración
1. Clonar repositorio
2. Instalar dependencias: `npm install`
3. Crear archivo `.env` con las variables requeridas
4. Iniciar servidor: `npm start`

## Variables de Entorno
- `PORT` - Puerto del gateway API (predeterminado: 3000)
- `KITCHEN_SERVICE_URL` - URL del microservicio de cocina
- `CELLAR_SERVICE_URL` - URL del microservicio de bodega