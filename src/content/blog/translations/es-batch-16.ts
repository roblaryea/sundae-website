import type { BlogLocaleTranslations } from '../types';

export const esBatch16BlogTranslations: BlogLocaleTranslations = {
  "forecast-driven-operations-scheduling-purchasing": {
    status: "translated",
    title: "De la previsión a la acción: cómo la inteligencia predictiva automatiza la planificación y las compras",
    summary:
      "Una previsión de ingresos es útil. Una previsión que genera automáticamente el calendario de personal de la semana siguiente y las órdenes de compra, ajustándose cada día a medida que evolucionan las predicciones, es transformadora. Así es como las operaciones guiadas por previsión eliminan la brecha entre saber lo que va a pasar y actuar sobre ello.",
    readTime: "10 min de lectura",
    content: `## La brecha entre saber y hacer

Amira dirigía las operaciones de una cadena fast-casual de 25 locales en Abu Dabi y Dubái. Su grupo había invertido en previsión de demanda seis meses antes, y las previsiones eran buenas: 88 % de precisión en horizontes de 14 días y 82 % en 30 días. Los modelos predecían correctamente el pico de demanda del Ramadán, el patrón de recuperación tras Eid y la caída de tráfico en verano mientras los residentes viajaban.

El problema no era la calidad de la previsión. El problema era la brecha entre la previsión y la acción.

Cada lunes por la mañana, el equipo de Amira recibía la previsión de demanda actualizada a 14 días. Luego pasaban los dos días siguientes traduciendo esa previsión manualmente en decisiones operativas:

**Personal**: los responsables de zona abrían el software de programación, consultaban las cifras previstas y ajustaban manualmente el plan de turnos de cada local. Con 25 locales, 4 franjas horarias y 7 días que programar, eso suponía 700 decisiones individuales de staffing. El proceso consumía de 8 a 12 horas de tiempo de managers en todo el equipo, tiempo dedicado a manipular hojas de cálculo en lugar de gestionar restaurantes.

**Compras**: el equipo de procurement tomaba la previsión de ingresos, aplicaba ratios históricos de mix de menú para estimar la demanda de ingredientes, comparaba esas estimaciones con los niveles de inventario actuales y generaba las órdenes de compra. Para 25 locales con más de 120 ingredientes cada uno, esto era otro día completo de trabajo analítico.

**El problema del retraso**: cuando el calendario de personal quedaba finalizado el miércoles y las órdenes de compra se emitían el jueves, la previsión ya se había actualizado dos veces. La previsión del lunes guiaba las acciones del jueves, un retraso de decisión de 3 días que erosionaba la ventaja de precisión que ofrecía el sistema de forecasting.

El coste total de esta brecha de traducción: aproximadamente 45.000 AED al mes en ineficiencia de staffing (demasiadas horas en días lentos, demasiado pocas en días fuertes) y 28.000 AED al mes en desperdicio de inventario (comprar según la previsión del lunes cuando la del jueves mostraba una demanda distinta). El sistema de forecasting generaba predicciones precisas. El equipo operativo no podía actuar lo bastante rápido sobre ellas.

Este es el problema que resuelven las operaciones guiadas por previsión. No mejores previsiones, sino una mejor traducción de las previsiones en acciones.

## Qué significa operar guiado por previsión

Flujo tradicional: previsión -> humano interpreta -> humano decide -> humano ejecuta -> retraso de 2-3 días

Flujo guiado por previsión: previsión -> el sistema genera recomendaciones -> humano revisa y aprueba -> ejecución en el mismo día

La diferencia es crítica. Las operaciones guiadas por previsión no eliminan el juicio humano. Eliminan el paso manual de traducción, esas horas de trabajo en hojas de cálculo en las que los managers convierten cifras de demanda en planes de turnos y órdenes de compra. El sistema hace la traducción automáticamente y presenta el resultado para aprobación humana.

### Planificación de personal guiada por previsión

El módulo Foresight de Sundae genera ahora calendarios de turnos recomendados directamente a partir de las previsiones de demanda:

**La entrada**: ingresos previstos, número de clientes y mix de pedidos por local, día y franja, generados por los modelos de ML de Foresight con horizontes de 14 a 365 días.

**La traducción**: los ratios históricos de productividad determinan cómo la demanda prevista se convierte en necesidades de mano de obra. Si el Local 7 genera históricamente 850 AED por hora de servidor durante la cena del jueves, y la cena del jueves está prevista en 12.750 AED, el sistema calcula que hacen falta 15 horas de servidor. Cálculos similares se ejecutan para cocina, host, runners y managers, cada uno con sus propios ratios de productividad calibrados para cada local.

**La salida**: un calendario recomendado completo para cada local, mostrando:
- Número de empleados por rol y por turno
- Horas recomendadas de inicio y fin alineadas con la curva de demanda prevista, no bloques rígidos de 4 horas
- Huecos marcados donde la disponibilidad actual del equipo no cubre la demanda prevista
- Proyección de coste del calendario recomendado frente a los objetivos presupuestarios

**Ajuste dinámico**: cuando la previsión se actualiza, algo que ocurre a diario a medida que llegan nuevos datos, el calendario recomendado se actualiza automáticamente. Si la previsión del jueves sube un 12 % el martes porque se anunció un evento cercano, la recomendación se ajusta de inmediato. El responsable de zona ve la recomendación actualizada y puede aprobar el ajuste con una sola acción, en lugar de recalcular manualmente 25 locales.

**Impacto financiero**: la cadena de Amira redujo la ineficiencia laboral asociada a la programación en 2,3 puntos porcentuales de ingresos tras implementar la planificación guiada por previsión. Sobre 18 M AED de ingresos mensuales, eso representó aproximadamente 414.000 AED al mes en optimización del coste laboral, todo ello eliminando el retraso de traducción, no recortando niveles de servicio.

### Compras guiadas por previsión

El mismo principio se aplica a procurement:

**La entrada**: ingresos previstos y mix de menú por local y día, combinados con inventario actual y plazos de entrega de proveedores.

**La traducción**: las previsiones de mix de menú determinan la demanda a nivel ingrediente. Si el jueves se prevé como un día de mucho seafood, el sistema calcula las cantidades específicas de cada producto, teniendo en cuenta rendimientos de preparación, factores de desperdicio e inventario disponible.

**La salida**: órdenes de compra recomendadas por proveedor, por local y por fecha de entrega:
- Cantidades calibradas a la demanda prevista, no a niveles estáticos de par
- Tiempos de entrega alineados con lead times y fechas de consumo previstas
- Proyecciones de coste que muestran cómo la orden recomendada se compara con el presupuesto
- Ítems marcados cuando el precio del proveedor ha cambiado desde el último pedido

**Reducción de desperdicio**: los niveles estáticos de par, como "mantener siempre 50 kg de pechuga de pollo", garantizan desperdicio cuando cae la demanda y roturas cuando sube. Las compras guiadas por previsión reemplazan los pares estáticos por cantidades dinámicas ajustadas a la demanda. El Local 12 puede pedir 35 kg de pechuga para una semana lenta prevista y 65 kg para una semana fuerte prevista. El nivel de par se adapta a la predicción.

**Impacto financiero**: la cadena de Amira redujo el desperdicio de alimentos en un 18 % y los incidentes de rotura de stock en un 73 % durante los tres primeros meses de compras guiadas por previsión. El desperdicio de inventario de 28.000 AED al mes bajó a 8.400 AED al mes, una mejora del 70 % impulsada exclusivamente por alinear las compras con la demanda prevista en lugar de usar medias históricas.

## La previsión integrada de P&L

Cuando la programación y las compras se guían por la demanda prevista, surge algo poderoso: una previsión de P&L integrada y prospectiva.

**Línea de ingresos**: directamente de la previsión de demanda de Foresight.

**Línea de labor**: directamente del calendario guiado por previsión (horas x tarifas x roles).

**Línea de COGS**: directamente de las órdenes de compra guiadas por previsión (cantidades x precios de proveedor).

**Proyección de margen**: ingresos menos labor menos COGS, por local, por día, por semana.

Esto no es un presupuesto creado trimestralmente y olvidado. Es una proyección viva de P&L que se actualiza a diario a medida que evolucionan las previsiones, reflejando las decisiones operativas reales (calendarios, órdenes de compra) que producirán el resultado financiero.

Para CFOs y directores de operaciones, esto cambia la naturaleza de la gestión financiera. En lugar de comparar los reales con un presupuesto estático al cierre del mes y explicar las desviaciones a posteriori, pueden ver la desviación proyectada con antelación y corregir antes de incurrir en el coste.

**Ejemplo**: el martes, la previsión de P&L muestra que el coste laboral del Local 14 estará 2,1 puntos por encima del objetivo esta semana porque la previsión de demanda cayó (el cierre de una carretera cercana está reduciendo el tráfico peatonal) pero el calendario actual no se ha ajustado. El director de operaciones revisa la recomendación de calendario guiado por previsión, aprueba una reducción de personal en los turnos afectados, y la proyección de P&L se actualiza inmediatamente para mostrar el coste laboral dentro del objetivo. La desviación se evitó, no se explicó.

## Caso de estudio: Ramadán 2026

La cadena de Amira utilizó operaciones guiadas por previsión en su primer Ramadán con el sistema completamente integrado. Los resultados comparados con Ramadán 2025, que usó traducción manual de previsión a acción:

**Velocidad de planificación**: la planificación de turnos de Ramadán, que antes requería 3 semanas de preparación manual en 25 locales, se generó automáticamente. Los responsables de zona pasaron 2 días revisando y ajustando recomendaciones en lugar de 3 semanas creando calendarios desde cero.

**Precisión del calendario**: los calendarios guiados por previsión coincidieron con la demanda real dentro de un 5 % en 22 de 25 locales. Los 3 desvíos correspondieron a eventos imprevisibles (una avería en una tubería principal, un evento gubernamental de última hora y un cierre de emergencia de un competidor). En 2025, solo 11 de 25 locales tenían calendarios dentro del 5 % de la demanda real.

**Precisión de compras**: las órdenes de ingredientes para iftar y suhoor se calibraron a la demanda diaria prevista. En particular, las órdenes de proteína, la categoría de mayor coste durante Ramadán, coincidieron con la demanda prevista con una precisión del 91 %. El resultado: cero roturas de stock en proteínas clave frente a 6 roturas en Ramadán 2025, y 22 % menos desperdicio de proteína.

**Impacto financiero**: los ingresos de Ramadán fueron un 14 % superiores a 2025, parcialmente por crecimiento de mercado y parcialmente por mejor ejecución. El coste laboral como porcentaje de ingresos mejoró 2,1 puntos. El desperdicio alimentario cayó 22 %. En conjunto, la mejora de Ramadán derivada de las operaciones guiadas por previsión fue de aproximadamente 520.000 AED en 30 días.

**Tiempo de managers**: el beneficio más infravalorado. Los responsables de zona recuperaron aproximadamente 15 horas por semana que antes dedicaban a cálculos manuales de calendario y pedidos. Ese tiempo se redirigió a visitas a restaurantes, desarrollo de equipos y experiencia de cliente, es decir, el trabajo que realmente impulsa el rendimiento a largo plazo.

## Cómo evolucionan con el tiempo las operaciones guiadas por previsión

Al igual que la capacidad de forecasting de Foresight, la automatización operativa mejora con la acumulación de datos:

**Mes 1-2: calibración.** El sistema aprende los ratios de productividad, rendimientos de preparación y patrones de mix de menú de cada local. Las recomendaciones iniciales pueden requerir ajustes manuales significativos mientras los modelos se calibran a tu operación.

**Mes 3-4: recomendaciones fiables.** Las recomendaciones se alinean muy de cerca con lo que decidirían managers experimentados de forma independiente. El flujo de revisar y aprobar sustituye al flujo de construir desde cero. Empiezan a materializarse los ahorros de tiempo.

**Mes 5-6: optimización proactiva.** El sistema empieza a identificar patrones de programación y compras que los managers humanos pasan por alto: locales donde un pequeño ajuste en las pausas mejora el throughput, o donde comprar un ingrediente a un proveedor distinto reduce el coste sin afectar la calidad. Las recomendaciones pasan de ser solo precisas a optimizar.

**Mes 7+: aprendizaje continuo.** Cada recomendación aprobada y cada ajuste manual entrena más el modelo. El sistema aprende las preferencias de cada manager y ajusta sus recomendaciones en consecuencia. Un manager que siempre añade un prep cook extra los viernes verá esa preferencia reflejada en recomendaciones futuras.

## El rol del operador cambia, no desaparece

Una preocupación común con la automatización operativa: "¿Vais a reemplazar a mis managers?"

No. Las operaciones guiadas por previsión reemplazan el trabajo de hoja de cálculo que mantiene a los managers en sus mesas en lugar de en los restaurantes. El rol del manager pasa de la manipulación de datos (traducir previsiones en calendarios) al juicio y la supervisión (revisar recomendaciones, ajustar por conocimiento local y tomar decisiones estratégicas que los modelos no pueden tomar).

El GM que sabe que un cliente habitual va a celebrar un evento privado el sábado, información que ningún modelo puede predecir, ignora la recomendación de añadir personal e inventario para ese evento. El responsable de zona que sabe que un nuevo sous chef todavía está aprendiendo el flujo de prep ajusta la recomendación laboral para incluir horas de solapamiento y formación. El procurement manager que oye que el proveedor de shrimp tiene problemas de calidad cambia el pedido al proveedor de respaldo.

Son decisiones de criterio que requieren experiencia humana. Las operaciones guiadas por previsión liberan a los managers para tomar esas decisiones eliminando 15-20 horas por semana de trabajo mecánico de traducción que consumía su capacidad.

## Cómo empezar

Las operaciones guiadas por previsión requieren que Foresight esté calibrado primero (mínimo 90 días de histórico de previsión para recomendaciones fiables). Para organizaciones que ya usan Foresight:

1. **Activa la programación guiada por previsión** en 3-5 locales piloto. Revisa las recomendaciones semanalmente junto con tus calendarios manuales actuales. Mide la brecha entre lo que recomienda el sistema y lo que decidirían managers experimentados.

2. **Calibra los ratios de productividad** durante el piloto. Cada local tiene características únicas; el sistema necesita 4-6 semanas para aprender la relación específica entre demanda y necesidades de labor de cada local.

3. **Amplía a compras** una vez que la programación esté calibrada. Las recomendaciones de compra requieren previsiones precisas del mix de menú, que mejoran a medida que madura la previsión de demanda.

4. **Despliega a todos los locales** una vez que los pilotos demuestren recomendaciones fiables. La transición de operaciones manuales a guiadas por previsión suele tardar de 6 a 8 semanas por lote de locales.

La brecha entre saber lo que va a pasar y actuar sobre ello es donde los grupos de restauración pierden más dinero. Las operaciones guiadas por previsión cierran esa brecha, convirtiendo automáticamente las predicciones en calendarios, órdenes de compra y proyecciones de P&L, para que los managers puedan concentrarse en dirigir restaurantes en lugar de hojas de cálculo.

**Reserva una demo para ver cómo la programación y las compras guiadas por previsión generan recomendaciones a partir de tus datos históricos** y cuantifica la brecha de traducción en tus operaciones actuales.`,
  },
  "sensitivity-analysis-which-assumptions-move-your-numbers": {
    status: "translated",
    title: "Análisis de sensibilidad: qué supuestos mueven realmente los números de tu restaurante",
    summary:
      "Toda previsión descansa sobre supuestos. Tasa de crecimiento, mix de delivery, ajuste estacional, ratios de staffing... pero ¿cuáles importan de verdad? El análisis de sensibilidad con diagramas tornado y simulación Monte Carlo separa los supuestos que mueven tu P&L del ruido.",
    readTime: "9 min de lectura",
    content: `## La reunión del consejo donde todos los números estaban equivocados

Nadia presentó su previsión del segundo trimestre al consejo de un grupo de 35 restaurantes. Ingresos: 52 M AED. Coste laboral: 28,5 %. Food cost: 30,2 %. Margen EBITDA: 14,8 %. El consejo aprobó la previsión, el presupuesto quedó fijado y al equipo se le asignaron sus objetivos.

Al cierre del segundo trimestre, los ingresos reales fueron 48,7 M AED, un 6,3 % por debajo de la previsión. Pero el fallo no estuvo distribuido de forma uniforme. Algunos supuestos fueron casi perfectos. Otros fueron catastróficamente erróneos. Y nadie había sabido de antemano qué supuestos cargaban con mayor riesgo.

El análisis posterior reveló:

**Supuesto de tasa de crecimiento**: la previsión asumía un crecimiento interanual del 4 % en todos los locales. El crecimiento real fue del 2,1 %. Impacto en ingresos: -1,9 M AED. Fue el mayor contribuyente al fallo.

**Supuesto de mix de delivery**: la previsión asumía que el delivery se mantendría en el 22 % de los ingresos. El mix real subió al 27 % porque una nueva plataforma lanzó promociones agresivas. Impacto en ingresos: +0,8 M AED (más volumen), pero -0,7 puntos de margen (más coste de comisión). Impacto neto: prácticamente neutro en EBITDA.

**Ajuste estacional**: la previsión asumía un patrón estacional estándar de Q2. El patrón real se movió dentro del 2 % de lo previsto. Impacto: insignificante.

**Supuesto de ratio de staffing**: la previsión asumía la misma productividad laboral que en Q1. Una ola de rotación en el mes 2 redujo el porcentaje de personal experimentado y la productividad cayó un 8 %. Impacto en coste laboral: +0,9 puntos de ingresos.

**Supuesto de ramp-up de locales nuevos**: la previsión asumía que 2 locales nuevos alcanzarían el 70 % del revenue de un local maduro al tercer mes. Alcanzaron el 45 %. Impacto en ingresos: -0,6 M AED.

Dos supuestos, tasa de crecimiento y ramp-up de locales nuevos, explicaban el 76 % del error total de previsión. El mix de delivery y el patrón estacional, que el equipo había debatido ampliamente en la sesión de planificación, resultaron ser casi irrelevantes para el resultado financiero.

La pregunta de Nadia tras el post-mortem fue: "¿Cómo sé de antemano qué supuestos importan de verdad?"

La respuesta es el análisis de sensibilidad.

## Qué hace realmente el análisis de sensibilidad

El análisis de sensibilidad responde a una pregunta simple: si cambio un supuesto en una pequeña cantidad, ¿cuánto cambia la salida?

Un supuesto que mueve significativamente el resultado es "sensible"; merece más atención, estimaciones más rigurosas, seguimiento más frecuente y planificación de contingencia. Un supuesto que apenas mueve la salida es "insensible"; importa menos si se equivoca, y dedicarle demasiado tiempo tiene poco valor.

Para operaciones de restauración, esto es muy práctico. Los operadores construyen docenas de supuestos al preparar una previsión: tasas de crecimiento, mix de delivery, patrones estacionales, productividad laboral, porcentaje de food cost, ticket medio, número de cubiertos, tarifas laborales, tendencias de precio de proveedores, curvas de ramp-up de locales nuevos. Es imposible analizarlos todos en profundidad. El análisis de sensibilidad te dice en cuáles centrarte.

## Diagramas tornado: qué importa de verdad

El módulo Foresight de Sundae incluye ahora diagramas tornado, la visualización más intuitiva de resultados de sensibilidad.

Un diagrama tornado funciona así:

1. Partes de la previsión base, tu mejor estimación actual con todos los supuestos en sus valores esperados
2. Tomas un supuesto y lo mueves a su límite optimista, por ejemplo, la tasa de crecimiento del 4 % al 6 %
3. Registras cuánto cambia la salida, por ejemplo, el EBITDA trimestral
4. Mueves el mismo supuesto a su límite pesimista, por ejemplo, del 4 % al 2 %
5. Registras también ese cambio
6. Repites con todos los supuestos
7. Ordenas los resultados por magnitud del impacto, del mayor al menor

El resultado parece un tornado tumbado: los supuestos con barras más anchas quedan arriba, y las barras se estrechan a medida que bajas hacia supuestos menos influyentes.

Para la previsión Q2 de Nadia, el diagrama tornado habría mostrado:

| Supuesto | Impacto pesimista | Impacto optimista |
|---|---|---|
| Tasa de crecimiento (2 % a 6 %) | -1,9 M AED | +1,9 M AED |
| Ramp-up de locales nuevos (45 % a 85 %) | -0,8 M AED | +0,6 M AED |
| Productividad laboral (-8 % a +5 %) | -0,7 M AED | +0,4 M AED |
| Mix de delivery (18 % a 30 %) | -0,3 M AED | +0,3 M AED |
| Patrón estacional (+/-3 %) | -0,2 M AED | +0,2 M AED |
| Ticket medio (+/-2 %) | -0,1 M AED | +0,1 M AED |

El tornado revela inmediatamente que la tasa de crecimiento domina la previsión: merece la mayor atención analítica, la validación más frecuente y el plan de contingencia más desarrollado. El patrón estacional y el ticket medio, en cambio, podrían estar bastante mal sin afectar materialmente al resultado.

### Cómo usan los operadores los diagramas tornado

**Preplanificación**: antes de cerrar una previsión, ejecuta el diagrama tornado para identificar qué supuestos concentran el riesgo. Invierte el tiempo analítico de forma proporcional: dedica el 60 % del esfuerzo de estimación a los 3 supuestos principales, no por igual a los 15.

**Comunicación de riesgo**: muestra al consejo no solo el número de previsión, sino también el diagrama tornado. "Nuestra previsión es 52 M AED, y el supuesto más importante es la tasa de crecimiento. Si el crecimiento llega al 2 % en lugar del 4 %, fallamos por 1,9 M AED. Aquí está nuestro plan de contingencia."

**Prioridad de seguimiento**: monitoriza los supuestos más sensibles en tiempo real. Si la tasa de crecimiento es el driver dominante, revisa el crecimiento interanual semanalmente, no mensualmente. Configura alertas sobre los supuestos sensibles para que cualquier desviación active avisos tempranos.

## Simulación Monte Carlo: incertidumbre honesta

Los diagramas tornado mueven un supuesto a la vez manteniendo todo lo demás constante. La realidad es más desordenada: varios supuestos cambian a la vez, y sus interacciones pueden amplificar o amortiguar los efectos individuales.

La simulación Monte Carlo aborda esto ejecutando miles de escenarios de previsión en los que todos los supuestos varían simultáneamente según sus distribuciones de probabilidad:

1. Para cada supuesto, defines una distribución de probabilidad. La tasa de crecimiento puede estar normalmente distribuida en torno al 4 % con una desviación estándar del 1,5 %. El mix de delivery puede estar distribuido uniformemente entre el 20 % y el 28 %.
2. Ejecutas 10.000 previsiones simuladas, cada una con un valor aleatorio para cada supuesto extraído de su distribución
3. Agrupas los 10.000 resultados en una distribución de probabilidades de salida

El resultado no es un único número, sino un rango de resultados probables con sus probabilidades asociadas:

- **P10 (pesimista)**: 46,2 M AED de ingresos
- **P50 (mediana)**: 51,4 M AED de ingresos
- **P90 (optimista)**: 55,8 M AED de ingresos

Esto es muchísimo más honesto que una previsión puntual. Cuando Nadia dice "nuestra previsión es 52 M AED", el consejo oye precisión. Cuando dice "nuestro rango de previsión es 46-56 M AED con un resultado más probable de 51 M AED", el consejo oye incertidumbre honesta y puede planificar en consecuencia.

### Bandas de confianza en las previsiones

El módulo Foresight de Sundae muestra los resultados Monte Carlo como bandas de confianza en los gráficos de previsión. La línea base está rodeada por bandas sombreadas:

- **Banda oscura** (P25-P75): el rango "probable", que contiene el 50 % de las simulaciones
- **Banda clara** (P10-P90): el rango "posible", que contiene el 80 % de los resultados
- **Borde exterior** (P5-P95): el rango "extremo", improbable pero no imposible

Estas bandas se ensanchan cuanto más lejana es la previsión, reflejando que la incertidumbre aumenta con el tiempo. Una previsión de 14 días puede tener una banda de +/-5 %. Una de 365 días puede tener una banda de +/-20 %. La visualización comunica de inmediato cuánto confiar en el número en cada horizonte temporal.

### Tiers de confianza adaptativos

Las bandas de confianza de Foresight no son porcentajes estáticos. Se adaptan según:

- **Precisión histórica del modelo**: si el modelo ha alcanzado consistentemente un 90 % de precisión en 14 días, la banda a 14 días será estrecha. Si la precisión a 90 días ha sido del 75 %, la banda a 90 días será más amplia.
- **Calidad de datos**: los locales con históricos completos y de alta calidad obtienen bandas más estrechas. Los locales con datos escasos o inconsistentes obtienen bandas más amplias.
- **Incertidumbre externa**: durante periodos de alta incertidumbre externa, como Ramadán o una actividad competitiva importante, las bandas se amplían automáticamente.

## Análisis de contribución de módulos

Una pregunta natural del análisis de sensibilidad es: "¿De dónde sale realmente la señal de la previsión?"

El diagrama Sankey de contribución de módulos de Sundae lo responde visualmente. El diagrama muestra cómo los datos de cada módulo de inteligencia fluyen hacia la previsión final:

- Los datos de inteligencia de revenue contribuyen X % de la señal
- Los de inteligencia laboral contribuyen Y %
- Los de delivery intelligence contribuyen Z %
- Los de Watchtower contribuyen W %
- Los de guest intelligence contribuyen V %

Esta transparencia sirve para dos cosas:

**Calibración de confianza**: si la previsión depende mucho de una fuente de datos concreta y esa fuente tiene problemas de calidad, los operadores saben que deben ajustar su confianza.

**Priorización de inversión en datos**: si los datos de guest intelligence aportan el 25 % de la señal de previsión pero la organización no ha invertido en integración de feedback de clientes, mejorar ese feed mejoraría la precisión de la previsión. El Sankey guía las decisiones de inversión en datos.

## Análisis interactivo de what-if

Además de los diagramas tornado estáticos, Foresight ofrece análisis de sensibilidad interactivo:

**Arrastrar y ajustar**: mueve un slider para cualquier supuesto y observa cómo la previsión, la proyección de P&L y las bandas de confianza se actualizan en tiempo real. No hace falta reentrenar el modelo; los cálculos de sensibilidad ya están precalculados para responder al instante.

**Escenarios combinados**: ajusta varios supuestos a la vez para modelar efectos compuestos. "¿Qué pasa si el crecimiento cae al 2 %, el mix de delivery sube al 30 % y perdemos 2 miembros clave del equipo?" El impacto combinado suele ser no lineal, peor (o mejor) que la suma de los efectos individuales.

**Análisis de breakeven**: "¿Qué tasa de crecimiento necesitamos para alcanzar nuestro objetivo de EBITDA?" El sistema resuelve hacia atrás desde el resultado objetivo para identificar los valores de supuesto necesarios, similar a goal-seek en hojas de cálculo pero sobre todo el modelo multifactor.

## De análisis a acción

El análisis de sensibilidad no es un ejercicio académico. Impulsa decisiones operativas concretas:

**Seguimiento de supuestos**: los 3 supuestos principales del diagrama tornado deben revisarse semanalmente con umbrales de alerta definidos. Si la tasa de crecimiento cae por debajo del 3 % (el límite pesimista), activa el plan de contingencia de inmediato, sin esperar al cierre mensual.

**Planificación de contingencia**: para cada supuesto sensible, define qué harás si se mueve en contra. ¿El crecimiento se desacelera? ¿Qué locales verán menos inversión en marketing? ¿Qué locales recibirán más promoción? ¿La productividad laboral cae? ¿Qué locales reciben formación adicional? ¿Cuáles necesitan staffing temporal de agencia?

**Comunicación de previsión**: comparte el diagrama tornado y las bandas de confianza con todos los stakeholders que usan la previsión. Los equipos de compras necesitan saber que la previsión a 30 días tiene una incertidumbre de +/-8 %, así que deben mantener stock colchón en las categorías más sensibles.

**Priorización estratégica**: si el mix de delivery es un supuesto muy sensible, invierte en estrategia de delivery. Si el ramp-up de locales nuevos es sensible, invierte en playbooks de apertura y aceleración. El análisis de sensibilidad te dice dónde el esfuerzo marginal genera más impacto financiero.

## La sesión trimestral de planificación, mejorada

Con análisis de sensibilidad, la siguiente presentación de Nadia al consejo fue distinta:

"Nuestra previsión base de Q3 es de 54 M AED, con un rango P10-P90 de 49 a 58 M AED. Los tres supuestos que explican el 80 % del riesgo de previsión son tasa de crecimiento, retención de personal y comisión de plataformas de delivery. Tenemos planes de contingencia para cada uno: si el crecimiento se queda corto, aceleramos el lanzamiento del programa de fidelidad. Si la retención empeora, activamos el acuerdo pre-negociado con agencias de staffing. Si suben las comisiones, trasladamos más presupuesto de marketing a promociones dine-in."

El consejo no recibió solo un número. Recibió un número con incertidumbre honesta, una comprensión clara de qué impulsa esa incertidumbre y un plan específico para cada escenario de riesgo. Esa es la diferencia entre hacer forecasting y hacer inteligencia de previsión.

**Reserva una demo para ver análisis de sensibilidad sobre tus datos históricos**: identifica qué supuestos mueven realmente tus números y construye previsiones que te preparen para lo que podría pasar, no solo para lo que esperas que pase.`,
  },
};
