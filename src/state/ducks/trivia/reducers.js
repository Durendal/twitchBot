import * as types from './types';

const initialTriviaState = {
  durendalz: {
    question_length: 2,
    question_interval: 1,
    active: false,
    winners: {}
  },
};

const triviaReducer = (state = initialTriviaState, action) => {

  const { type, payload } = action;

  switch(type) {

  };
};

export default triviaReducer;
