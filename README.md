# Jammming

This project is served on [Github Pages](https://jandw.github.io/codeacademy-jamming) instead of having been deployed by Surge.

## 🚨 🚨 🚨 A few questions for the codeacademy reviewer 🚨 🚨 🚨

1. When searching, the page reloads, I'm assuming because of the [redirection happening](https://github.com/JanDW/codeacademy-jammming/blob/21cc9bf60fa562b20b2f7272987b6d53c72d3587/src/util/Spotify.js#L40) after getting the `accessToken`. How can I avoid this?

2. How do I best reset the state of `this.state.playListName` and `this.state.playListTracks`?
   Currently, [I just reset them](https://github.com/JanDW/codeacademy-jammming/blob/61c00e262ab2b5076545c3b4cca829a5f507c58a/src/components/App/App.js#L53), regardless of whether the requests have actually succeeded. I have tried chaining `.then()` to `Spotify.savePlayList()` (like I did for `Spotify.search(searchTerm)`) but since the promise doesn't return anything that doesn't work.

3. Would love to see what you guys consider the best solution for the `Spotify.js` file.

Thanks!

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
