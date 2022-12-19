# CRM Sales Automatization

El siguiente ejercicio consiste en automatizar un pipeline del CRM del equipo de ventas considerando varios puntos que el equipo necesita para mover un lead a un prospecto.

Elegí mostrar la información en dos columnas: Lead y Prospect, cada columna contiene cards con la información del usuario.

**Consideraciones**

Creé dos bases de datos, una para validar el identificador nacional directamente con un sistema externo que en este caso sería `gobierno`y otra base de datos del crm

**Algortimo**

1. Obtenemos la información y la mostramos en el pipeline usando la función `fetchAllPipeline`, esta información contendrá los status del usuario y permitirá clasificarlo en su correspondiente columna

2. El dashboard contiene el botón `run model`que accionará la comprobación automática del modelo 

3. El resultado de la comprobación moverá automáticamente (**NTH**: Hacer un efecto de transición de desaparación de las cards de la columna leads y un efecto de transición de aparición de las cards en la columna prospecs) los leads que fueron validados correctamente bajo las reglas de negocio antes mencionadas.

4. Para los leads que resultaron en una comprobación fallida, se mandará un toast notificacion error con los id's que resultaron fallidos (**NTH**:e Estos permanecerán en la columna leads pero se agregará una variable en su data de forma boolean para alertar posible fraude)

Se asumen que los leads ya se obtuvieron y llegaron desde un determinado canal de adquisición (campaña de mkt, google o facebook ads, instragram posts/stories, etc), se guardaron en la base de datos con su información personal **(nombre, apellido, correo, canal de adquisicion, status (lead o prospecto), fecha de nacimiento, identificador nacional)**

Su

Para que la parábola sea correcta, el viaje del trineo debe ser ascendente al principio, llegar al punto más alto y descender hasta el final. **No puede volver a subir una vez que ha bajado, ni puede iniciar el viaje bajando**. Veamos unos ejemplos:

```js
const heights = [1, 3, 8, 5, 2]
checkJump(heights) // true

/*
Es `true`.
El salto va de abajo a arriba y luego de arriba a abajo:

    8 (punto más alto)
   ↗ ↘
  3   5
 ↗     ↘
1       2
*/

const heights = [1, 7, 3, 5]
checkJump(heights) // false

/*
Es `false`.
Va de abajo a arriba, de arriba a abajo y luego sube otra vez.

  7   5
 ↗ ↘ ↗
1   3
```

Necesitamos que el programa devuelva un `boolean` que indique si el trineo hace una parábola o no.

**A tener en cuenta:**

 - ara que el salto sea válido tiene que subir una vez y bajar una vez. Si durante el salto se queda en la misma altura entre dos posiciones, la parábola continua.
 - o hace falta que el punto de inicio y final sean el mismo (las ciudades pueden estar a diferentes alturas).

# Solución Reto 10

## Análisis Reto 10

 1. Separaremos la lista de números justo en donde está el número más alto
 2. Validar que todos los números de lado izquierdo van de menor a mayor
 3. Validar que todos los números de lado derecho van de mayor a menor
 4. Añadir comprobaciones de parábolas válidas: Que no sea una función matemática constante o una función matemática lineal.

## Separar la lista

```js
const left = heights.splice(0, heights.indexOf(Math.max(...heights)));
```

El método `.splice()` a diferencia del método `.slice()` si edita la lista original.

El método `.splice()` quitará los elementos desde el `index = 0` hasta el `index = donde esta el más grande`, es decir:

```js
let list = [1, 2, 3, 4, 3, 1]; // Lista de ejemplo
let max = list.indexOf(Math.max(...list));

list.splice(0, max); // [1, 2, 3]
console.log(
  list // [4, 3, 1]
);
```

Recordemos que el método `.splice()` nos retorna lo que elimina y edita la lista eliminando lo que le digamos.

## Condiciones

Las dos condiciones son iguales, lo único que difiere es `>=` para los que están a la izquierda y `<=` para los de la derecha.

```js
Nuestras listas actualmente:
[1, 2, 3] // Left
[4, 3, 1] // Heights
```

Usando `.every((elemento, index))` compararemos número por número. Para hacer más sencillo el comparar el número anterior, iniciaremos el método `.every()` a partir del `index = 1`, así que aprovecharemos que `.slice()` no modifica la lista original y haremos esto:

```js
const conditionLeft = left
  .slice(1) // [2, 3]
  .every((l, i) => l >= left[i]);

/*
left = [1, 2, 3]
Las iteraciones de every:

i=0 - 2 >= 1
i=1 - 3 >= 2
*/
```

```js
const conditionRight = heights
  .slice(1) // [3, 1]
  .every((l, i) => l >= left[i]);

/*
heights = [4, 3, 1]
Las iteraciones de every:

i=0 - 3 >= 4
i=1 - 1 >= 3
*/
```

## Condiciones Extra

### No iniciar por el más grande

Revisaremos que la lista no inicie desde el número más alto, si es el caso `left.length = 0`, por tanto, usaremos el símbolo `!` para convertirlo en `true`, ya que `false = 0` y una vez más para convertir el `true` en `false`. Esto también se puede hacer con la condición `left.length != 0`

```js
!!left.length
```

## No terminar por el ultimo

Puesto que luego de hacer el splice nuestra lista queda: `heights = [4, 3, 1]`, y esta lista contiene el número más alto en el primer index, podemos hacer una condición con la longitud de esta lista, ya que si su longitud es igual a 1, esto quiere decir que el número más alto está en la última posición, por lo tanto, nunca baja y no es una parábola.

```js
heights.length > 1
```

## Código Completo

```js
function checkJump(heights) {
  const left = heights.splice(0, heights.indexOf(Math.max(...heights)))
  console.log(heights)
  const conditionLeft = left
    .slice(1)
    .every((l, i) => l >= left[i])
  const conditionRight = heights
    .slice(1)
    .every((h, i) => h <= heights[i])

  return conditionLeft && conditionRight && !!left.length && heights.length > 1
}
```