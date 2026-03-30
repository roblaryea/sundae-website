import type { BlogLocaleTranslations } from '../types';
import { esBatch2BlogTranslations } from './es-batch-2';
import { esBatch3BlogTranslations } from './es-batch-3';
import { esBatch4BlogTranslations } from './es-batch-4';
import { esBatch5BlogTranslations } from './es-batch-5';
import { esBatch6BlogTranslations } from './es-batch-6';
import { esBatch7BlogTranslations } from './es-batch-7';
import { esBatch8BlogTranslations } from './es-batch-8';
import { esBatch9BlogTranslations } from './es-batch-9';
import { esBatch10BlogTranslations } from './es-batch-10';
import { esBatch11BlogTranslations } from './es-batch-11';
import { esBatch12BlogTranslations } from './es-batch-12';
import { esBatch13BlogTranslations } from './es-batch-13';
import { esBatch14BlogTranslations } from './es-batch-14';
import { esBatch15BlogTranslations } from './es-batch-15';
import { esBatch16BlogTranslations } from './es-batch-16';

export const esBlogTranslations: BlogLocaleTranslations = {
  "inside-sundae-canvas": {
    status: "translated",
    title: "Dentro de Sundae Core: convertir datos brutos en dashboards claros automáticamente",
    summary:
      "Sundae Core unifica datos de POS, personal, inventario y finanzas en dashboards operativos en tiempo real. Descubre cómo la normalización automática de datos elimina los reportes manuales.",
    readTime: "8 min de lectura",
    content: `## Introducción

Los operadores de restaurantes desperdician más de 10 horas por semana armando reportes manualmente. Exportan archivos CSV desde los sistemas POS, descargan datos de nómina desde plataformas de RR. HH., extraen conteos de inventario desde software de gestión y obtienen datos financieros de herramientas contables; luego pasan horas en Excel tratando de reconciliar formatos, corregir errores de datos y construir visualizaciones. Cuando el reporte está listo, la información ya quedó desactualizada y el momento para decidir ya pasó. **Sundae Core elimina todo esto** al unificar automáticamente cada fuente de datos en un solo dashboard operativo en tiempo real. No es solo otra herramienta de BI; es inteligencia para la toma de decisiones diseñada específicamente para operaciones de restaurantes con múltiples ubicaciones.

## Por qué esto importa para los operadores de restaurantes

Los operadores con múltiples ubicaciones enfrentan una complejidad única. Cada local genera miles de transacciones al día en sistemas de POS, nómina, inventario y feedback de clientes. El reporte tradicional obliga a consolidar manualmente estos datos, creando tres problemas críticos:

- **Pérdida de tiempo**: los equipos de finanzas dedican 10-15 horas semanales a crear reportes en lugar de analizar insights
- **Decisiones tardías**: cuando los datos se reúnen, el momento de actuar ya pasó
- **Puntos ciegos**: los procesos manuales omiten patrones y anomalías que los sistemas automatizados detectan al instante
- **Inconsistencia**: distintas personas construyen versiones diferentes del "mismo" reporte con cifras contradictorias

El costo es medible: los operadores que gestionan 20+ ubicaciones suelen perder entre 2 y 3 puntos de margen al año debido a decisiones tardías causadas por ciclos de reporte lentos.

## Los límites de las herramientas tradicionales

La mayoría de los grupos de restaurantes depende de una pila tecnológica fragmentada: POS para transacciones, software de nómina para personal, gestión de inventario para COGS, software contable para finanzas y plataformas de feedback de clientes para sentimiento. Cada sistema usa formatos de datos, calendarios de actualización y convenciones de nombres distintos.

El enfoque tradicional requiere:

1. **Exportaciones manuales**: descargar archivos CSV de cada sistema
2. **Limpieza de datos**: corregir errores de formato, reconciliar diferencias de nombres, manejar valores faltantes
3. **Malabares en Excel**: crear fórmulas, tablas dinámicas y gráficos
4. **Distribución**: enviar por email PDFs estáticos que ya están desactualizados en el momento en que se mandan

Este proceso manual y reactivo crea visibilidad 1D: ves lo que pasó la semana pasada, pero no tienes contexto sobre por qué ocurrió ni sobre qué hacer a continuación.

## Cómo cambia el panorama con Sundae

Sundae Core unifica automáticamente cada fuente de datos en un único dashboard operativo que ofrece inteligencia 4D en tiempo real:

- **Sundae Scout** normaliza los datos de todas las fuentes automáticamente, sin necesidad de mapeo manual de campos ni exportaciones CSV
- **Sundae Core** visualiza los datos unificados con dashboards específicos por rol para operadores, finanzas, marketing y RR. HH.
- **Sundae Core** supervisa los dashboards de forma continua y te alerta sobre anomalías antes de que se conviertan en crisis
- **Sundae Watchtower** agrega contexto competitivo mostrando cómo se comparan tus métricas con los benchmarks del mercado
- **Sundae Core** te permite hacer preguntas en lenguaje natural: "¿Por qué subió el costo laboral en la ubicación 12 el martes pasado?"

La transformación es fundamental: de un reporte manual que muestra lo que pasó la semana pasada, a una inteligencia automatizada que muestra lo que está pasando ahora mismo y qué deberías hacer.

## Escenarios del mundo real

**Escenario 1: Detección de variaciones laborales**

Un grupo de fast casual con 30 locales dedicaba 12 horas semanales a elaborar reportes de personal. Cuando finanzas detectaba que una ubicación estaba 4 puntos por encima del plan, ya era tarde: la variación se había acumulado durante tres semanas.

Después de implementar Sundae Core:

- Los dashboards de personal en tiempo real se actualizaban cada hora desde la integración de nómina
- Sundae Core detectó la variación en menos de 24 horas
- El equipo de operaciones aplicó de inmediato ajustes correctivos en la planificación
- Resultado: evitó $47K en sobrecostos laborales adicionales y ahorró al equipo de finanzas 10 horas semanales

**Escenario 2: Investigación del costo de alimentos**

Un grupo de restaurantes en Dubái notó que el costo de alimentos subía en general, pero no podía identificar qué ubicaciones o qué platos estaban impulsando el aumento. El reporte tradicional exigía comparar manualmente datos de mix del POS con costos de facturas de 8 proveedores distintos.

Con Sundae Core:

- Los dashboards automatizados de COGS mostraron el costo de alimentos por ubicación, categoría y artículo en tiempo real
- Se identificó que 3 ubicaciones tenían problemas de control de porciones en productos de alto volumen
- Operaciones aplicó acciones correctivas en 48 horas
- Resultado: redujo el costo de alimentos en 1.8 puntos en todo el portafolio, equivalente a $180K al año

**Escenario 3: Comparación del rendimiento del portafolio**

Un operador de franquicias que gestionaba 45 ubicaciones en los mercados del GCC tenía dificultades para comparar el rendimiento entre distintos conceptos y geografías. El reporte manual hacía que la comparación entre ubicaciones fuera lenta e inconsistente.

La vista unificada de Sundae Core:

- Rankings de rendimiento en tiempo real que mostraban qué ubicaciones sobresalían en eficiencia laboral, satisfacción de clientes e ingreso por metro cuadrado
- Identificación de mejores prácticas: ¿Qué hacen diferente las 10 ubicaciones top?
- Replicación sistemática de la excelencia en todo el portafolio
- Resultado: las ubicaciones del cuartil inferior mejoraron 2.2 puntos en eficiencia operativa en 90 días

## El impacto medible

Los operadores que implementan Sundae Core suelen lograr:

- **Ahorro de tiempo**: reducción de 10-15 horas semanales en trabajo manual de reportes
- **Decisiones más rápidas**: detección y respuesta a problemas en 24-48 horas en lugar de semanas
- **Mejores márgenes**: mejora de 1-3 puntos en personal, COGS y costos controlables
- **Mayor visibilidad**: dashboards en tiempo real reemplazan reportes semanales o mensuales estáticos
- **Consistencia**: una sola fuente de verdad elimina versiones contradictorias de los reportes
- **Escalabilidad**: agregar nuevas ubicaciones o fuentes de datos toma horas, no meses

El cálculo del ROI es simple: si ahorras 12 horas semanales con un costo laboral de $75/hora, eso equivale a $47K al año en ahorro directo de tiempo, antes de considerar las mejores decisiones habilitadas por la inteligencia en tiempo real.

## Lista para operadores: cómo empezar

**Paso 1: Identifica tus puntos de dolor actuales**

- ¿Cuántas horas dedica tu equipo a construir reportes semanales?
- ¿Qué tan rápido detectas y respondes a problemas operativos?
- ¿Distintos miembros del equipo tienen versiones diferentes de "las mismas" cifras?

**Paso 2: Conecta tus fuentes de datos**

- Sistema POS (transacciones, mix, ventas)
- Plataforma de nómina/RR. HH. (horas de personal, costos, programación)
- Gestión de inventario (COGS, desperdicio, niveles par)
- Software contable (P&L, real vs presupuesto)
- Plataformas de feedback de clientes (reseñas, puntajes de satisfacción)

**Paso 3: Configura dashboards específicos por rol**

- Operaciones: eficiencia laboral, conteo de transacciones, throughput
- Finanzas: P&L real vs plan, costos controlables, rentabilidad por ubicación
- Marketing: frecuencia de clientes, ticket promedio, efectividad promocional
- RR. HH.: rotación, costo laboral por ubicación, cumplimiento de horarios

**Paso 4: Define tu ritmo operativo**

- Diario: revisa dashboards en tiempo real para detectar anomalías
- Semanal: reunión de operaciones centrada en excepciones marcadas por Insights
- Mensual: revisión estratégica usando inteligencia 4D (Actual vs Plan vs Benchmark vs Prediction)

## Cierre y llamado a la acción

Sundae Core transforma los datos de los restaurantes de una carga de reporte en un activo operativo. En lugar de perder tiempo armando reportes manualmente, los operadores obtienen inteligencia en tiempo real que muestra qué está pasando ahora, cómo se compara con el plan y el mercado, y qué hacer a continuación.

La diferencia entre el reporte reactivo y la inteligencia proactiva es medible: decisiones más rápidas, mejores márgenes y más tiempo dedicado a la estrategia en lugar de a la arqueología de datos. Mira Sundae Core con tus propios datos: **reserva una demo** para descubrir cómo los dashboards automatizados eliminan los reportes manuales y desbloquean mejores decisiones en todo tu portafolio.`,
  },
  "why-nexus-replaces-dashboard-suite": {
    status: "translated",
    title: "Por qué Sundae Core reemplaza la mitad de tu suite de dashboards",
    summary:
      "La mayoría de los operadores usa 5 o más dashboards para encontrar respuestas. Sundae Core te permite hacer preguntas en lenguaje natural y recibir respuestas instantáneas y ricas en contexto. Se acabó la caza de dashboards.",
    readTime: "7 min de lectura",
    content: `## Introducción

El operador promedio de restaurantes usa 5-7 dashboards distintos cada día: POS para ventas, sistema de personal para programación, inventario para COGS, contabilidad para P&L y feedback de clientes para satisfacción. Encontrar una sola respuesta requiere averiguar qué dashboard tiene los datos, iniciar sesión, navegar por los menús, seleccionar rangos de fechas, aplicar filtros y hacer tú mismo el análisis. Cuando por fin tienes la respuesta, el momento de decidir ya pasó y has perdido 15 minutos en arqueología de datos. **Sundae Core corta ese ciclo** permitiendo que los operadores hagan preguntas en lenguaje natural y reciban una respuesta con contexto 4D adjunto. En lugar de saltar entre herramientas, el equipo puede mantenerse enfocado en la decisión.

## Por qué esto importa para los operadores de restaurantes

Los operadores con múltiples ubicaciones toman cientos de decisiones operativas cada semana. La BI tradicional basada en dashboards exige saber dónde mirar, cómo filtrar y cómo interpretar métricas aisladas. Eso crea cuatro ineficiencias críticas:

- **Cambio de contexto**: saltar entre 5+ dashboards rompe el foco y desperdicia tiempo
- **Curva de aprendizaje**: los nuevos miembros del equipo necesitan semanas para aprender dónde vive cada métrica
- **Carga analítica**: todavía tienes que averiguar qué significan los números y qué hacer con ellos
- **Respuesta lenta**: cuando llegas al dashboard correcto, formulas la consulta y extraes los insights, el momento ya pasó

El resultado es predecible: los operadores pasan más tiempo buscando datos que actuando sobre insights, y las decisiones críticas se retrasan porque encontrar respuestas es demasiado engorroso.

## Los límites de las herramientas tradicionales

Las plataformas tradicionales de BI fueron construidas para analistas, no para operadores. Asumen que ya sabes:

- Qué dashboard contiene la respuesta
- Cómo construir la consulta correcta
- Qué filtros aplicar
- Cómo interpretar la métrica aislada

Un flujo de trabajo típico se ve así:

1. "¿Por qué bajaron las ventas en la Ubicación 8 ayer?"
2. Inicia sesión en el dashboard de POS, selecciona Ubicación 8 y elige la fecha de ayer
3. Ves que las ventas bajaron 12%, pero no hay contexto sobre por qué
4. Cambias al dashboard de personal para revisar la programación
5. Cambias a la API del clima para ver si influyen factores externos
6. Cambias a inteligencia competitiva para revisar la actividad del mercado
7. Sintetizas manualmente cuatro fuentes de datos para formar una hipótesis
8. El momento de decidir ya pasó: ahora estás analizando ayer en lugar de actuar hoy

Este flujo reactivo de saltar entre dashboards es la razón por la que la mayoría de los operadores termina confiando en la intuición en lugar de en decisiones basadas en datos.

## Cómo cambia el panorama con Sundae

Sundae Core usa IA conversacional para que hagas preguntas directamente y recibas respuestas instantáneas con contexto 4D completo:

**Pregunta en lenguaje natural:**

"¿Por qué subió el costo laboral en la Ubicación 12 el martes pasado?"

**Obtén inteligencia 4D al instante:**

- **Actual**: el costo laboral llegó al 34.2%, 5.1 puntos arriba del martes anterior
- **Plan**: el objetivo era 29.1%, con una variación de +5.1 puntos
- **Benchmark**: la mediana del mercado es 28.7%, estás 5.5 puntos por encima del mercado
- **Prediction**: proyecta 33.8% esta semana sin intervención

**Además, análisis de causa raíz:**

- Error de programación: 3 personas FOH adicionales durante horas lentas
- Solapamiento de formación: 2 nuevos empleados en el mismo turno redujeron la eficiencia
- Factor externo: una promoción de la competencia generó un pico inusual de tráfico

**Con acción recomendada:**

- Inmediata: ajusta la programación de hoy para evitar recurrencias
- A corto plazo: escalona la formación de nuevos empleados para evitar pérdidas de eficiencia
- Estratégica: revisa la automatización de la programación para prevenir errores futuros

El flujo de trabajo también cambia. En lugar de navegar por dashboards para encontrar métricas aisladas, haces una pregunta directa y recibes una respuesta prescriptiva con el contexto de soporte ya ensamblado.

## Escenarios del mundo real

**Escenario 1: Reunión semanal de operaciones**

Enfoque tradicional: el gerente de operaciones pasa 2 horas antes de la reunión sacando reportes de 6 dashboards, armando resúmenes en Excel y preparando diapositivas. La reunión revisa lo que pasó la semana pasada, sin contexto sobre por qué ocurrió ni qué hacer.

Con Sundae Intelligence:

- El gerente pregunta: "Muéstrame los 5 principales problemas de rendimiento de esta semana"
- Sundae Intelligence identifica al instante: variación laboral en 3 ubicaciones, aumento del costo de alimentos en 2 ubicaciones y caída de satisfacción de clientes en 1 ubicación
- Cada problema incluye contexto 4D, análisis de causa raíz y acciones recomendadas
- La reunión de operaciones se convierte en una conversación estratégica sobre soluciones en lugar de una simple puesta al día
- Resultado: 2 horas ahorradas por semana y decisiones tomadas más rápido con mejor contexto

**Escenario 2: Investigación financiera**

El CFO nota que el costo laboral total viene subiendo, pero necesita entender qué ubicaciones, roles y periodos impulsan el aumento. El enfoque tradicional requiere consultar el sistema de nómina, exportar datos, crear tablas dinámicas y analizar patrones.

Con Sundae Intelligence:

- El CFO pregunta: "¿Por qué viene subiendo el costo laboral en todo el portafolio?"
- Sundae Intelligence analiza todas las ubicaciones e identifica: 12 ubicaciones por encima del plan por ineficiencias de programación, 5 ubicaciones afectadas por aumentos del salario mínimo y 3 ubicaciones con exceso de personal frente al volumen de transacciones
- Desglosa el impacto por ubicación y muestra comparación 4D (Actual vs Plan vs Benchmark vs Prediction)
- Recomienda acciones: implementar optimización de programación en las 12 ubicaciones, ajustar presupuestos por los aumentos salariales y dimensionar correctamente el personal en las ubicaciones sobredimensionadas
- Resultado: el CFO obtiene un análisis completo en 30 segundos en lugar de 3 horas

**Escenario 3: Efectividad de marketing**

El gerente de marketing lanzó una promoción en 15 ubicaciones, pero necesita entender rápidamente el ROI para decidir si expandirla a todo el portafolio.

Con Sundae Intelligence:

- Pregunta: "¿Cuál es el ROI de la promoción de la semana pasada?"
- Sundae Intelligence analiza datos de transacciones, calcula el ingreso incremental, considera el costo del descuento y compara con ubicaciones de control
- Muestra una vista 4D: incremento real vs incremento planificado vs rendimiento promocional de referencia vs resultados previstos si se amplía
- Identifica: la promoción funcionó bien en 10 ubicaciones y rindió por debajo en 5
- Recomienda: expandirla a ubicaciones similares y evitarla en ubicaciones con perfiles parecidos a las que rindieron peor
- Resultado: una decisión basada en datos en minutos, no en días

## El impacto medible

Los operadores que usan Sundae Core logran:

- **Ahorro de tiempo**: reducción del 60-70% en el tiempo dedicado a encontrar respuestas
- **Decisiones más rápidas**: el ciclo de decisión promedio baja de días a horas
- **Mejores resultados**: el contexto 4D lleva a decisiones más informadas
- **Menos dashboards**: los operadores eliminan 3-5 dashboards de propósito único
- **Onboarding más fácil**: los nuevos miembros del equipo son productivos de inmediato sin aprender múltiples sistemas
- **Enfoque estratégico**: se dedica tiempo a soluciones y no a la arqueología de datos

Ese ahorro de tiempo es fácil de cuantificar: si tu equipo de operaciones ahorra 5 horas semanales a un costo total de $85 por hora, eso equivale a $22K al año antes incluso de contar la mejora derivada de decisiones más rápidas y mejores.

## Lista para operadores: cómo empezar

**Paso 1: Identifica el dolor actual con tus dashboards**

- ¿Cuántos dashboards usas al día?
- ¿Cuánto tiempo pasas buscando respuestas versus actuando sobre insights?
- ¿Cuánto tardan los nuevos miembros del equipo en volverse competentes?

**Paso 2: Conecta Sundae Intelligence a tus datos**

- POS (ventas, transacciones, mix)
- Personal (horas, costos, programación)
- Inventario (COGS, desperdicio)
- Finanzas (P&L, presupuestos)
- Inteligencia competitiva (integración con Watchtower)

**Paso 3: Empieza a hacer preguntas**

- Comienza con tus preguntas más comunes: "¿Por qué bajaron las ventas?" "¿Dónde está el personal por encima del plan?" "¿Qué ubicaciones están rindiendo por debajo?"
- Sundae Intelligence aprende tu lenguaje y mejora las respuestas con el tiempo
- Guarda las preguntas frecuentes como accesos directos para tu equipo

**Paso 4: Reemplaza dashboards de forma sistemática**

- Identifica qué dashboards de propósito único responde mejor Sundae Intelligence
- Cancela herramientas redundantes para materializar ahorro de costos
- Enfoca los dashboards que queden en necesidades especializadas de visualización

## Cierre y llamado a la acción

La inteligencia para restaurantes se está moviendo del salto entre dashboards hacia preguntas directas con contexto adjunto. En lugar de buscar en 7 sistemas distintos para encontrar métricas aisladas, los operadores pueden preguntar lo que necesitan en lenguaje natural y obtener una respuesta que pueden usar de inmediato.

Sundae Core ayuda a los equipos a dedicar menos tiempo a buscar cifras y más tiempo a usarlas bien. **Reserva una demo** para ver cómo Sundae Intelligence puede reemplazar dashboards redundantes y hacer más fácil la toma de decisiones del día a día.`,
  },
  ...esBatch2BlogTranslations,
  ...esBatch3BlogTranslations,
  ...esBatch4BlogTranslations,
  ...esBatch5BlogTranslations,
  ...esBatch6BlogTranslations,
  ...esBatch7BlogTranslations,
  ...esBatch8BlogTranslations,
  ...esBatch9BlogTranslations,
  ...esBatch10BlogTranslations,
  ...esBatch11BlogTranslations,
  ...esBatch12BlogTranslations,
  ...esBatch13BlogTranslations,
  ...esBatch14BlogTranslations,
  ...esBatch15BlogTranslations,
  ...esBatch16BlogTranslations,
};
