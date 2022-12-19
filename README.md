# CRM Sales Automatization

El siguiente ejercicio consiste en automatizar un pipeline del CRM del equipo de ventas considerando varios puntos que el equipo necesita para mover un lead a un prospecto.

Elegí mostrar la información en dos columnas: Lead y Prospect, cada columna contiene cards con la información del usuario.

Se asumen que los leads ya se obtuvieron y llegaron desde un determinado canal de adquisición (campaña de mkt, google o facebook ads, instragram posts/stories, etc), se guardaron en la base de datos con su información personal **(nombre, apellido, correo, canal de adquisicion, status (lead o prospecto), fecha de nacimiento, identificador nacional)**

**De pensar señores**

`¿Puedo agregar un sistema interno de puntaje?`
Si es un si, 
Si el user existe 10 pts extra, no existe -5 puntos
Si el user existe pero la información entre bases de datos no coinciden 5pts

`Si no agrego un sistema interno`
Entonces no tiene sentido que las peticiones sean en **paralelo** y deberan ejecutarse solo si se cumple la primera condición en la petición

**Consideraciones**

* Creé tres bases de datos, una para validar el identificador nacional, otra para validar si el usuario tiene antecedentes judiciales y por último la base de datos de ventas.

* El sistema de puntaje para mover a un prospecto se basa en un score random de 0 a 100, un lead puede ser prospecto si el score es mayor a **60**

* Para mover un lead a un prospecto primero se deberá comprobar que el número de identificador nacional exista en la base de datos de registros nacional, <p></p>////////si existe, entonces se deberá comprobar que la información de la base de datos de registros nacional y la base de datos de ventas coinciden.

* Si existe el usuario entonces se comprobará con la base de datos de registros judiciales para comprobar si el usuario **no** cuenta con algún registro

* Si no tiene un registro en la base de datos de registros judiciales entonces corremos nuestro modelo de puntaje/////

**Algortimo**

1. Obtenemos la información de los usuarios de la base de datos de sales y la mostramos en el pipeline.
Para esto decidí utilizar el manejador de data `react query`, esta información contendrá los status del usuario **(lead o prospect)** y permitirá clasificarlo en su correspondiente columna (hasta aqui voy)

2. Cada lead contiene el botón `run model`que accionará la comprobación automática del modelo por national id number

3. El resultado de la comprobación moverá automáticamente (**NTH**: Hacer un efecto de transición de desaparación de las cards de la columna leads y un efecto de transición de aparición de las cards en la columna prospecs) los leads que fueron validados correctamente bajo las reglas de negocio antes mencionadas.

4. Para los leads que resultaron en una comprobación fallida, se mandará un toast notificacion error con los id's que resultaron fallidos (**NTH**:e Estos permanecerán en la columna leads pero se agregará una variable en su data de forma boolean para alertar posible fraude)

