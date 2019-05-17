# SVGPathSeg

Este o interfață care este moștenită de toate obiectele returnate prin `getItem()`.

Moștenire: `EventTarget` -> `Node` -> `Element` -> `SVGElement` -> `SVGGraphicsElement` -> `SVGGeometryElement` -> `SVGPathElement`

Tipurile de obiecte pe care le obții prin executarea metodei `getItem()`:

- `SVGPathSegClosePath` (interfață), care corespunde comenzii din date `closepath` (`z`);
- `SVGPathSegMovetoAbs` (interfață), care corespunde comenzii din date `absolute moveto` (`M`), având atributele `x` (float) și `y` (float);
- `SVGPathSegMovetoRel` (interfață), care corespunde comenzii din date `relative moveto` (`m`), având atributele `x` (float) și `y` (float);
- `SVGPathSegLinetoAbs` (interfață), care corespunde comenzii din date `absolute lineto` (`L`), având atributele `x` (float) și `y` (float);
- `SVGPathSegLinetoRel` (interfață), care corespunde comenzii din date `relative lineto` (`l`), având atributele `x` (float) și `y` (float);
- `SVGPathSegCurvetoCubicAbs` (interfață), care corespunde comenzii din date `absolute cubic Bézier curveto` (`C`), având `x, y, x1, y1, x2, y2`;
- `SVGPathSegCurvetoQuadraticAbs` (interfață), care corespunde comenzii din date `absolute quadratic Bézier curveto` (`Q`), având `x, y, x1, y1`;
- `SVGPathSegCurvetoQuadraticRel` (interfață), care corespunde comenzii din date `relative quadratic Bézier curveto` (`q`), având `x, y, x1, y1`;
- `SVGPathSegArcAbs` (interfață), care corespunde comenzii din date `absolute arcto` (`A`), având `x, y, r1, r2, angle, largeArcFlag, sweepFlag`;
- `SVGPathSegArcRel` (interfață), care corespunde comenzii din date `relative arcto` (`a`), având `x, y, r1, r2, angle, largeArcFlag, sweepFlag`;
- `SVGPathSegLinetoHorizontalAbs` (interfață), care corespunde comenzii din date `absolute horizontal lineto` (`H`), având `x` (float);
- `SVGPathSegLinetoHorizontalRel` (interfață), care corespunde comenzii din date `relative horizontal lineto` (`h`), având `x` (float);
- `SVGPathSegLinetoVerticalAbs` (interfață), care corespunde comenzii din date `absolute vertical lineto` (`V`), având `y` (float);
- `SVGPathSegLinetoVerticalRel` (interfață), care corespunde comenzii din date `relative vertical lineto` (`v`), având `y` (float);
- `SVGPathSegCurvetoCubicSmoothAbs` (interfață), care corespunde comenzii din date `absolute smooth cubic curveto` (`S`), având `x, y, x2, y2`;
- `SVGPathSegCurvetoCubicSmoothRel` (interfață), care corespunde comenzii din date `relative smooth cubic curveto` (`s`), având `x, y, x2, y2`;
- `SVGPathSegCurvetoQuadraticSmoothAbs` (interfață), care corespunde comenzii din date `absolute smooth cubic curveto` (`T`), având `x, y`;
- `SVGPathSegCurvetoQuadraticSmoothRel` (interfață), care corespunde comenzii din date `relative smooth cubic curveto` (`t`), având `x, y`;
- `SVGPathSegList`
- `SVGAnimatedPathData`

## Referințe

- [8.5.1 Interface SVGPathSeg, 8 Paths, SVG 1.1](https://www.w3.org/TR/SVG11/paths.html#InterfaceSVGPathSeg)
- [The SVG `path` Syntax: An Illustrated Guide, CSS-TRICKS](https://css-tricks.com/svg-path-syntax-illustrated-guide/)
- [SVGPathSeg polyfill](https://github.com/progers/pathseg)