import axios from "axios";

const API_KEY = "057fa13720a84b8c8e969fbf4c310d9e";
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getGames = async () => {
    try {
        const response = await axios.get(API_URL);
       // console.log('API Response:', response.data.results);
        return response.data.results.map(game => ({
            id: game.id,
            title: game.name,
            img: game.background_image,
            rating: game.rating,
            price: Math.floor(Math.random() * 1000),
            quantity: 1,
        }));
    } catch (error) {
        console.error("API'den veri çekme hatası:", error);
        return [];
    }
};

export default getGames;
