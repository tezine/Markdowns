# REDUX
* Redux is a pattern for managing application state. 
* It's not designed to be the shortest or fastest way to write code.
* If you do not have problems with state management, you might find the benefits of Redux harder to understand
* Reducers are called via the Actions which mutate the state of the View Component and calls the render (React) function.

## EXEMPLO DE ACTION
```javascript 
// src/LikeAction.js
updateCounterValueWithServerValue(count) {
  return {
    type: UPDATE_COUNTER,
    count
  }
}
```

## EXEMPLO DE REDUCER
```javascript 
const initialState = Map({
  counter: 0,
  liked: false
});
const actionsMap = {
  [UPDATE_COUNTER]: (state) => {
    const counter = state.get('count');
    return state.merge(Map({
      counter
    }));
  }
};
```