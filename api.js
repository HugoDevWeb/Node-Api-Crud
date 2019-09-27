var fs = require('fs');
const { join } = require('path');
const  { tmpdir } = require('os');

const filename = process.argv[2];
const dest_dir = join(tmpdir(), 'ListeDeFilm');
const messages =  [];





function pushFile(movies) {
    return new Promise( (resolve, reject) => {
        fs.mkdir(dest_dir, () => {

            const filenameToCreate = join(dest_dir, `Movies ${Date.now()}.txt`);
            const message = `Chemin du fichier qui vient d'être créer : ${filenameToCreate}`;
           
        
            movies.forEach((movie) => {
                const content = `Titre du film :${movie.title} --- créé le: ${movie.created_at}\n`;
                fs.appendFile(filenameToCreate, content, (err) => {
                    if(err) reject(err)
                    messages.push(message)
                    });
        });

            
            
        })
    })
    
}

module.exports =  { pushFile }




    


