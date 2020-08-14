## useStyles
This hook allows to access global stylesheets, palette, variables, it also pre-process the inputted stylesheet.
```javascript

const MyComponent = () => {
  const [classes] = useStyles(styles);
  return <View style={classes.root} />
};

const styles = ({palette, shadows, variables}) => ({
  root: {
    ... 
  },
});
```
