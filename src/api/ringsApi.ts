import { Deck } from "../models/Deck";
import { Hero } from "../models/Heros";

export const BASE_URL = "https://ringsdb.com";

const fetchApi = async (path: string) => {
    const response = await fetch(`${BASE_URL}/api/public/${path}`);
    return await response.json();
};

// Fetch deck by ID
export const fetchDeck = async (id: string): Promise<Deck> => {
    return fetchApi(`decklist/${id}`);
};

// Fetch hero card by ID
export const fetchHero = async (id: string): Promise<Hero> => {
    return fetchApi(`card/${id}`);
};
