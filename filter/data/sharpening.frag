precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;

uniform bool linear;
uniform float sharpness;

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
    vec3 outColor = textureLinear(texture, vertTexCoord.st) * (1. + sharpness);
    const float inv9 = 1. / 9.;
    for (int i = -1; i < 2; i++) {
        for (int j = -1; j < 2; j++) {
            outColor += textureLinear(texture, vertTexCoord.st + vec2(i,  j)*texOffset) * (-sharpness * inv9);
        }
    }
    if (linear) outColor = gamma(outColor);
    fragColor = vec4(outColor, 1.);
}
