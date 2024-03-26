import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DOMPurify from "dompurify";
import HeroAvatar from "./HeroAvatar";
import { Hero } from "../../models/Heros";

interface Props {
    onClose: () => void;
    hero: Hero | null;
}

// Modal to display Hero information
const HeroDialog = ({ onClose, hero }: Props) => {
    if (!hero) return null;

    const sanitizedText = DOMPurify.sanitize(hero.text);

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{hero.name}</DialogTitle>
            <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <HeroAvatar hero={hero} size="lg" />
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                    <span className="white-space-pre-line" dangerouslySetInnerHTML={{ __html: sanitizedText }}></span>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default HeroDialog;
