const eq1 = document.getElementById('eq1');
const eq2 = document.getElementById('eq2');
const eq3 = document.getElementById('eq3');
const eq4 = document.getElementById('eq4');
const eq5 = document.getElementById('eq5');
const eq6 = document.getElementById('eq6');
const eq7 = document.getElementById('eq7');
const eq8 = document.getElementById('eq8');


const eq10 = document.getElementById('eq10');
const eq11 = document.getElementById('eq11');
const eq12 = document.getElementById('eq12');
const eq13 = document.getElementById('eq13');

katex.render("\\Delta_t \\rho_n = \\frac{1}{2} \\rho_{n+1}\n    - 2 \\cdot \\frac{1}{2} \\rho_{n}\n    + \\frac{1}{2} \\rho_{n-1}", eq1, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})
katex.render("\\Delta_t \\rho_n = \\frac{1}{2} [ (\\rho_{n+1} - \\rho_{n})-(\\rho_{n}-\\rho_{n-1})]", eq2, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})
katex.render("\\Delta_t \\rho_n = \\frac{1}{2} \\Delta_x (\\Delta_x \\rho_n)", eq3, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})

katex.render("\\frac{\\Delta_t \\rho_n}{\\Delta t} = \\frac{1}{2} \\frac{\\Delta_x \\rho_n (\\Delta_x \\rho_n)}{(\\Delta x)^2} \\cdot \\frac{(\\Delta x)^2}{\\Delta t}", eq6, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})
katex.render("\\frac{\\Delta_t \\rho_n}{\\Delta t} = D \\cdot \\frac{\\Delta_x \\rho_n (\\Delta_x \\rho_n)}{(\\Delta x)^2} ", eq7, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})


katex.render("\t\\Delta x \\rightarrow 0", eq4, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})
katex.render("\t\\Delta t \\rightarrow 0", eq5, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})


katex.render("\\frac{\\partial \\rho_n}{\\partial t} = D \\cdot \\frac{\\partial^2 \\rho_n}{\\partial x^2} ", eq8, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})



// heat equation
katex.render("q = -k \\nabla T \\;\\;[\\tfrac{Energy}{m^2 s} \\; \\; or \\; \\; \\tfrac{J}{m^2 s}] \n", eq10, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})
katex.render("\\tau = \\mu \\nabla u \\;\\;[\\tfrac{Momentum}{m^2 s} \\; \\; or \\; \\;  \\tfrac{kg \\cdot \\frac{m}{s}}{m^2 s}] \n", eq11, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})
katex.render("j = -D \\nabla c \\;\\;[\\tfrac{Amount \\; of \\; substance}{m^2 s} \\; \\; or \\; \\; \\tfrac{mol}{m^2 s}] \n", eq12, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})

katex.render("\\nabla f(\\left.x_{1}, x_{2}, \\ldots, x_{n}\\right)=\\left[\\begin{array}{c}\n\\dfrac{\\partial f}{\\partial x_1}(\\left.x_{1}, x_{2}, \\ldots, x_{n}\\right)\\\\\n\\dfrac{\\partial f}{\\partial x_2}(\\left.x_{1}, x_{2}, \\ldots, x_{n}\\right) \\\\\n\\vdots \\\\\n\\dfrac{\\partial f}{\\partial x_n}(\\left.x_{1}, x_{2}, \\ldots, x_{n}\\right) \n\\end{array}\\right]\n", eq13, {"displayMode":true,"leqno":false,"fleqn":false,"throwOnError":true,"errorColor":"#cc0000","strict":"warn","output":"htmlAndMathml","trust":false,"macros":{"\\f":"#1f(#2)"}})