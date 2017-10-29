/*
 * Question Object is used to store survey questions
 */
class Question {
    constructor(text, type, choices) {
    // Instance Fields for Question Object
        this.type = type;
        this.text = text;
        this.choices = choices || null;
        this.answer = null;
    }

}

module.exports = Question;