var fs = require('fs');
const { join } = require('path');
const  { tmpdir } = require('os');
const filename = process.argv[2];
const dest_dir = join(tmpdir(), 'ListeDeFilm');
const messages =  [];
const { compareAsc, format } = require('date-fns');
const now = format(new Date(), 'yyyy-MM-dd-hh_mm_ss')

function pushFile(movies) {
    console.log(now)
    return new Promise( (resolve, reject) => {
        fs.mkdir(dest_dir, () => {
            const filenameToCreate = join(dest_dir, `Movies${now}.txt`);
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




    


