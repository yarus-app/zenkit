import guard from './utils/guard';
import ColorError from './utils/error';
import parseToHsl from './parse/to-hsl';
import renderHsl from './render/hsl';
import renderRgb from './render/rgb';
import convertHslToRgb from './convert/hsl-to-rgb';
import convertRgbToHsl from './convert/rgb-to-hsl';

class Color {
  constructor(color) {
    if (color instanceof Color) {
      return color;
    }

    if (typeof color !== 'string') {
      throw new ColorError('Color must be string');
    }

    const { hue, saturation, lightness, alpha } = parseToHsl(color);

    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.alpha = alpha;
  }

  /**
   * Returns a number (float) representing the luminance of a color.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#CCCD64').luminance >= new Color('#00f').luminance ? '#CCCD64' : '#00f'};
   *   background: ${new Color('rgba(58, 133, 255, 1)').luminance >= new Color('#rgba(255, 57, 149, 1)').luminance ?
   *                             'rgba(58, 133, 255, 1)' :
   *                             'rgba(255, 57, 149, 1)'};
   *
   * // CSS in JS Output
   *
   * div {
   *   background: "#CCCD64";
   *   background: "rgba(58, 133, 255, 1)";
   * }
   */
  get luminance() {
    const rgbColor = convertHslToRgb(this.hue, this.saturation, this.lightness);
    const [r, g, b] = ['red', 'green', 'blue'].map((key) => {
      return rgbColor[key] <= 0.03928
        ? rgbColor[key] / 12.92
        : ((rgbColor[key] + 0.055) / 1.055) ** 2.4;
    });
    return Number.parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(4));
  }

  /**
   * Returns the contrast ratio between two colors based on
   * [W3's recommended equation for calculating contrast](http://www.w3.org/TR/WCAG20/#contrast-ratiodef).
   *
   * @example
   * const contrastRatio = Color.contrast('#444', '#fff');
   */
  static contrast(firstColor, secondColor) {
    const firstLuminance = new Color(firstColor).luminance;
    const secondLuminance = new Color(secondColor).luminance;
    return Number.parseFloat(
      (firstLuminance > secondLuminance
        ? (firstLuminance + 0.05) / (secondLuminance + 0.05)
        : (secondLuminance + 0.05) / (firstLuminance + 0.05)
      ).toFixed(2)
    );
  }

  /**
   * Changes the hue of the color. Hue is a number between 0 to 360. The first
   * argument for adjustHue is the amount of degrees the color is rotated around
   * the color wheel, always producing a positive hue value.
   *
   * @example
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#448').adjustHue(180)};
   *   background: ${new Color('rgba(101,100,205,0.7)').adjustHue(180)};
   * `
   *
   * // CSS in JS Output
   * element {
   *   background: "#884";
   *   background: "rgba(136,136,68,0.7)";
   * }
   */
  adjustHue(degree) {
    this.hue = Number.parseFloat(
      ((this.hue + Number.parseFloat(degree)) % 360).toFixed(3)
    );
    return this;
  }

  /**
   * Returns the complement of the provided color. This is identical to new Color(<color>).adjustHue(180).
   *
   * @example
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#448').complement('#448')};
   *   background: ${new Color('#448').complement('rgba(204,205,100,0.7)')};
   * `
   *
   * // CSS in JS Output
   * element {
   *   background: "#884";
   *   background: "rgba(153,153,153,0.7)";
   * }
   */
  complement() {
    this.adjustHue(180);
    return this;
  }

  /**
   * Returns a string value for the lightened color.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#FFCD64').lighten(0.2)};
   *   background: ${new Color('rgba(204,205,100,0.7)').lighten('0.2')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#e5e6b1";
   *   background: "rgba(229,230,177,0.7)";
   * }
   */
  lighten(amount = 0.1) {
    this.lightness = guard(
      0,
      1,
      Number.parseFloat((this.lightness + Number.parseFloat(amount)).toFixed(3))
    );
    return this;
  }

  /**
   * Returns a string value for the darkened color.
   *
   * @example
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#FFCD64').darken(0.2)};
   *   background: ${new Color('#FFCD64').darken('0.2')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#ffbd31";
   *   background: "rgba(255,189,49,0.7)";
   * }
   */
  darken(amount = 0.1) {
    this.lightness = guard(
      0,
      1,
      Number.parseFloat((this.lightness - Number.parseFloat(amount)).toFixed(3))
    );
    return this;
  }

  /**
   * Increases the intensity of a color. Its range is between 0 to 1. The first
   * argument of the saturate function is the amount by how much the color
   * intensity should be increased.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#FFCD64').saturate(0.2)};
   *   background: ${new Color('rgba(204,205,100,0.7)').saturate('0.2')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#e0e250";
   *   background: "rgba(224,226,80,0.7)";
   * }
   */
  saturate(amount = 0.1) {
    this.saturation = guard(
      0,
      1,
      Number.parseFloat(
        (this.saturation + Number.parseFloat(amount)).toFixed(3)
      )
    );
    return this;
  }

  /**
   * Decreases the intensity of a color. Its range is between 0 to 1. The first
   * argument of the desaturate function is the amount by how much the color
   * intensity should be decreased.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#CCCD64').desaturate(0.2)};
   *   background: ${new Color('rgba(204,205,100,0.7)').desaturate('0.2')};
   * `
   *
   * // CSS in JS Output
   * element {
   *   background: "#b8b979";
   *   background: "rgba(184,185,121,0.7)";
   * }
   */
  desaturate(amount = 0.1) {
    this.saturation = guard(
      0,
      1,
      Number.parseFloat(
        (this.saturation - Number.parseFloat(amount)).toFixed(3)
      )
    );
    return this;
  }

  /**
   * Increases the opacity of a color. Its range for the amount is between 0 to 1.
   *
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('rgba(255, 255, 255, 0.9)').opacify(0.1)};
   *   background: ${new Color('hsla(0, 0%, 100%, 0.5)').opacify(0.2)},
   *   background: ${new Color('rgba(255, 0, 0, 0.2)').opacify('0.5')},
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#fff";
   *   background: "rgba(255,255,255,0.7)";
   *   background: "rgba(255,0,0,0.7)";
   * }
   */
  opacify(amount = 0.1) {
    const alpha = typeof this.alpha === 'number' ? this.alpha : 1;

    this.alpha = guard(
      0,
      1,
      Number.parseFloat((alpha + Number.parseFloat(amount)).toFixed(3))
    );
    return this;
  }

  /**
   * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
   *
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: transparentize(0.1, '#fff');
   *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
   *   background: transparentize('0.5', 'rgba(255, 0, 0, 0.8)'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#fff').transparentize(0.1)};
   *   background: ${new Color('hsl(0, 0%, 100%)').transparentize(0.2)},
   *   background: ${new Color('rgba(255, 0, 0, 0.8)').transparentize('0.5')},
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "rgba(255,255,255,0.9)";
   *   background: "rgba(255,255,255,0.8)";
   *   background: "rgba(255,0,0,0.3)";
   * }
   */
  transparentize(amount = 0.1) {
    const alpha = typeof this.alpha === 'number' ? this.alpha : 1;

    this.alpha = guard(
      0,
      1,
      Number.parseFloat((alpha - Number.parseFloat(amount)).toFixed(3))
    );
    return this;
  }

  /**
   * Converts the color to a grayscale, by reducing its saturation to 0.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#CCCD64').grayscale()};
   *   background: ${new Color('rgba(204,205,100,0.7)').grayscale()};
   * `
   *
   * // CSS in JS Output
   * element {
   *   background: "#999";
   *   background: "rgba(153,153,153,0.7)";
   * }
   */
  grayscale() {
    this.saturation = 0;
    return this;
  }

  /**
   * Inverts the red, green and blue values of a color.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#CCCD64').invert()};
   *   background: ${new Color('rgba(101,100,205,0.7)').invert()};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#33329b";
   *   background: "rgba(154,155,50,0.7)";
   * }
   */
  invert() {
    const { red, green, blue } = convertHslToRgb(
      this.hue,
      this.saturation,
      this.lightness
    );

    const { hue, saturation, lightness } = convertRgbToHsl({
      red: guard(0, 1, 1 - Number.parseFloat(red.toFixed(3))),
      green: guard(0, 1, 1 - Number.parseFloat(green)),
      blue: guard(0, 1, 1 - Number.parseFloat(blue)),
    });

    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;

    return this;
  }

  /**
   * Mixes the two provided colors together by calculating the average of each of the RGB components weighted to the first color by the provided weight.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${Color.mix(0.5, '#f00', '#00f')};
   *   background: ${Color.mix(0.25, '#f00', '#00f')};
   *   background: ${Color.mix('0.5', 'rgba(255, 0, 0, 0.5)', '#00f')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#7f007f";
   *   background: "#3f00bf";
   *   background: "rgba(63, 0, 191, 0.75)";
   * }
   */
  static mix(amount = 0.5, first, second) {
    const firstColor = new Color(first);
    const secondColor = new Color(second);

    const weight = guard(0, 1, Number.parseFloat(amount.toFixed(3)));

    if (weight === 0) return firstColor;
    if (weight === 1) return secondColor;

    const {
      red: firstRed,
      green: firstGreen,
      blue: firstBlue,
      alpha: preFirstAlpha,
    } = convertHslToRgb(firstColor.toJSON());

    const firstAlpha = typeof preFirstAlpha === 'number' ? preFirstAlpha : 1;

    const {
      red: secondRed,
      green: secondGreen,
      blue: secondBlue,
      alpha: preSecondAlpha,
    } = convertHslToRgb(secondColor.toJSON());

    const secondAlpha = typeof preSecondAlpha === 'number' ? preSecondAlpha : 1;

    const deltaAlpha = firstAlpha - secondAlpha;
    const x = weight * 2 - 1;
    const y = x * deltaAlpha === -1 ? x : x + deltaAlpha;
    const z = 1 + x * deltaAlpha;
    const firstWeight = Number.parseFloat((y / z + 1) / 2);
    const secondWeight = 1 - firstWeight;

    const mixed = renderRgb(
      Number.parseFloat(
        (firstRed * firstWeight + secondRed * secondWeight).toFixed(3)
      ),
      Number.parseFloat(
        (firstGreen * firstWeight + secondGreen * secondWeight).toFixed(3)
      ),
      Number.parseFloat(
        (firstBlue * firstWeight + secondBlue * secondWeight).toFixed(3)
      ),
      Number.parseFloat(
        (firstAlpha * weight + secondAlpha * (1 - weight)).toFixed(3)
      )
    );

    return new Color(mixed);
  }

  /**
   * Tints a color by mixing it with white. `tint` can produce
   * hue shifts, where as `lighten` manipulates the luminance channel and therefore
   * doesn't produce hue shifts.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#00f').tint(0.25)};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#bfbfff";
   * }
   */
  tint(weight = 0.1) {
    return Color.mix(weight, '#ffffff', this);
  }

  /**
   * Shades a color by mixing it with black. `shade` can produce
   * hue shifts, where as `darken` manipulates the luminance channel and therefore
   * doesn't produce hue shifts.
   *
   * @example
   * // styled-components usage
   * const div = styled.div`
   *   background: ${new Color('#00f').shade(0.25)};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#00003f";
   * }
   */
  shade(weight = 0.1) {
    return Color.mix(weight, '#000000', this);
  }

  toString() {
    return renderHsl(this.hue, this.saturation, this.lightness, this.alpha);
  }
}

export default Color;
