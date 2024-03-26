import Avatar from "@mui/material/Avatar";
import { Hero } from "../../models/Heros";
import { BASE_URL } from "../../api/ringsApi";

type AvatarSize = "sm" | "lg"; // Defaults to "sm"

interface Props {
    hero: Hero;
    size?: AvatarSize;
}

const getWidth = (size: AvatarSize) => (size === "lg" ? 300 : 75);

const getHeigth = (size: AvatarSize) => (size === "lg" ? 400 : 100);

// Display Hero card image
const HeroAvatar = ({ hero, size = "sm" }: Props) => (
    <Avatar
        alt={hero.name}
        src={`${BASE_URL}${hero.imagesrc}`}
        variant="square"
        className="hero-avatar"
        sx={{ width: getWidth(size), height: getHeigth(size) }}
    />
);

export default HeroAvatar;
