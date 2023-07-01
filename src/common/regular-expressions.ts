export class RegEx {

    static password(): RegExp {
        return /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-zA-Z]).{6,}$/;
    }
}