uniform sampler2D texture;

uniform bool linear;

in vec4 vertTexCoord;

out vec4 fragColor;

vec3 rev_gamma(vec3 srgb)
{
    return mix(srgb / 12.92, pow((srgb + 0.055) / 1.055, vec3(2.4)), step(0.04045, srgb));
}

float gamma(float y)
{
    return mix(y * 12.92, pow(y, 1. / 2.4) * 1.055 - 0.055, step(0.0031308, y));
}

void main()
{
    vec4 texColor = texture(texture, vertTexCoord.st);
    float v;
    if (linear) {
        vec3 weight = vec3(0.2126, 0.7152, 0.0722);
        v = gamma(dot(weight, rev_gamma(texColor.rgb)));
    } else {
        vec3 weight = vec3(0.299, 0.587, 0.114);
        v = dot(weight, texColor.rgb);
    }
    fragColor = vec4(v, v, v, 1.);
}
