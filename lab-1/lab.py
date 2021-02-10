from prettytable import PrettyTable
import matplotlib.pyplot as mpl
import math

def lagrange(xn, fn, x):
    results = []

    table = PrettyTable()
    table.field_names = ["n", "Xn", "Fn", "X", "Pn"]

    for n in range(len(xn)):
        result = 0

        for j in range(len(xn)):
            numerator = 1
            denominator = 1

            for i in range(len(xn)):
                if j != i:
                    numerator *= x[n] - xn[i]
                    denominator *= xn[j] - xn[i]

            fraction = numerator / denominator
            result += fn[n] * fraction

        results.append(result)
        table.add_row([n, xn[n], fn[n], x[n], result])

    print(table)

    mpl.plot(x, results)
    # mpl.plot(x, fn);
    mpl.show()

    return results

def lagrange_gen(x0, h, N, fx, x):
    xn = []
    fn = []

    for i in range(N):
        xn.append(x0)
        fn.append(eval("math." + fx)(xn[i]))

        x0 += h

    lagrange(xn, fn, x)


# task 1
xn = [0.02, 0.08, 0.12, 0.17, 0.23, 0.30]
fn = [1.02316, 1.09590, 1.14725, 1.21483, 1.21483, 1.40976]
x = [0.103, 0.126, 0.155, 0.115, 0.204, 0.301]

lagrange(xn, fn, x)

# task 2
x0 = 1.0
h = 0.1
N = 10
fx = "sin"
x_gen = [x0, 1.051, 1.178, 1.234, 1.390, 1.480, 1.539, 1.674, 1.773, 1.899]

lagrange_gen(x0, h, N, fx, x_gen)
