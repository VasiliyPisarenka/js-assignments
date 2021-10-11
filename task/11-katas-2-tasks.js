'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    const code = [' _ | ||_|', '     |  |', ' _  _||_ ', ' _  _| _|', '   |_|  |', ' _ |_  _|', ' _ |_ |_|', ' _   |  |', ' _ |_||_|', ' _ |_| _|'];
    let result = ''

    const bankAccountArr = bankAccount.split(/\r?\n/);
    bankAccountArr.pop();

    for (let i = 0; i < bankAccountArr[0].length; i += 3) {
        const str = bankAccountArr[0][i] + bankAccountArr[0][i + 1] + bankAccountArr[0][i + 2] 
                  + bankAccountArr[1][i] + bankAccountArr[1][i + 1] + bankAccountArr[1][i + 2] 
                  + bankAccountArr[2][i] + bankAccountArr[2][i + 1] + bankAccountArr[2][i + 2];
   
        result = result + code.indexOf(str);
    }

    return +result;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    throw new Error('Not implemented');
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    const cartNumber = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const onlyNumbers = [];

    let isNotOrder = false;
    let isNotSameSuit = false;
    let fourSameValue = false;
    let threeSameValue = false;
    let firstTwoSameValue = false;
    let secondTwoSameValue = false;

    for (let i = 0; i < hand.length; i ++) {
        const cart = hand[i].slice(0, -1)
        onlyNumbers.push(cartNumber.indexOf(cart));

        if (!isNotSameSuit && hand[0][hand[0].length - 1] != hand[i][hand[i].length - 1]) {
            isNotSameSuit = true;
        }
    }

    onlyNumbers.sort((a, b) => a - b);

    for (let i = 0; i < onlyNumbers.length - 1; i ++) {
        if (onlyNumbers[i + 1] - onlyNumbers[i] != 1) {
            isNotOrder = true;
        }
    }

    if (onlyNumbers.indexOf(0) != -1 && onlyNumbers.indexOf(9) != -1 && onlyNumbers.indexOf(10) != -1 && onlyNumbers.indexOf(11) != -1 && onlyNumbers.indexOf(12) != -1) {
        isNotOrder = false;
    }

    const sameCard = {};
    onlyNumbers.forEach((item) => sameCard[item] = sameCard[item] + 1 || 1);

    Object.values(sameCard).forEach((item) => {
        switch (item) {
            case 4:
                fourSameValue = true;
                break;
            case 3:
                threeSameValue = true;
                break;
            case 2:
                if (firstTwoSameValue) secondTwoSameValue = true;
                else firstTwoSameValue = true;
            break;
        }
    })

    if (!isNotOrder && !isNotSameSuit) return PokerRank.StraightFlush;
    if (fourSameValue) return PokerRank.FourOfKind; 
    if (isNotOrder && !isNotSameSuit) return PokerRank.Flush; 
    if (!isNotOrder && isNotSameSuit) return PokerRank.Straight;
    if (threeSameValue && firstTwoSameValue) return PokerRank.FullHouse; 
    if (threeSameValue && !firstTwoSameValue) return PokerRank.ThreeOfKind; 
    if (firstTwoSameValue && secondTwoSameValue) return PokerRank.TwoPairs; 
    if (firstTwoSameValue && !secondTwoSameValue) return PokerRank.OnePair; 

    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
   throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
