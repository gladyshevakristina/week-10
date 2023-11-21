const express = require ('express');
const axios = require ('axios');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res)=>{ 
    let url = 'https://api.themoviedb.org/3/movie/575264?api_key=20ad6a2c1f2137bb81394c43e1365f13';
    axios.get(url)
    .then(response => { 
        let data = response.data;
        let releaseDate = new Date(data.release_date).getFullYear ();

        let genresToDisplay ='';

        data.genres.forEach(genre => {
            genresToDisplay = genresToDisplay + `${genre.name}, `;
            
        });

        let genresUpdated = genresToDisplay.slice(0, -2) + '.';
        let posterUrl = `https://image.tmdb.org/t/p/w1280${data.poster_path}`;
        let currentYear = new Date().getFullYear();

        res.render('index', {
            dataToRender: data, 
            year: currentYear,
            releaseYear: releaseDate,
            genres: genresUpdated,
            poster: posterUrl
        });
          
     });

    
});

app.listen(process.env.PORT || 3000, ()=>{ 
    console.log('Server is running on port 3000.');

});