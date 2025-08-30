# Prueba-Tecnica-Smart

Prueba Técnica en la que demuestro mis habilidades para el puesto de **desarrollador .NET**.  

**Estimated Time**: 5 hours  
**Time Spent**: 4 hours  

---

## 📁 Ejecución del proyecto

### 🔹 Requisitos previos
- **.NET SDK 9.0+**
- **SQL Server** (local o en contenedor Docker)
- **Node.js** (v18+) y **Angular CLI** (`npm install -g @angular/cli`)

---

### 1) Configurar la cadena de conexión
Editar el archivo **`Backend/src/WebApi/appsettings.json`** y reemplazar la cadena por las credenciales de tu servidor SQL Server:  

```json
"ConnectionStrings": {
  "SqlServer": "Server=localhost,1433;Database=ProductsDb;User Id=sa;Password=TuPassword;TrustServerCertificate=True;"
}
```

---

### 2) Subir la base de datos
Tienes dos opciones:  

#### Opción A — Usar migraciones de EF Core
Desde la **raíz del proyecto** ejecutar:  

```bash
dotnet ef database update -p src/Infrastructure -s src/WebApi
```

#### Opción B — Usar el script SQL
Ejecutar el archivo **`create_products.sql`** en tu cliente de base de datos (SSMS, Azure Data Studio, etc).  

---

### 3) Ejecutar el backend
En la carpeta **Backend**:  

```bash
dotnet run --project src/WebApi
```

Esto levantará el API en algo como:  

- `https://localhost:7049`
- `http://localhost:5049`

⚠️ **Nota**: revisa en la consola cuál puerto exacto usa tu API.  

---

### 4) Ejecutar el frontend Angular
En la carpeta **Frontend** 

```bash
ng serve -o
```

Esto abrirá Angular en **http://localhost:4200**.  

⚠️ **Importante**: Verifica que el puerto configurado en el servicio Angular sea el mismo que el que usa tu backend (`WebApi`).  
Editar: **`src/app/products/services/product.service.ts`**  

```ts
private apiUrl = 'https://localhost:7049/api/products';
```

---

## ✅ Conclusión

Gracias por la oportunidad de trabajar en este desafío técnico.  
Quedo atento a cualquier pregunta o explicación adicional.  

**Autor:** *Julian José López Arellano*  
