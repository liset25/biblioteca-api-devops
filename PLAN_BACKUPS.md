# Plan de Backups - Biblioteca API DevOps

## 1. Objetivo

Establecer un procedimiento para realizar respaldos de la información almacenada en la base de datos PostgreSQL de la Biblioteca API DevOps, con el propósito de proteger los datos y permitir su recuperación ante posibles fallos.

## 2. Información que será respaldada

El respaldo incluirá la base de datos utilizada por la aplicación:

- Base de datos: `biblioteca`
- Tabla principal: `libros`

La información respaldada corresponde a los registros de los libros almacenados en PostgreSQL.

Los datos incluyen:

- ID del libro.
- Título.
- Autor.
- Categoría.
- Año de publicación.

## 3. Frecuencia de los respaldos

Se establece una frecuencia de respaldo **diaria**.

El respaldo se realizará una vez al día con el objetivo de reducir el riesgo de pérdida de información.

En un entorno de producción, se recomienda realizar los respaldos de forma automatizada para evitar depender de un proceso manual.

## 4. Lugar de almacenamiento

Los archivos de respaldo serán almacenados en **Google Cloud Storage**.

Los respaldos se organizarán utilizando la fecha de creación para facilitar su identificación.

Ejemplo de organización:

```text
backups/
├── biblioteca-2026-08-01.dump
├── biblioteca-2026-08-02.dump
└── biblioteca-2026-08-03.dump
```

## 5. Formato del respaldo

Se utilizará la herramienta `pg_dump`, incluida con PostgreSQL, para generar los respaldos de la base de datos.

Se utilizará el formato personalizado (`-F c`), que permite posteriormente realizar la restauración utilizando `pg_restore`.

Ejemplo:

```bash
pg_dump -U postgres -d biblioteca -F c -f biblioteca_backup.dump
```

El archivo generado tendrá la extensión `.dump`.

## 6. Procedimiento para realizar un respaldo

Para realizar un respaldo manual de la base de datos se seguirán los siguientes pasos:

1. Verificar que el servidor PostgreSQL se encuentre funcionando.
2. Verificar que la base de datos `biblioteca` esté disponible.
3. Ejecutar el comando `pg_dump`.
4. Comprobar que el archivo `.dump` haya sido generado correctamente.
5. Identificar el respaldo utilizando la fecha correspondiente.
6. Almacenar el archivo de respaldo en el espacio destinado para backups en Google Cloud Storage.
7. Verificar que el archivo almacenado pueda ser localizado.

Ejemplo:

```bash
pg_dump -U postgres -d biblioteca -F c -f biblioteca_backup.dump
```

## 7. Almacenamiento de los respaldos

Los archivos generados serán almacenados en un bucket de **Google Cloud Storage**.

Se recomienda mantener una organización por fechas para facilitar la búsqueda de los respaldos.

Ejemplo:

```text
Google Cloud Storage
└── backups
    ├── biblioteca-2026-08-01.dump
    ├── biblioteca-2026-08-02.dump
    └── biblioteca-2026-08-03.dump
```

El acceso al almacenamiento deberá estar protegido mediante las cuentas y permisos correspondientes.

## 8. Procedimiento de recuperación

En caso de pérdida, corrupción o eliminación accidental de información, se utilizará el respaldo más reciente disponible.

El procedimiento general será:

1. Identificar la causa del problema.
2. Seleccionar el respaldo más reciente que se encuentre disponible y en buenas condiciones.
3. Descargar el archivo de respaldo desde Google Cloud Storage.
4. Verificar que PostgreSQL se encuentre funcionando.
5. Restaurar la información utilizando `pg_restore`.
6. Verificar los registros recuperados.
7. Comprobar el funcionamiento de la API.
8. Realizar una prueba mediante el endpoint `/libros`.

Ejemplo de restauración:

```bash
pg_restore -U postgres -d biblioteca biblioteca_backup.dump
```

## 9. Verificación de la recuperación

Después de restaurar la base de datos se deberá comprobar que los registros se encuentren disponibles.

Se puede realizar una consulta en PostgreSQL:

```sql
SELECT * FROM libros;
```

También se comprobará la API mediante:

```text
GET /libros
```

La respuesta deberá mostrar nuevamente los registros almacenados en la tabla `libros`.

## 10. Verificación de los respaldos

Cada respaldo deberá verificarse para comprobar que el proceso se realizó correctamente.

Se deberá comprobar:

- Que el archivo de respaldo fue creado.
- Que el archivo tiene un tamaño válido.
- Que el archivo se encuentra almacenado correctamente.
- Que el respaldo corresponde a la fecha indicada.
- Que el respaldo puede ser utilizado para una recuperación.

Cuando sea posible, se recomienda realizar pruebas periódicas de restauración para comprobar que los respaldos son utilizables.

## 11. Recuperación ante fallos

Ante una pérdida de información se seguirá el siguiente procedimiento:

1. Identificar el problema.
2. Detener temporalmente las operaciones que puedan modificar la información, si fuera necesario.
3. Seleccionar el respaldo más reciente disponible.
4. Descargar el respaldo desde Google Cloud Storage.
5. Restaurar la base de datos PostgreSQL.
6. Comprobar la tabla `libros`.
7. Verificar que los registros sean correctos.
8. Iniciar o verificar el funcionamiento de la API.
9. Probar el endpoint `/libros`.
10. Comprobar el endpoint `/health`.
11. Registrar el incidente y las acciones realizadas.

## 12. Retención de respaldos

Se propone conservar los respaldos diarios durante un período determinado para contar con diferentes puntos de recuperación.

Como estrategia inicial se conservarán los respaldos correspondientes a los últimos **7 días**.

Los respaldos más antiguos podrán eliminarse cuando ya no sean necesarios, siempre verificando que exista un respaldo reciente y válido.

## 13. Responsable

La responsable de la administración y verificación de los respaldos será la persona encargada del proyecto.

Entre sus responsabilidades se encuentran:

- Verificar la realización de los respaldos.
- Comprobar que los archivos estén disponibles.
- Mantener organizada la información.
- Verificar periódicamente los respaldos.
- Realizar el procedimiento de recuperación cuando sea necesario.

## 14. Medidas de seguridad

Los respaldos deberán mantenerse protegidos para evitar accesos no autorizados.

Se deberán aplicar las siguientes medidas:

- No publicar archivos de respaldo en repositorios públicos.
- No almacenar contraseñas dentro del código fuente.
- Utilizar variables de entorno para las credenciales.
- Controlar los permisos de acceso al almacenamiento.
- Mantener los respaldos organizados y protegidos.
- Evitar compartir públicamente información sensible de la base de datos.

## 15. Conclusión

El plan de backups permite establecer una estrategia para proteger la información de la Biblioteca API DevOps y facilitar su recuperación ante posibles fallos.

La utilización de respaldos periódicos, almacenamiento en Google Cloud Storage y procedimientos de recuperación definidos permite reducir el riesgo de pérdida de información y contribuir a las buenas prácticas de administración de sistemas en un entorno DevOps.


PLAN_BACKUPS.md