# Wichi Prints 🖨️

Wichi Prints es una tienda en línea y catálogo de impresión 3D especializada en figuras personalizadas como WichiBalls (Pokémon) y Armería (armas y props), así como impresiones personalizadas bajo pedido. El proyecto está construido para ser rápido, sin backend tradicional, apoyándose en la web estática y en WhatsApp para la gestión de pedidos y atención al cliente.

## 🚀 Características Principales

- **Catálogo Dinámico**: Muestra los productos disponibles extraídos desde un archivo de datos local.
- **Carrito de Compras (Local)**: Funcionalidad de carrito basada en `localStorage`, lo que permite que los usuarios conserven su selección sin necesidad de registrarse.
- **Resumen de Pedido y Facturación**: Página dedicada para ingresar los datos de envío y facturación antes de finalizar la compra.
- **Cálculos Automáticos**:
  - Descuentos automáticos por volumen (5% en pedidos > $200.000 COP, 10% en pedidos > $300.000 COP).
  - Cálculo de envíos (envío gratuito en compras superiores a $150.000 COP).
- **Integración con WhatsApp**: Al confirmar una compra o hacer una solicitud especial, el sistema formatea toda la información del pedido (ítems, precios, descuentos, datos del cliente) y genera un mensaje directo al WhatsApp de Wichi Prints.
- **Solicitudes Personalizadas**: Un modal interactivo permite a los clientes solicitar impresiones que no están en el catálogo (buscando en listas de Pokémon y armas o escribiendo una idea libre).
- **Opciones de Pago**: Instrucciones claras integradas en el resumen de pedido para pagos a través de Bancolombia (Bre-B) y Nequi, con función rápida de copiar al portapapeles.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3 (Vanilla / Custom CSS) y JavaScript (Vanilla ES6+).
- **Iconos y Fuentes**: FontAwesome para la iconografía y Google Fonts (Inter).
- **Despliegue**: GitHub Pages (sitio completamente estático).

## 📂 Estructura del Proyecto

- `index.html`: Página principal con el catálogo, información de la tienda y el carrito de compras.
- `order-summary.html`: Página de validación de pago donde el usuario diligencia sus datos de envío y revisa el desglose del pedido.
- `css/`: Estilos CSS personalizados de la aplicación.
- `js/`: 
  - `data/products.js`: Base de datos local (arrays de objetos) que alimenta el catálogo de productos.
  - `modules/request.js`: Lógica encargada del modal de solicitudes personalizadas (armas, pokemones, ideas).
  - `order-summary.js`: Lógica para la renderización del resumen de la compra, cálculo de totales/descuentos y envío a WhatsApp.
- `images/`: Recursos gráficos, logotipos de la marca y fotografías de los productos.

## 🤝 Cómo Funciona el Flujo de Compra

1. El usuario navega por `index.html` y agrega productos al carrito.
2. Al estar listo, hace clic en "Finalizar Compra", lo cual lo redirige a `order-summary.html`.
3. El sistema valida el carrito en `localStorage`, suma los subtotales, aplica descuentos y suma el valor del envío si aplica.
4. El cliente llena un formulario con sus datos personales y de envío.
5. Al hacer clic en "Confirmar Orden", un script formatea un recibo en texto estructurado y abre una ventana de chat de WhatsApp prellenada hacia la línea de atención de la tienda.
6. El equipo de Wichi Prints recibe el mensaje y valida el pago realizado vía Nequi/Bancolombia para iniciar la fabricación.

## 📄 Licencia y Derechos

© 2026 Wichi Prints. Todos los derechos reservados.
