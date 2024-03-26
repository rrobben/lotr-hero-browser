# LOTR Hero browser
Browse hero cards by deck ID. Fetch cards by clicking the button or by pressing Enter after typing the ID.

## Running locally
Install packages:
```npm install```

Run the app:
```npm run dev```

## Potential areas for improvement
There are several areas that could be worked as the current solution is not fine-tuned but would instead provide a platform and structure to additional development.

### Code structure
The HeroBrowser-component which renders the main view of the application could be divided even further by separating the deck selection to it's own component. This could be beneficial if more functionality is added to prevent the component to become too bloated.

### UI Responsiveness
Currently the app is not optimized to be displayed in mobile devices. Screen size should always be taken into account when designing and implementing UIs. However, it was left out to avoid spending too much time on the solution.

### UX
User should get feedback if the deck is not found or something else goes wrong while fetching the heroes.