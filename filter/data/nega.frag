uniform sampler2D texture;

uniform bool linear;

in vec4 vertTexCoord;

out vec4 fragColor;

vec3 rev_gamma(vec3 srgb)
{
    return mix(srgb / 12.92, pow((srgb + 0.055) / 1.055, vec3(2.4)), step(0.04045, srgb));
}

vec3 gamma(vec3 rgb)
{
    return mix(rgb * 12.92, pow(rgb, vec3(1 / 2.4)) * 1.055 - 0.055, step(0.0031308, rgb));
}

void main()
{
    vec4 texColor = texture(texture, vertTexCoord.st);
    if (linear) {
        fragColor = vec4(gamma(1 - rev_gamma(texColor.rgb)), 1);
    } else {
        fragColor = vec4(vec3(1 - texColor.rgb), 1);
    }
}
