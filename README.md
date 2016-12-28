# Please note: OBSOLETE
Note this project is retired and [React-based](https://github.com/EricHripko/material-reacts) approach is now used. This is because x-tag library (and this project as a result) lacks tools to manage state in a sane manner. This leads to various problems in deciding when to re-render the component and makes overall data binding and state management difficult (which pollutes the code unnecessarily).
React (especially TypeScript flavour) addresses all of the above-mentioned issues and leads to a cleaner and leaner structure. Main effort now is to port the old code to use React as a main driver whilst matching the functionality of this library. Some components have been already ported and look much cleaner code-wise already :)

# x-material
We aim to create a toolkit of web components that does not require huge frameworks, custom JavaScript processors and does not dictate the user how their apps should be developed. Instead the x-material provides pluggable and friendly custom components that do not differ conceptually from other HTML elements. 

The library is built on top of x-tag and provides lightweight web components for designing user interfaces according to Material Design specification. The library is very much work in progress and will likely to change public API frequently - it currently cannot be used in production.

## Demo
See the live demonstration [here](https://material.isat.xyz/).

## Browser Support
Chrome, Firefox, Safari, IE 10+
