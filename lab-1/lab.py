from prettytable import PrettyTable
import plotly.graph_objects as go
import math

def lagrange(xn, func, x):
    result = 0

    for j in range(len(xn)):
        numerator = 1
        denominator = 1

        for i in range(len(xn)):
            if j != i:
                numerator *= x - xn[i]
                denominator *= xn[j] - xn[i]

        fraction = numerator / denominator
        result += func * fraction

    return result

def lagrange_gen(x0, h, N, fx, x):
    xn = []
    fn = []

    for i in range(N):
        xn.append(x0)
        fn.append(fx(xn[i]))

        x0 += h

    lagrange_array(xn, fn, x)

def lagrange_array(xn, fn, x):
    results = []

    table = PrettyTable()
    table.field_names = ["n", "Fn", "X", "Pn"]

    table_xn = PrettyTable()
    table_xn.field_names = ["Xn"]

    for n in range(len(xn)):
        result = lagrange(xn, fn[n], x[n])

        results.append(result)
        table.add_row([n, fn[n], x[n], result])

    xn = [round(num, 5) for num in xn]
    table_xn.add_row([xn])

    print(table)
    print(table_xn)

    fig = go.Figure()
    fig.add_trace(go.Scatter(x=x, y=fn, name="Function", mode='lines+markers', marker=dict(size=15), line_shape='spline'))
    fig.add_trace(go.Scatter(x=x, y=results, name="Lagrange", line_shape='spline', marker=dict(size=10), line=dict(color='red', width=3, dash='dash')))
    fig.show()
    fig.write_image("lagrange.png")

# task 1
xn = [0.02, 0.08, 0.12, 0.17, 0.23, 0.30]
fn = [1.02316, 1.09590, 1.14725, 1.21483, 1.21483, 1.40976]
x = [0.103, 0.126, 0.155, 0.115, 0.204, 0.301]

lagrange_array(xn, fn, x)

# task 2
x0 = 1.0
h = 0.1
N = 10
fx = math.sin
x_gen = [x0, 1.051, 1.178, 1.234, 1.390, 1.480, 1.539, 1.674, 1.773, 1.899]

lagrange_gen(x0, h, N, fx, x_gen)
