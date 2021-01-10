# Introducción a Javascript
Entrega de práctica de Introducción a javascript BootCamp Web X

## World Cup Simulator

La práctica consiste en desarrollar un simulador de la copa del mundo de fútbol

## El mundial de fútbol
El campeonato del mundo de fútbol los disputan 32 equipos nacionales de diferentes paises y consta de dos fases:

* Fase de grupos
* Fase de eliminatorias (playoff)

### Fase de Grupos

Los 32 equipos se agruparán en 8 grupos de 4 equipos cada uno.

Los grupos se nombrarán por letras en orden alfabético, de la A hasta la H.

Se repartirán los 32 equipos aleatoriamente en los 8 grupos. Para cada grupo, se jugará una liga de una sola vuelta, enfrentando a todos los equipos del grupo entre ellos.

Tras jugar todos los partidos entre los equipos, tan sólo los dos primeros de cada grupo se clasificarán para la fase de eliminatorias, por lo que quedarán 16 equipos para jugar la final.

#### Restricciones

- Los equipos se distribuirán en los grupos de forma aleatoria.
- En cada grupo, todos los equipos deberán jugar entre sí.
- La victoria supondrá ganar 3 puntos, el empate 1 y la derrota 0.
- La clasificación de la fase de grupos se realizará bajo los siguientes criterios:
	- Los equipos se ordenarán en función de los puntos ganados descendentemente.
	- En caso de empate a puntos, será el primer equipo que haya ganado al otro en enfrentamiento entre ambos.
	- En caso de empate, habrá ganado el que la diferencia de goles realizados y encajados sea mayor.
	- Y si esto no fuera suficiente, será primero el equipo por orden alfabético.

#### Requisitos con la fase de grupos

- En primer lugar, cargamos los equipos participantes en un array.

<p align="center">Array de equipos participantes</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2019.12.49.png?raw=true" alt="Array de equipos" width="300"/>
</p>


- Al arrancar el programa deberá mostrar por pantalla la información de los equipos que hay en cada grupo y la planificación de partidos del mismo.
	- Nombre del grupo.
	- Listado de los equipos (uno en cada linea)
- La asignación de los equipos a cada grupo se realizará de forma aleatoria.

<p align="center">Información de equipos en cada grupo</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2019.13.05.png?raw=true" alt="Array de equipos" width="150"/>
</p>

<p align="center">Planificación de partidos en cada grupo</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2019.13.32.png?raw=true" alt="Array de equipos" width="400"/>
</p>


- Después se anunciará con un texto el comienzo del torneo.
- A continuación se mostrarán los resultados de los partidos y la clasificación de cada grupo tras el final de la primera jornada de partidos, después los de la segunda jornada y finalmente los de la tercera jornada.

<p align="center">Comienzo del torneo, resultado y clasificación diario y final por grupo</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2019.14.16.png?raw=true" alt="Array de equipos" width="700"/>
</p>


<p align="center">Aplicamos los criterios de ordenación según el enunciado</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2016.58.41_ClasificadoGrupo.png?raw=true" alt="Array de equipos" width="700"/>
</p>

<p align="center">Clasificación y criterio de ordenación para el grupo anterior en su tercera jornada</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2016.59.39_ClasificaGrupo.png?raw=true" alt="Array de equipos" width="700"/>
</p>

<p align="center">Clasificación por los cuatro criterios</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2017.26.50_ClasificaAlfa.png?raw=true" alt="Array de equipos" width="700"/>
</p>


- Una vez finalice la fase de grupos, se deberá anunciar el comienzo de la fase de eliminatorias.

<p align="center">Equipos que pasan a la fase de eliminatorias</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2019.15.06.png?raw=true" alt="Array de equipos" width="250"/>
</p>

### Fase de eliminatorias (playoff)

La fase de eliminatorias la jugarán los 16 mejores equipos de la fase de grupos, en concreto, los dos primeros de cada grupo.

En la fase de eliminatorias, no puede haber empates. En caso de haberlos, se deberá jugar hasta que un equipo finalmente gane.

La segunda ronda de la fase de eliminatorias(cuartos de final) enfrentará a los 8 equipos ganadores de los partidos de la ronda anterior (octavos de final). Los ganadores de estos partidos pasarán a la siguiente ronda (semifinales).

Los equipos ganadores de las semifinales, pasarán a la final y los equipos perdedores jugarán un partido para establecer el tercer y cuarto puesto de la clasificación.

#### Restricciones aplicadas

Dos equipos que se hayan encontrado en la fase de grupos, no podrán volver a encontrarse en la fase de eliminatorias hasta el final. Para garantizar esto, los primeros equipos de los grupos A, B, C y D y los segundos equipos de los grupos E, F, G y H, irán por una lado del cuadro y los primeros equipos de los grupos E, F, G y H y los segundos equips de los grupos A, B, C y D irán por otro lado del cuadro.

<p align="center">Según el criterio de restricción aplicado, se han dividido los equipos en dos gurpos, grupo A y grupo B. El reparto quedará de la siguiente forma</p>
<p align="center">
<img src="https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2019.15.17.png?raw=true" alt="Array de equipos" width="250"/>
</p>

#### Requisitos fase de eliminatorias






				























![Enlace ejemplo](https://github.com/JosepCristobal/Introduccion_javascript_PT/blob/master/Img/2021-01-10%20a%20las%2016.58.41_ClasificadoGrupo.png)
