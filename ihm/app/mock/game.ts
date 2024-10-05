// app/mocks/gamesMock.ts

export interface Game {
    id: number;
    name: string;
    image: string;
    audience: number;
    topStreamers: string[];
    description: string;
    releaseDate: string;
    genres: string[];
}

export const games: Game[] = [
    {
        id: 1,
        name: "Just Chatting",
        image: "/mock/just-chating.jpg",
        audience: 45000,
        topStreamers: ["StreamerA", "StreamerB", "StreamerC"],
        description: "Discussions informelles et interactions avec les spectateurs.",
        releaseDate: "N/A",
        genres: ["Talk Shows", "Entertainment"],
    },
    {
        id: 2,
        name: "League of Legends",
        image: "/mock/lol.jpg",
        audience: 750000,
        topStreamers: ["Faker", "Tyler1", "Doublelift"],
        description: "Un jeu de stratégie d'équipe où deux équipes s'affrontent sur la Faille de l'invocateur.",
        releaseDate: "2009",
        genres: ["MOBA", "Action", "Stratégie"],
    },
    {
        id: 3,
        name: "Grand Theft Auto V",
        image: "/mock/gta-v.jpg",
        audience: 320000,
        topStreamers: ["xQc", "Summit1g", "Lirik"],
        description: "Explorez la ville de Los Santos dans ce jeu de monde ouvert légendaire.",
        releaseDate: "2013",
        genres: ["Action", "Aventure", "Monde Ouvert"],
    },
    {
        id: 4,
        name: "Valorant",
        image: "/mock/valorant.png",
        audience: 280000,
        topStreamers: ["Shroud", "Tenz", "Pokimane"],
        description: "Un FPS tactique où chaque agent possède des compétences uniques.",
        releaseDate: "2020",
        genres: ["FPS", "Tactique", "Compétition"],
    },
    {
        id: 5,
        name: "Minecraft",
        image: "/mock/minecraft.jpg",
        audience: 150000,
        topStreamers: ["Dream", "GeorgeNotFound", "TommyInnit"],
        description: "Un jeu de construction en monde ouvert où les seules limites sont votre imagination.",
        releaseDate: "2011",
        genres: ["Survie", "Création", "Monde Ouvert"],
    },
    {
        id: 6,
        name: "World of Warcraft",
        image: "/mock/wow.png",
        audience: 200000,
        topStreamers: ["Asmongold", "EsfandTV", "Preach"],
        description: "Un MMORPG où les joueurs explorent le vaste monde d'Azeroth.",
        releaseDate: "2004",
        genres: ["MMORPG", "Fantasy", "RPG"],
    },
    {
        id: 7,
        name: "Rocket League",
        image: "/mock/rocket.jpg",
        audience: 100000,
        topStreamers: ["Rizzo", "Jstn", "SquishyMuffinz"],
        description: "Un jeu compétitif mêlant football et voitures à grande vitesse.",
        releaseDate: "2015",
        genres: ["Sport", "Action", "Compétition"],
    },
    {
        id: 8,
        name: "EA Sports FC 25",
        image: "/mock/ea-fc.jpg",
        audience: 180000,
        topStreamers: ["Castro1021", "Bateson87", "Nick28T"],
        description: "Le tout nouveau jeu de football EA Sports, reprenant le flambeau de FIFA.",
        releaseDate: "2023",
        genres: ["Sport", "Simulation", "Compétition"],
    },
    {
        id: 9,
        name: "Super Smash Bros Ultimate",
        image: "/mock/ssb.jpg",
        audience: 90000,
        topStreamers: ["MkLeo", "Tweek", "Nairo"],
        description: "Un jeu de combat frénétique avec des personnages emblématiques de Nintendo.",
        releaseDate: "2018",
        genres: ["Combat", "Multijoueur", "Action"],
    },
    {
        id: 10,
        name: "Elden Ring",
        image: "/mock/eldenring.jpg",
        audience: 120000,
        topStreamers: ["VaatiVidya", "Oroboro", "LobosJR"],
        description: "Un action-RPG en monde ouvert développé par FromSoftware, créateurs de Dark Souls.",
        releaseDate: "2022",
        genres: ["RPG", "Action", "Monde Ouvert"],
    },
];
