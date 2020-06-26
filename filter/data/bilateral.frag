uniform sampler2D texture;
uniform vec2 texOffset;

const int radius = 8;
uniform float weight[radius];
uniform bool linear;
uniform float sigma;

in vec4 vertTexCoord;

out vec4 fragColor;

vec4 rev_gamma(vec4 srgb)
{
    return mix(srgb / 12.92, pow((srgb + 0.055) / 1.055, vec4(2.4)), step(0.04045, srgb));
}

vec4 gamma(vec4 rgb)
{
    return mix(rgb * 12.92, pow(rgb, vec4(1. / 2.4)) * 1.055 - 0.055, step(0.0031308, rgb));
}

vec4 textureLinear(sampler2D sampler, vec2 coord)
{
    vec4 texColor = texture(sampler, coord);
    if (linear) texColor = rev_gamma(texColor);
    return texColor;
}

void main()
{
    vec3 centerColor = textureLinear(texture, vertTexCoord.st).rgb;
    vec3 numerator = vec3(0.);
    vec3 denominator = vec3(0.);
    for (int i = -radius + 1; i < radius; i++) {
        for (int j = -radius + 1; j < radius; j++) {
            vec2 offset = vec2(i, j);
            vec3 texColor = textureLinear(texture, vertTexCoord.st + offset * texOffset).rgb;
            float spaceWeight = weight[abs(i)] * weight[abs(j)];
            vec3 colorDifference = texColor - centerColor;
            vec3 colorWeight = exp(-colorDifference * colorDifference / (2. * sigma * sigma));
            vec3 weight = spaceWeight * colorWeight;
            numerator += weight * texColor;
            denominator += weight;
        }
    }
    vec3 destColor = numerator / denominator;
    fragColor = vec4(destColor, 1.);
    if (linear) fragColor = gamma(fragColor);
}
