uniform sampler2D texture;
uniform vec2 texOffset;

const int radius = 8;
uniform float weight[radius];
uniform bool linear;
uniform bool horizontal;

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

void main()
{
    vec3 destColor = vec3(0.);
    for (int i = -radius + 1; i < radius; i++) {
        vec2 offset = horizontal ? vec2(i, 0) : vec2(0, i);
        vec3 texColor = texture(texture, vertTexCoord.st + offset * texOffset).rgb;
        if (linear) texColor = rev_gamma(texColor);
        destColor += texColor * weight[abs(i)];
    }
    if (linear) destColor = gamma(destColor);
    fragColor = vec4(destColor, 1.);
}
