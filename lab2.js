const fs = require('fs')

class FunctionNull {
    static _e = 0.0001
    _log = []

    constructor(a, b) {
        this.a = a
        this.b = b
        this.func = x => x ** 2 - 4 * Math.sin(x)
        this.dif1 = x => 2 * x - 4 * Math.cos(x)
        this.dif2 = x => 2 + 4 * Math.sin(x)
    }

    get divison() {
        let a = this.a, b = this.b, x, y, iter = 0

        if ((this.func(a) > 0 && this.func(b) > 0) ||
            (this.func(a) < 0 && this.func(b) < 0)) {
            return null
        }

        y = this.func(a)

        if (y === 0) {
            return { a, y, iter }
        }

        y = this.func(b)

        if (y === 0) {
            return { b, y, iter }
        }

        let log = `Division:\n`

        while (Math.abs(b - a) > FunctionNull._e) {
            x = (a + b) / 2
            y = this.func(x)

            log += `iter: ${iter}, x: ${x}, y: ${y}\n`

            if (y === 0) {
                break;
            }

            let cx = x, cy = y

            y = this.func(a)

            if ((y < 0 && cy > 0) ||
                (y > 0 && cy < 0)) {
                b = cx
            } else {
                a = cx
            }

            iter++;
        }

        this.log = log

        return { x, y, iter }
    }

    get chord() {
        let a = this.a, b = this.b, x, xn, y, iter = 0

        if ((this.func(a) > 0 && this.func(b) > 0) ||
            (this.func(a) < 0 && this.func(b) < 0)) {
            return null
        }

        y = this.func(a)

        if (y === 0) {
            return { a, y, iter }
        }

        y = this.func(b)

        if (y === 0) {
            return { b, y, iter }
        }

        if ((this.func(a) > 0 && this.dif2(a) > 0) ||
            (this.func(a) < 0 && this.dif2(a) < 0)) {
            x = a
        } else {
            x = b
        }

        xn = x

        let log = `\nChord:\n`

        do {
            x = xn
            y = this.func(x)

            log += `iter: ${iter}, x: ${x}, y: ${y}\n`

            if (y === 0) {
                break;
            }

            if (this.dif1(x) * this.dif2(x) > 0 && b != x) {
                xn = x - (this.func(x) * (b - x)) / (this.func(b) - this.func(x))
            } else {
                xn = x - (this.func(x) * (x - a)) / (this.func(x) - this.func(a))
            }

            iter++;
        } while (Math.abs(xn - x) > FunctionNull._e)

        x = xn
        y = this.func(x)
        iter++

        log += `iter: ${iter}, x: ${x}, y: ${y}\n`

        this.log = log

        return { x, y, iter }
    }

    get newton() {
        let a = this.a, b = this.b, x, xn, y, iter = 0

        if ((this.func(a) > 0 && this.func(b) > 0) ||
            (this.func(a) < 0 && this.func(b) < 0)) {
            return null
        }

        y = this.func(a)

        if (y === 0) {
            return { a, y, iter }
        }

        y = this.func(b)

        if (y === 0) {
            return { b, y, iter }
        }

        if ((this.func(a) > 0 && this.dif2(a) > 0) ||
            (this.func(a) < 0 && this.dif2(a) < 0)) {
            x = a
        } else {
            x = b
        }

        xn = x

        let log = `\nNewton:\n`

        do {
            x = xn
            y = this.func(x)

            log += `iter: ${iter}, x: ${x}, y: ${y}\n`

            if (y === 0) {
                break;
            }

            xn = x - this.func(x) / this.dif1(x)
            iter++;
        } while (Math.abs(xn - x) > FunctionNull._e)

        x = xn
        y = this.func(x)
        iter++

        log += `iter: ${iter}, x: ${x}, y: ${y}\n`

        this.log = log

        return { x, y, iter }
    }

    get combo() {
        let a = this.a, b = this.b, x, xn, y, iter = 0

        if ((this.func(a) > 0 && this.func(b) > 0) ||
            (this.func(a) < 0 && this.func(b) < 0)) {
            return null
        }

        y = this.func(a)

        if (y === 0) {
            return { a, y, iter }
        }

        y = this.func(b)

        if (y === 0) {
            return { b, y, iter }
        }

        let log = `\nCombination:\n`

        while (Math.abs(b - a) > FunctionNull._e) {
            x = (b + a) / 2
            y = this.func(x)

            log += `iter: ${iter}, x: ${x}, y: ${y}\n`

            if (y === 0) {
                break;
            }

            if (this.dif1(x) * this.dif2(x) > 0) {
                a -= ((b - a) * this.func(a)) / Math.abs(this.func(b) - this.func(a))
                b -= this.func(b) / this.dif1(b)
            } else {
                b -= ((b - a) * this.func(b)) / Math.abs(this.func(b) - this.func(a))
                a -= this.func(a) / this.dif1(a)
            }

            iter++;
        }

        this.log = log

        return { x, y, iter }
    }

    wirteLog() {
        let logs = ''

        this._log.forEach(log => logs += log)

        fs.writeFile('results.log', logs, err => err ? true : false);
    }

    set log(value) {
        this._log.push(value)
    }

    get all() {
        this._log.length = 0

        return {
            Division: this.divison,
            Hord: this.chord,
            Newton: this.newton,
            Combination: this.combo
        }
    }
}

const functionNullFinding = new FunctionNull(1.57, 3.14)

console.table(functionNullFinding.all)
functionNullFinding.wirteLog()
