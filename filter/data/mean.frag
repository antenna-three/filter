uniform sampler2D texture;
uniform vec2 texOffset;

uniform int radius;
uniform bool linear;

in vec4 vertTexCoord;

out vec4 fragColor;

vec3 rev_gamma(vec3 srgb)
{
    return mix(srgb / 12.92, pow((srgb + 0.055) / 1.055, vec3(2.4)), step(0.04045, srgb));
}

vec3 gamma(vec3 rgb)
{
    return mix(rgb * 12.92, pow(rgb, vec3(1. / 2.4)) * 1.055 - 0.055, step(0.0031308, rgb));
}

vec3 textureLinear(sampler2D sampler, vec2 coord)
{
    vec3 texColor = texture(sampler, coord).rgb;
    if (linear) texColor = rev_gamma(texColor);
    return texColor;
}

void main()
{
    vec3 texColor;
    for (int i = -radius; i <= radius; i++) {
        for (int j = -radius; j <= radius; j++) {
            texColor += textureLinear(texture, vertTexCoord.st + vec2(i, j) * texOffset);
        }
    }
    float filterSize = 2. * radius + 1.;
    texColor /= filterSize * filterSize;
    if (linear) texColor = gamma(texColor);
    fragColor = vec4(texColor, 1);
}
