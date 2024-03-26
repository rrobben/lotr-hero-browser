import { useEffect, useMemo, useState } from "react";
import HeroList from "./HeroList";
import HeroDialog from "./HeroDialog";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { fetchDeck, fetchHero } from "../../api/ringsApi";
import { Hero } from "../../models/Heros";

// Fetch heroes for deck by id and browse results.
const HeroBrowser = () => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [deckId, setDeckId] = useState<string>("");
    const [visibleHeroIds, setVisibleHeroIds] = useState<string[]>([]);
    const [heroes, setHeroes] = useState<Hero[]>();
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

    useEffect(() => {
        const newHeroIds = visibleHeroIds.filter((id) => !(heroes || []).map((h) => h.code).includes(id));

        if (newHeroIds.length > 0) {
            getHeroes(newHeroIds);
        } else {
            // Set fetching to false if all heroes have already been fetched.
            setFetching(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleHeroIds, heroes]);

    const getDeck = async (id: string) => {
        setFetching(true);
        const data = await fetchDeck(id).catch((e) => {
            console.error(e);
            setFetching(false);
            setVisibleHeroIds([]);
        });

        if (data) {
            // Update visible heroes based on deck
            setVisibleHeroIds(Object.keys(data.heroes));
        }
    };

    const getHeroes = async (ids: string[]) => {
        const newHeroes: Hero[] = [];

        // Fetch all heroes by id and then update them to state.
        Promise.all(ids.map((id) => fetchHero(id).then((h) => newHeroes.push(h)))).finally(() => setHeroes([...(heroes || []), ...newHeroes]));
    };

    const openModal = (hero: Hero) => {
        setSelectedHero(hero);
    };

    const closeModal = () => {
        setSelectedHero(null);
    };

    const deckIdIsValid = useMemo(() => {
        const parsedDeckId = parseInt(deckId);
        return deckId && !isNaN(parsedDeckId) && parsedDeckId > 0;
    }, [deckId]);

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && deckIdIsValid) {
            getDeck(deckId);
        }
    };

    const visibleHeros = useMemo(() => (heroes || []).filter((h) => visibleHeroIds.includes(h.code)), [visibleHeroIds, heroes]);

    return (
        <>
            <TextField
                label="Deck ID"
                type="number"
                value={deckId}
                placeholder="123"
                sx={{ verticalAlign: "middle" }}
                onChange={(e) => setDeckId(e.target.value)}
                onKeyUp={handleEnterPress}
            />
            <Button variant="contained" disabled={fetching || !deckIdIsValid} sx={{ marginLeft: 2 }} onClick={() => getDeck(deckId)}>
                Fetch Deck
            </Button>
            <Backdrop sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={fetching}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <HeroList heroes={visibleHeros} openModal={openModal} />
            <HeroDialog onClose={closeModal} hero={selectedHero} />
        </>
    );
};

export default HeroBrowser;
