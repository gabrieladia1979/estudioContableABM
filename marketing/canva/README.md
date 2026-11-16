# Carruseles de Noticias de ABM en Canva

Usá este flujo para convertir una novedad contable en una nota web y un carrusel de Instagram de cinco placas. [Ficha para copiar](FICHA.md) · [Modelo editable para duplicar](https://www.canva.com/d/-G-HODCh1E4D54E) · [Ejemplo trabajado](../publicaciones/plan-pagos-arca-2026-11-13.md)

1. Completá la ficha con la fuente oficial, la fecha de publicación, el público y la acción que puede tomar. Si ABM ya publicó la noticia, prepará una actualización para esa nota.
2. Duplicá el modelo editable en Canva. Prepará la portada, el alcance, el cambio principal, los pasos concretos y el cierre. Conservá el nombre oficial de trámites o certificados en la placa donde se mencionen. En el texto general usá «pymes».
3. Mantené el formato vertical de 1080 × 1350. Usá letra gruesa en las preguntas sobre fotos y verificá que se vean «¿» y «¡». Reservá el sticker crema para una fecha decisiva o una acción. El diseño ya usa «Guía ARCA» en la portada y «Guardá esta guía» en el cierre.
4. Revisá las cinco placas a tamaño de teléfono. Contrastá cada fecha y condición con la fuente, comprobá que no se corte el texto y que las llamadas a la acción coincidan con el tema. Prepará el epígrafe, el texto alternativo y el enlace con UTM para la historia o la biografía.
5. Guardá en la ficha los enlaces de Canva y de la nota, y su estado real. Cuando el conector pida aprobación para guardar una edición, compartí la vista de las placas concretas. Para una historia, adaptá el formato desde el diseño revisado y comprobá que el texto quede legible.

## Generar el sticker de fecha

Desde la raíz del repositorio, en PowerShell:

```powershell
./marketing/canva/Nuevo-Sticker-Fecha.ps1 -Fecha '30 JUN 2027' -Etiqueta 'Último día para adherir' -Salida 'marketing/canva/sticker-fecha-30-jun-2027.png'
```

El PNG tiene fondo transparente alrededor del recuadro y usa el ícono `CalendarDays` de Lucide. Subilo a Canva y agregá un texto alternativo con la fecha completa. [Código de Lucide](https://github.com/lucide-icons/lucide) · [Licencia incluida](LUCIDE-LICENSE.txt)

## Referencias para ampliar el flujo

- El repositorio oficial **Canva Skills** documenta la revisión de jerarquía, contraste y legibilidad por placa, la edición desde una copia y la adaptación a historias. Ese flujo se aplica en los pasos de arriba. [Canva Skills](https://github.com/canva-sdks/canva-skills#active-plugin-skills)
- Para generar muchas piezas desde datos, **Canva Autofill** permite vincular campos de una plantilla con títulos, fechas e imágenes. Requiere preparar esos campos y comprobar que la cuenta tenga acceso a Autofill. El ejemplo oficial incluye la conexión por API. [Guía de Autofill](https://www.canva.dev/docs/apps/rest-apis/autofill-guide/) · [Canva Connect API Starter Kit](https://github.com/canva-sdks/canva-connect-api-starter-kit)
