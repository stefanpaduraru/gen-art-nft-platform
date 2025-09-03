class Random {
  constructor(e) {
    this.seed = e;
  }
  dec() {
    return (
      (this.seed ^= this.seed << 13),
      (this.seed ^= this.seed >> 17),
      (this.seed ^= this.seed << 5),
      ((this.seed < 0 ? 1 + ~this.seed : this.seed) % 1e3) / 1e3
    );
  }
  num(e, a) {
    return e + (a - e) * this.dec();
  }
  int(e, a) {
    return Math.floor(this.num(e, a + 1));
  }
}
class Debug {
  node;
  constructor() {
    this.node = document.getElementById('debug');
  }
  hash(e) {
    this.node.innerHTML =
      this.node.innerHTML +
      '<textarea id="hash">' +
      e +
      '</textarea>';
  }
  imperfection(e) {
    this.node.innerHTML =
      this.node.innerHTML +
      '<div id="imperfection">Imperfection: ' +
      e +
      '</div>';
  }
  params(e) {
    this.node.innerHTML =
      this.node.innerHTML +
      '<div id="params">Params: ' +
      e +
      '</div>';
  }
  zoom(e) {
    this.node.innerHTML =
      this.node.innerHTML + '<div id="zoom">Zoom: ' + e + '</div>';
  }
  stroke(e) {
    this.node.innerHTML =
      this.node.innerHTML +
      '<div id="stroke">Stroke: ' +
      e +
      '</div>';
  }
  colors(e) {
    this.node.innerHTML =
      this.node.innerHTML +
      '<div id="colors">Colors: ' +
      e +
      '</div>';
  }
  param(e, a) {
    this.node.innerHTML =
      this.node.innerHTML + `<div class="param">${e}: ${a}</div>`;
  }
  background(e) {
    this.node.innerHTML =
      this.node.innerHTML +
      `<div id="background" style="background-color: ${e};">${e}</div>`;
  }
  colorList(e = []) {
    const a = e.reduce(
      (e, a) =>
        (e += `<div class="color" style='background-color: ${a}; border: ${
          a.length < 7 ? 1 : 0
        }px solid red;'>${a}</div>`),
      '',
    );
    this.node.innerHTML =
      this.node.innerHTML +
      `<div class="param"><div id="colorList">${a}</div></div>`;
  }
}
const palettesFramentti = [
    [
      '#eef2f6',
      '#d40000',
      '#b68762',
      '#e6e0da',
      '#e0b299',
      '#eda67d',
      '#e2725b',
    ],
    [
      '#1d3461',
      '#050504',
      '#1f487d',
      '#237ba1',
      '#33b2cc',
      '#e6e6e6',
      '#fdd692',
      '#fb3640',
    ],
    [
      '#f7e3d5',
      '#ff514e',
      '#ff7700',
      '#1e90ff',
      '#69b668',
      '#2b9091',
      '#486abd',
      '#282e39',
    ],
    [
      '#1d2f53',
      '#ec5c23',
      '#fdc449',
      '#f5f1eb',
      '#f8b8a0',
      '#3cb8a4',
      '#72c1c6',
      '#5898c1',
    ],
    [
      '#f1faee',
      '#ffbb33',
      '#a8dadc',
      '#457b9d',
      '#1d3557',
      '#031927',
      '#424b54',
      '#042a2b',
    ],
    [
      '#ffcc00',
      '#26437f',
      '#d2292e',
      '#ffffff',
      '#000000',
      '#1884bf',
      '#fefddf',
      '#d9381e',
    ],
  ],
  PALETTE_NAMES = ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
  palettes = [
    [
      '#2C3E50',
      '#FC4349',
      '#D7DADB',
      '#6DBCDB',
      '#FFFFFF',
      '#ABC8E2',
      '#E1E6FA',
    ],
    [
      '#52656B',
      '#FF3B77',
      '#CDFF00',
      '#FFFFFF',
      '#B8B89F',
      '#DAEAEF',
      '#272F32',
    ],
    [
      '#FF0005',
      '#FFF28C',
      '#959595',
      '#3D3D3D',
      '#121212',
      '#FFEB4D',
      '#BEC7C7',
    ],
    [
      '#D5FBFF',
      '#9FBCBF',
      '#647678',
      '#2F3738',
      '#59D8E6',
      '#1B1D26',
      '#E8F8FF',
    ],
    [
      '#0C273D',
      '#54D0ED',
      '#FFFEF1',
      '#70B85D',
      '#2C5E2E',
      '#FFF8D3',
      '#0E3D59',
    ],
    [
      '#FFE2C5',
      '#FFEEDD',
      '#FFDDAA',
      '#FFC484',
      '#FFDD99',
      '#D94436',
      '#ED9355',
    ],
    [
      '#003840',
      '#007369',
      '#02A676',
      '#FFFFE4',
      '#B9BF8E',
      '#A69F7C',
      '#8C6865',
    ],
    [
      '#D93280',
      '#304018',
      '#BCBF56',
      '#F2C53D',
      '#F24130',
      '#85B5D9',
      '#EDEFE4',
    ],
    [
      '#fe745f',
      '#ff924e',
      '#ffb752',
      '#7fac46',
      '#457928',
      '#4ec9ff',
      '#B5F9FF',
    ],
  ];
class withPaletteColors {
  colors;
  pid;
  bgParams;
  bgColor;
  contrastColor;
  constructor(e) {
    (this.pid = e),
      (this.colors = []),
      (this.bgParams = []),
      debug.colorList(palettes[this.pid]);
  }
  getRandomColor(e) {
    const a = Rand.int(0, palettes[this.pid].length - 1);
    return (
      palettes[this.pid][a] +
      (e
        ? parseInt(2.55 * e, 10)
            .toString(16)
            .padStart(2, 0)
        : '')
    );
  }
  getBackgroundColor(e, a, d) {
    return (
      this.bgColor || (this.bgColor = this.getRandomColor(100)),
      this.bgParams.push(e, a, d),
      debug.background(`hsl(${e}, ${a}%, ${d}%)`),
      this.bgColor
    );
  }
  getContrastColor(e) {
    this.contrastColor ||
      ((this.contrastColor = this.getRandomColor(e)),
      this.contrastColor.substr(0, 7) == this.bgColor.substr(0, 7) &&
        ((this.contrastColor = ''), this.getContrastColor(e)));
    this.contrastColor,
      e &&
        parseInt(2.55 * e, 10)
          .toString(16)
          .padStart(2, 0);
    return this.contrastColor;
  }
}
class withRandomColors {
  colors;
  colorCount;
  bgParams;
  constructor(e) {
    (this.colorCount = e),
      (this.colors = []),
      (this.bgParams = []),
      [...Array(e).keys()].map((e) => {
        this.colors.push(this.getRandomHexColor());
      }),
      debug.colorList(this.colors);
  }
  getRandomHexColor() {
    (seed ^= seed << 13), (seed ^= seed >> 17), (seed ^= seed << 5);
    const e =
      (((seed < 0 ? 1 + ~seed : seed) % 1e3) / 1e3) * 16777215;
    return `#${Math.floor(e).toString(16).padEnd(6, '11')}`;
  }
  getRandomColor() {
    const e = Rand.int(0, this.colors.length - 1);
    return (
      this.colors[e] +
      (alpha
        ? parseInt(2.55 * alpha, 10)
            .toString(16)
            .padStart(2, 0)
        : '')
    );
  }
  getBackgroundColor(e, a, d) {
    return (
      this.bgParams.push(e, a, d),
      debug.background(`hsl(${e}, ${a}%, ${d}%)`),
      `hsl(${e}, ${a}%, ${d}%)`
    );
  }
  getContrastColor(e) {
    let a = 360 - this.bgParams[0],
      d = 100 - this.bgParams[1];
    const [c, b, f] = hslToRgb(a, d / 100, 0.6);
    return `rgba(${c}, ${b}, ${f}, ${e / 100})`;
  }
}
let hash = [];
const FEATURE_DEFORM_1 = 'deform_1',
  FEATURE_DEFORM_2 = 'deform_2',
  FEATURE_DEFORM_3 = 'deform_3',
  FEATURE_DEFORM_4 = 'deform_4',
  FEATURE_DEFORM_5 = 'deform_5',
  FEATURE_DEFORM_6 = 'deform_6',
  FEATURE_DETAIL_LEVEL = 'detail_level',
  FEATURE_COLOR_SCHEME = 'color_scheme',
  FEATURE_PALETTE = 'palette',
  FEATURE_STROKE = 'stroke',
  FEATURE_MONO_COLOR = 'mono_color',
  FEATURE_IMPERFECTION = 'imperfection',
  FEATURES_COLOR_COUNT = 'color_count',
  COLOR_SCHEMES = ['palette', 'random'];
for (let e = 0; e < (tokenData.hash.length - 2) / 2; e++)
  hash.push(parseInt(tokenData.hash.slice(2 + 2 * e, 4 + 2 * e), 16));
function getVariableFromHash(e, a) {
  a -= 0.001;
  let d = Math.floor((hash[0] * (a - e)) / 255 + e);
  return hash.shift(), d;
}
const id = (e) => 1e3 * e.re + e.im;
function WithColors(e, a, d) {
  return e ? new withRandomColors(a) : new withPaletteColors(d);
}
function random_num(e, a) {
  return e + (a - e) * this.random_dec();
}
function hexToRGB(e) {
  let a = 0,
    d = 0,
    c = 0;
  return (
    4 == e.length
      ? ((a = parseInt('0x' + e[1] + e[1], 16)),
        (d = parseInt('0x' + e[2] + e[2], 16)),
        (c = parseInt('0x' + e[3] + e[3], 16)))
      : 7 == e.length &&
        ((a = parseInt('0x' + e[1] + e[2], 16)),
        (d = parseInt('0x' + e[3] + e[4], 16)),
        (c = parseInt('0x' + e[5] + e[6], 16))),
    [a, d, c]
  );
}
function RGBToHex(e, a, d) {
  return (
    (e = e.toString(16)),
    (a = a.toString(16)),
    (d = d.toString(16)),
    1 == e.length && (e = '0' + e),
    1 == a.length && (a = '0' + a),
    1 == d.length && (d = '0' + d),
    '#' + e + a + d
  );
}
function hslToRgb(e, a, d) {
  hprime = e / 60;
  const c = d * a,
    b = c * (1 - Math.abs((hprime % 2) - 1)),
    f = d - c;
  let t, s, o;
  return (
    hprime || ((t = 0), (s = 0), (o = 0)),
    hprime >= 0 && hprime < 1 && ((t = c), (s = b), (o = 0)),
    hprime >= 1 && hprime < 2 && ((t = b), (s = c), (o = 0)),
    hprime >= 2 && hprime < 3 && ((t = 0), (s = c), (o = b)),
    hprime >= 3 && hprime < 4 && ((t = 0), (s = b), (o = c)),
    hprime >= 4 && hprime < 5 && ((t = b), (s = 0), (o = c)),
    hprime >= 5 && hprime < 6 && ((t = c), (s = 0), (o = b)),
    (t = Math.round(255 * (t + f))),
    (s = Math.round(255 * (s + f))),
    (o = Math.round(255 * (o + f))),
    [t, s, o]
  );
}
class Element {
  root;
  type;
  twist;
  targets = new Map();
  oddShapes = new Set();
  evenShapes = new Set();
  withColors;
  constructor(e, a, d) {
    (this.root = e), this.targets.set(d, a);
  }
}
class Patterns {
  canvasSize;
  shapes = [];
  elements = new Map();
  short = 0;
  long = 0;
  alpha = ALPHA;
  shouldStroke;
  subdivControl;
  drawLines;
  recalcButton;
  phi1slider;
  phi2slider;
  phi3slider;
  phi4slider;
  phi5slider;
  phi6slider;
  p1;
  p2;
  p3;
  p4;
  p5;
  p6;
  constructor(e, a, d, c, b, f, t, s, o, i, r, h) {
    (this.withColors = e),
      (this.canvasSize = Math.min(
        window.innerWidth,
        window.innerHeight,
      )),
      (this.imperfection = a),
      (this.backgroundColor = d),
      (this.zoomLevel = c),
      (this.shouldStroke = b),
      (this.p1Val = f),
      (this.p2Val = t),
      (this.p3Val = s),
      (this.p4Val = o),
      (this.p5Val = i),
      (this.p6Val = r),
      (this.colorCount = h);
  }
  id = (e) => 1e3 * e.re + e.im;
  createElements(e, a) {
    a.map((a) => {
      const d = this.elements.get(this.id(e));
      d
        ? d.targets.set(this.id(a), a)
        : this.elements.set(
            this.id(e),
            new Element(e, a, this.id(a)),
          );
    });
  }
  addShapes(e = []) {
    e.forEach((e) => {
      let [a, d] = e,
        c = this.elements.get(this.id(a));
      d.type ? c.evenShapes.add(d) : c.oddShapes.add(d);
    });
  }
  createShapeElements(e) {
    this.createElements(e.seg1, [e.seg2, e.seg3]),
      this.createElements(e.seg2, [e.seg1, e.seg3]),
      this.createElements(e.seg3, [e.seg1, e.seg2]),
      this.addShapes([
        [e.seg1, e],
        [e.seg2, e],
        [e.seg3, e],
      ]);
  }
  approx(e, a = 5) {
    const d = Math.pow(10, a);
    return 'number' == typeof e
      ? Math.round(e * d) / d
      : ((e.re = Math.round(e.re * d) / d),
        (e.im = Math.round(e.im * d) / d),
        e);
  }
  zoom(e) {
    let a = [];
    for (let d of e)
      if (0 == d.type) {
        let e = this.approx(
            math.add(
              d.seg1,
              math.divide(
                math.subtract(d.seg2, d.seg1),
                this.imperfection,
              ),
            ),
          ),
          c = {
            color: '',
            type: 0,
            seg1: d.seg3,
            seg2: e,
            seg3: d.seg2,
          },
          b = {
            color: '',
            type: 1,
            seg1: e,
            seg2: d.seg3,
            seg3: d.seg1,
          };
        a.push(c, b);
      } else {
        let e = this.approx(
            math.add(
              d.seg2,
              math.divide(
                math.subtract(d.seg1, d.seg2),
                this.imperfection,
              ),
            ),
          ),
          c = this.approx(
            math.add(
              d.seg2,
              math.divide(
                math.subtract(d.seg3, d.seg2),
                this.imperfection,
              ),
            ),
          ),
          b = {
            color: '',
            type: 1,
            seg1: c,
            seg2: d.seg3,
            seg3: d.seg1,
          },
          f = { color: '', type: 1, seg1: e, seg2: c, seg3: d.seg2 },
          t = { color: '', type: 0, seg1: c, seg2: e, seg3: d.seg1 };
        a.push(b, f, t);
      }
    return a;
  }
  checkMaches(e, a) {
    const { seg1: d, seg2: c, seg3: b } = a;
    return (
      this.segmentMatches(e, d) |
      this.segmentMatches(e, c) |
      this.segmentMatches(e, b)
    );
  }
  commonElements(e, a) {
    let d = [];
    return (
      this.checkMaches(e.seg1, a) && d.push(e.seg1),
      this.checkMaches(e.seg2, a) && d.push(e.seg2),
      this.checkMaches(e.seg3, a) && d.push(e.seg3),
      d
    );
  }
  segmentMatches(e, a) {
    return e.re == a.re && e.im == a.im;
  }
  arraysEqual(e, a) {
    if (e === a) return !0;
    if (null == e || null == a) return !1;
    if (e.length != a.length) return !1;
    for (var d = 0; d < e.length; ++d) if (e[d] !== a[d]) return !1;
    return !0;
  }
  init(e) {
    (this.shapes = []),
      (this.elements = new Map()),
      (this.short = 0),
      (this.long = 0),
      [...Array(10).keys()].map((e) => {
        const a = this.approx(
            math.Complex.fromPolar(1, ((2 * e - 1) * Math.PI) / 10),
          ),
          d = this.approx(
            math.Complex.fromPolar(1, ((2 * e + 1) * Math.PI) / 10),
          );
        let c = {
          type: 0,
          seg1: math.complex(0, 0),
          seg2: e % 2 ? a : d,
          seg3: e % 2 ? d : a,
          color: '',
        };
        this.shapes.push(c);
      }),
      [...Array(e)].map(() => {
        this.shapes = this.zoom(this.shapes);
      }),
      this.shapes.map((e) => {
        this.createShapeElements(e),
          (e.original = {
            seg1: e.seg1.clone(),
            seg2: e.seg2.clone(),
            seg3: e.seg3.clone(),
          });
      }),
      this.elements.forEach((e) => {
        let a, d, c, b, f, t;
        const s = [...e.oddShapes],
          o = [...e.evenShapes];
        (e.odd = s.length), (e.even = o.length);
        switch (
          ([
            [4, 2],
            [2, 6],
            [0, 10],
            [2, 2],
            [2, 4],
            [4, 6],
            [2, 8],
          ].map((a, d) => {
            this.arraysEqual(a, [e.odd, e.even]) && (e.type = d + 1);
          }),
          e.type)
        ) {
          case 1:
            (a = this.commonElements(o[0], o[1]).filter(
              (a) => !(a.re == e.root.re && a.im == e.root.im),
            )[0]),
              a ? (e.twist = a.sub(e.root).arg()) : (e.type = 0);
            break;
          case 2:
          case 4:
          case 7:
            (a = this.commonElements(s[0], s[1]).filter(
              (a) => !(a.re == e.root.re && a.im == e.root.im),
            )[0]),
              a
                ? (e.twist = a.sub(e.root).arg() + Math.PI)
                : (e.type = 0);
            break;
          case 5:
            (d = [...e.targets.values()].sort((a, d) =>
              a.sub(e.root).arg() > d.sub(e.root).arg() ? 1 : -1,
            )),
              (c = !1),
              (b = d[5].sub(e.root).arg() - 2 * Math.PI);
            for (let a of d) {
              let d = a.sub(e.root).arg(),
                f = d - b;
              if (c && f > 1) {
                e.twist = d;
                break;
              }
              '0.63' == f.toFixed(2) && (c = !0), (b = d);
            }
            void 0 === e.twist && (e.twist = d[0].sub(e.root).arg());
            break;
          case 6:
            for (
              d = [...e.targets.values()].sort((a, d) =>
                a.sub(e.root).arg() > d.sub(e.root).arg() ? 1 : -1,
              ),
                f = [],
                t = 0;
              void 0 === e.twist;

            ) {
              let a = d[t++],
                c = this.approx(a.sub(e.root).abs(), 3);
              if (
                (f.push(c),
                c > this.long && (this.long = c),
                c > this.short && c < this.long && (this.short = c),
                f.length < 8)
              )
                continue;
              let b = f.slice(Math.max(f.length - 8, 1));
              if (
                this.arraysEqual(b, [
                  this.short,
                  this.short,
                  this.long,
                  this.short,
                  this.short,
                  this.short,
                  this.long,
                  this.short,
                ])
              ) {
                e.twist = a.sub(e.root).arg();
                break;
              }
              if (16 == f.length) {
                e.twist = 0;
                break;
              }
              t == e.targets.size && (t = 0);
            }
            void 0 === e.twist && (e.twist = d[0].sub(e.root).arg());
        }
      });
  }
  deformElement(element, phi) {
    if (((element.phi = phi), phi && element.twist)) {
      let elementshapes = [
        ...element.oddShapes,
        ...element.evenShapes,
      ];
      const newPoint = math.Complex.fromPolar(phi, element.twist);
      elementshapes.forEach((shape) => {
        const { seg1: seg1, seg2: seg2, seg3: seg3 } = shape.original;
        [...Array(3).keys()].map((i) => {
          const currSegment = eval(`seg${i + 1}`);
          this.segmentMatches(currSegment, element.root) &&
            (shape[`seg${i + 1}`] = currSegment.add(newPoint));
        });
      });
    }
  }
  deformByParameters(e, a, d, c, b, f) {
    let t = 0;
    this.elements.forEach((s) => {
      let o = 0;
      1 == s.type
        ? (o = e)
        : 2 == s.type
        ? (o = a)
        : 4 == s.type
        ? (o = d)
        : 5 == s.type
        ? (o = c)
        : 6 == s.type
        ? (o = b)
        : 7 == s.type && (o = f),
        (t += 1),
        this.deformElement(s, o);
    });
  }
  drawIfFast() {
    draw();
  }
  recalc() {
    (this.zoomLevel = this.subdivControl.value()),
      this.init(this.zoomLevel),
      this.draw();
  }
  setup = function () {
    canvas = createCanvas(this.canvasSize, this.canvasSize);
    let e = 10,
      a = this.canvasSize + 20;
    const d = 20;
    (this.phi1slider = createSlider(0, SLIDER_RESOLUTION, p1Val, 1)),
      (this.phi2slider = createSlider(
        0,
        SLIDER_RESOLUTION,
        p2Val,
        1,
      )),
      (this.phi3slider = createSlider(
        0,
        SLIDER_RESOLUTION,
        p3Val,
        1,
      )),
      (this.phi4slider = createSlider(
        0,
        SLIDER_RESOLUTION,
        p4Val,
        1,
      )),
      (this.phi5slider = createSlider(
        0,
        SLIDER_RESOLUTION,
        p5Val,
        1,
      )),
      (this.phi6slider = createSlider(
        0,
        SLIDER_RESOLUTION,
        p6Val,
        1,
      )),
      this.phi1slider.position(a, (e += d)),
      this.phi2slider.position(a, (e += d)),
      this.phi3slider.position(a, (e += d)),
      this.phi4slider.position(a, (e += d)),
      this.phi5slider.position(a, (e += d)),
      this.phi6slider.position(a, (e += d)),
      this.phi1slider.changed(this.drawIfFast),
      this.phi2slider.changed(this.drawIfFast),
      this.phi3slider.changed(this.drawIfFast),
      this.phi4slider.changed(this.drawIfFast),
      this.phi5slider.changed(this.drawIfFast),
      this.phi6slider.changed(this.drawIfFast),
      createSpan('zoom').position(a, (e += 50)),
      (this.subdivControl = createSlider(
        MIN_ZOOM_LEVEL,
        MAX_ZOOM_LEVEL,
        zoomLevel,
      )),
      this.subdivControl.position(a, (e += 30)),
      this.subdivControl.changed((e) => {
        console.log(e.target.value);
      }),
      (this.recalcButton = createButton('Recalculate')),
      this.recalcButton.attribute('enabled', 'true'),
      this.recalcButton.position(a, (e += 30)),
      this.recalcButton.mousePressed(this.recalc.bind(this)),
      (this.drawLines = createCheckbox('Draw lines', !1)),
      this.drawLines.changed(this.drawIfFast),
      this.drawLines.position(a, (e += 30)),
      (this.zoomLevel = int(this.subdivControl.value())),
      (this.alphaControl = createSlider(0, 100, ALPHA)),
      this.alphaControl.position(a, (e += 30)),
      this.alphaControl.changed(this.drawIfFast),
      (this.impControl = createSlider(
        1387,
        1618,
        1e3 * imperfection,
        25,
      )),
      this.impControl.position(a, (e += 30)),
      this.impControl.changed(() => {
        (this.imperfection = this.impControl.value() / 1e3),
          console.log(imperfection),
          this.recalc();
      }),
      this.init(this.zoomLevel);
  };
  drawGrid() {
    stroke('#cacaca96'), strokeWeight(1), fill(120);
    for (var e = 0; e <= this.canvasSize; e += 50)
      line(e, 0, e, this.canvasSize), text(e, e + 1, 12);
    for (var a = 0; a <= this.canvasSize; a += 50)
      line(0, a, this.canvasSize, a), text(a, 1, a + 12);
  }
  drawSegments(e) {
    this.stroke ||
      curveVertex(
        (this.canvasSize * (e.seg1.re + 1)) / 2,
        (this.canvasSize * (e.seg1.im + 1)) / 2,
      ),
      [...Array(3).keys()].map((a) => {
        curveVertex(
          (this.canvasSize * (e[`seg${a + 1}`].re + 1)) / 2,
          (this.canvasSize * (e[`seg${a + 1}`].im + 1)) / 2,
        );
      }),
      this.stroke &&
        curveVertex(
          (this.canvasSize * (e.seg3.re + 1)) / 2,
          (this.canvasSize * (e.seg3.im + 1)) / 2,
        );
  }
  drawShape(e, a) {
    if (e.type) {
      let e;
      (e =
        1 === this.colorCount
          ? this.withColors.getContrastColor(a)
          : this.withColors.getRandomColor(stroke ? a : 2)),
        fill(e);
    } else {
      let e;
      strokeWeight(this.stroke ? 0.1 : 0),
        1 === this.colorCount
          ? ((e = this.withColors.getContrastColor(a)),
            console.log('alpha', a))
          : (e = this.withColors.getRandomColor(a)),
        this.stroke && stroke(e),
        !this.stroke && fill(e);
    }
    beginShape(), this.drawSegments(e), endShape();
  }
  draw = function () {
    let e = 0;
    background(this.backgroundColor),
      noLoop(),
      (e += 1),
      (this.p1 = map(
        this.phi1slider.value(),
        0,
        SLIDER_RESOLUTION,
        -this.short,
        this.short,
      )),
      (this.p2 = map(
        this.phi2slider.value(),
        0,
        SLIDER_RESOLUTION,
        -this.short,
        this.short,
      )),
      (this.p3 = map(
        this.phi3slider.value(),
        0,
        SLIDER_RESOLUTION,
        -this.short,
        this.short,
      )),
      (this.p4 = map(
        this.phi4slider.value(),
        0,
        SLIDER_RESOLUTION,
        -this.short,
        this.short,
      )),
      (this.p5 = map(
        this.phi5slider.value(),
        0,
        SLIDER_RESOLUTION,
        -this.short,
        this.short,
      )),
      (this.p6 = map(
        this.phi6slider.value(),
        0,
        SLIDER_RESOLUTION,
        -this.short,
        this.short,
      )),
      (alpha = this.alphaControl.value()),
      this.deformByParameters(
        this.p1,
        this.p2,
        this.p3,
        this.p4,
        this.p5,
        this.p6,
      ),
      strokeWeight(this.drawLines.checked() ? 0.1 : 0),
      1 >= this.shapes.length &&
        (noLoop(), console.log(this.shapes.length)),
      this.shapes.map((e) => {
        this.drawShape(e, alpha);
      });

    console.info(
      tokenData.tokenId +
        ',' +
        tokenData.projectId +
        ',' +
        tokenData.network +
        ',' +
        document
          .getElementsByTagName('canvas')[0]
          .toDataURL('image/png'),
    );
  };
}
disableFriendlyErrors = !0;
const animate = !1;
let features = [],
  seed = parseInt(tokenData.hash.slice(50, 66), 16);
const Rand = new Random(seed);
let debug = new Debug(),
  colorCount,
  paletteId,
  colorOption = Rand.int(0, 1);
(colorOption = 0),
  colorOption || (paletteId = Rand.int(0, palettes.length - 1)),
  (colorCount = (c = Rand.int(1, 20)) > 4 ? c : 1);
const colorScheme = COLOR_SCHEMES[colorOption];
debug.param('Color scheme', colorScheme + ' - ' + paletteId);
let withColors = WithColors(colorOption, colorCount, paletteId),
  stroke = (shouldStroke = Rand.int(0, 10)) >= 8;
const MIN_ZOOM_LEVEL = 3,
  MAX_ZOOM_LEVEL = 5,
  SLIDER_RESOLUTION = 4,
  FRAME_COUNT = 600,
  MIN_ALPHA = 30,
  MAX_ALPHA = 30,
  ALPHA = 75;
let zoomLevel = Rand.int(MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL);
const p1Val = Rand.int(0, SLIDER_RESOLUTION + 1),
  p2Val = Rand.int(0, SLIDER_RESOLUTION + 1),
  p3Val = Rand.int(0, SLIDER_RESOLUTION + 1),
  p4Val = Rand.int(2, SLIDER_RESOLUTION + 1),
  p5Val = Rand.int(0, SLIDER_RESOLUTION + 1),
  p6Val = Rand.int(0, SLIDER_RESOLUTION + 1);
p4Val >= 3 && p3Val <= 1 && 3 === zoomLevel && (stroke = !0);
let imperfection = Rand.int(1387, 1600) / 1e3,
  h = Rand.int(0, 359),
  s = Rand.int(60, 100),
  l = Rand.int(90, 100);
const backgroundColor = withColors.getBackgroundColor(h, s, l);
let patterns;
function setup() {
  (patterns = new Patterns(
    withColors,
    imperfection,
    backgroundColor,
    zoomLevel,
    stroke,
    p1Val,
    p2Val,
    p3Val,
    p4Val,
    p5Val,
    p6Val,
    colorCount,
  )),
    patterns.setup();
}
function draw() {
  patterns.draw();
}
(features[FEATURE_DEFORM_1] = p1Val),
  (features[FEATURE_DEFORM_2] = p2Val),
  (features[FEATURE_DEFORM_3] = p3Val),
  (features[FEATURE_DEFORM_4] = p4Val),
  (features[FEATURE_DEFORM_5] = p5Val),
  (features[FEATURE_DEFORM_6] = p6Val),
  (features[FEATURE_DETAIL_LEVEL] = zoomLevel),
  (features[FEATURE_COLOR_SCHEME] = colorScheme),
  (features[FEATURE_STROKE] = stroke),
  (features[FEATURE_MONO_COLOR] = 1 === colorCount),
  (features[FEATURE_IMPERFECTION] = imperfection),
  colorOption
    ? (features[FEATURES_COLOR_COUNT] = colorCount)
    : (features[FEATURE_PALETTE] = PALETTE_NAMES[paletteId]),
  console.log(features),
  (window.features = features),
  debug.hash(tokenData.hash),
  debug.imperfection(imperfection),
  debug.params(
    `${p1Val} - ${p2Val} - ${p3Val} - ${p4Val} - ${p5Val} - ${p6Val}`,
  ),
  debug.zoom(zoomLevel),
  debug.stroke(stroke),
  colorCount && debug.colors(colorCount);
