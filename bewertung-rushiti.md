# Bewertung Altin Rushiti

## Anmerkungen:
Gesamtarchitektur nur textuell beschrieben. Keine grafische Aufbereitung. UML-Klassendiagramm nur als asta-Datei bereitgestellt. /update_score und /get_current_user sind keine RESTful Pfade. In REST werden Ressourcen adressiert, keine Tätigkeiten. Bspw. ist GET /get_current_user redundant. GET /current_user ist ausreichend oder noch besser GET /user/{id}, denn die Ressource ist ein User. /register wäre dann konsequenterweise POST /user. Und DELETE /delete wäre besser DELETE /user/{id} geworden. Im wesentlichen wurden ansonsten alle Transferleistungen demonstriert, allerdings nur an einem Single Service Deployment. Das Repo hätte stellenweise sinnvoller in Frontend / Backend gegliedert werden können. Game Loop läuft im Controller. Dadurch wie Model und Controller etwas vermischt.

## Note für Mitarbeit im Praktikum (20%): 1,30

- Teste (erzielte Punkte): 94,37%
- Anwesenheit (0-100): 100

## Note für Projekt (80%): 2,26
**Projekt-Teilnoten für Implementierung (insg. 50%):**

- (20%) Game-Frontend (MVC-konform, DOM-Tree basiert, Sprache, Kubernetes deploybar): **1,30**
- (15%) Backend (REST-konform, Python, sinnvoller State, können Nutzer Ihre Daten löschen, Kubernetes deploybar): **3,00**
- (5%) Kubernetes (welche Konzepte wurden genutzt: Ingress, Service, Deployment, PVC, Single/Multi-Service, in K8s lauffähig [KILL-Kriterium]): **2,00**
- (5%) Pipeline (lauffähig, nachvollziehbar, angemessene Komplexität): **2,00**
- (5%) Repo und Kubernetes Namespace (aufgeräumt, unnötige Dateien in Repo bzw. Ressourcen im Namespace entfernt?): **3,00**

**Projekt-Teilnoten für Dokumentation (insg. 20%):**

- (5%) Projektbericht (Lesbarkeit, Inhaltsverzeichnis, tab. Anforderungsabdeckung, als Wiki): **2,00**
- (10%) Projektbericht (Gesamtarchitektur, Modeldokumentation, Klassendiagramm, MVC-Konformität): **3,00**
- (5%) Projektbericht (Link auf die Online API-Dokumentation der REST-API): **5,00**

**Projekt-Teilnote für Spielspaß (10%):** 1,00

## Gesamtnote (Praktikum + Projekt):

Gesamtnote (rechnerisch): 2,07

**Gesamtnote (gegeben): 2,00**
