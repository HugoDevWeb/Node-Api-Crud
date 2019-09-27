# Node-api-CRUD

Bienvenu sur la plateforme api crud pour la création de films.

INFOS BDD:
Bdd name: apiNodeCrud
Table name: apinodecrud


Afin de télécharger toutes les dépendances présentes dans le projet:
npm install

Concernant les routes CRUD:

GET -> /movies, vous permettra de récupérer le titre et la date de créatio du film.
POST -> /createMovie, vous permettra de créer un nouveau film, (entrer les clés 'title' et 'created_at' dans le body de la request)
PUT -> /editMovie/:id, vous permettra de changer le titre ou la date d'un film. passer dans l'ulr l'id du film choisi et le 'title' et 'created_at' dans le body de la request
DELETE-> /deleteMovie/:id, vous permettra de supprimer un film en inscrivrant son id dans l'url

Recherche API:
/recherche