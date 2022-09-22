import axios from 'axios';
import { config } from '../config';
import { boardEmptyWord } from '../assets/board-empty-word';
import { randomWords } from '../assets/random-words';

export function getLetterRevealedColor(winningWord, letter, letterIndex) {
    if (winningWord[letterIndex] === letter) {
        return 'green';
    }
    if (winningWord.includes(letter)) {
        return 'yellow';
    }
    return 'grey';
}

export const getClass = (defaultClass, color) => {
    const classes = [defaultClass];
    // switch (color) {
    //     case 'green': classes.push('green-bg');
    //     case 'yellow': classes.push('yellow-bg');
    //     case 'grey': classes.push('grey-bg');
    //     default: const a = 4;
    // }
    if (color === 'green') {
        classes.push('green-bg')
    } else if (color === 'yellow') {
        classes.push('yellow-bg')
    } else if (color === 'grey') {
        classes.push('grey-bg')
    }
    return classes.join(' ');
}

export const getEmptyBoard = () => {
    const emptyBoard = [];
    for (let i = 0; i < config.NUM_OF_TRIES; i++) {
        emptyBoard.push(boardEmptyWord);
    }
    return emptyBoard;
}

export const getRandomWord = () => {
    const totalWords = randomWords.length;
    const randomIndex = Math.floor(Math.random() * totalWords)
    return randomWords[randomIndex];
}

export const isWordWinner = (word) => {
    let isWinner = true;
    word.forEach(letter => {
        if (letter.color !== 'green') {
            isWinner = false;
        }
    });
    return isWinner;
}

export const isWordValid = async (word) => {
    try {
        const wordAsString = word.map(letter => letter.value).join('').toLowerCase();
        const url = `https://api.wordnik.com/v4/word.json/${wordAsString}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
        const response = await axios.get(url);
        return response.status === 200;
    } catch (err) {
        return false;
    }
}

export const getColoredKeyboard = (clonedKeyboard, currentWord) => {

    currentWord.forEach(letter => {
        // for each letter, find it in clonedKeyboard and update the color in it to be the color in letter
        for (let i = 0; i < clonedKeyboard.length; i++) {
            const currentKeyboardLine = clonedKeyboard[i];
            for (let j = 0; j < currentKeyboardLine.length; j++) {
                if (letter.value === clonedKeyboard[i][j].value) {
                    clonedKeyboard[i][j].color = letter.color;
                }
            }
            
        }
    });
    return clonedKeyboard;
}
