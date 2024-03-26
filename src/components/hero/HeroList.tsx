import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HeroAvatar from "./HeroAvatar";
import { Hero } from "../../models/Heros";

interface Props {
    heroes: Hero[];
    openModal: (hero: Hero) => void;
}

// Display list of heroes
const HeroList = ({ heroes, openModal }: Props) => {
    return (
        <List>
            {heroes.map((hero) => (
                <ListItemButton key={hero.code} onClick={() => openModal(hero)}>
                    <ListItemAvatar>
                        <HeroAvatar hero={hero} />
                    </ListItemAvatar>
                    <ListItemText sx={{ textAlign: "center" }}>{hero.name}</ListItemText>
                </ListItemButton>
            ))}
        </List>
    );
};

export default HeroList;
