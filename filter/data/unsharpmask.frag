uniform sampler2D texture;

uniform sampler2D blurred;
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

void main()
{
    vec3 texColor = texture(texture, vertTexCoord.st).rgb;
    if (linear) texColor = rev_gamma(texColor);
    vec3 blurredColor = texture(blurred, vertTexCoord.st).rgb;
    if (linear) blurredColor = rev_gamma(blurredColor);
    vec3 outColor = texColor * (1. + sharpness) - blurredColor * sharpness;
    if (linear) outColor = gamma(outColor);
    fragColor = vec4(outColor, 1.);
}
