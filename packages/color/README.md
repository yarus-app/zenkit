# [ZenKit](https://github.com/yarus-app/zenkit) / [Color](https://github.com/yarus-app/zenkit/tree/main/packages/color)

### spin

Changes the hue of the color. Hue is a number between 0 to 360. The first
argument for adjustHue is the amount of degrees the color is rotated around
the color wheel, always producing a positive hue value.

```ts
adjustHue(color: Color, degree: (number | string) = 0): string
```

#### Example

```js
// Styles as object usage
const styles = {
  background: spin({ hue: , saturation:, lightness: 1}, 180).toString(),
  background: spin({ hue: , saturation:, lightness: 1, alphs}, 180).toString(),
}

// styled-components usage
const div = styled.div`
  background: ${spin({ hue: , saturation:, lightness: 1}, 180)};
  background: ${spin({ hue: , saturation:, lightness: 1, alphs}, 180))};
`

// CSS in JS Output
element {
  background: "#888844";
  background: "rgba(136,136,68,0.7)";
}
```

### complement

Returns the complement of the provided color. This is identical to spin(color, 180).

```ts
complement(color: Color): Color
```

#### Example

```js
// Styles as object usage
const styles = {
  background: complement({ hue: , saturation:, lightness: 1}).toString(),
  background: complement({ hue: , saturation:, lightness: 1, alphs}).toString(),
}

// styled-components usage
const div = styled.div`
  background: ${complement({ hue: , saturation:, lightness: 1})};
  background: ${complement({ hue: , saturation:, lightness: 1, alphs}))};
`

// CSS in JS Output
element {
  background: "#888844";
  background: "rgba(136,136,68,0.7)";
}
```

### darken

Returns the complement of the provided color. This is identical to spin(color, 180).

```ts
complement(color: Color): Color
```

#### Example

```js
// Styles as object usage
const styles = {
  background: complement({ hue: , saturation:, lightness: 1}).toString(),
  background: complement({ hue: , saturation:, lightness: 1, alphs}).toString(),
}

// styled-components usage
const div = styled.div`
  background: ${complement({ hue: , saturation:, lightness: 1})};
  background: ${complement({ hue: , saturation:, lightness: 1, alphs}))};
`

// CSS in JS Output
element {
  background: "#888844";
  background: "rgba(136,136,68,0.7)";
}
```

---

Made with ❤️ by [Yaroslav Usenko](https://github.com/yar-usenko).

It is free software, and may be redistributed under the `MIT License` detailed in the [LICENSE.md](https://github.com/yarus-app/zenkit/blob/main/LICENSE.md) file.
