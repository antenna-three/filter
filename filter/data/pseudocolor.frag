uniform sampler2D texture;

in vec4 vertTexCoord;

out vec4 fragColor;

vec3 pseudocolor(vec3 color)
{
    vec3 color4 = color * 4.;
    float r = clamp(color4.r - 2., 0., 1.);
    float g = min(1., min(color4.g, 4. - color4.g));
    float b = clamp(2. - color4.b, 0., 1.);
    return vec3(r, g, b);
}

void main()
{
    vec4 texColor = texture(texture, vertTexCoord.st);
    fragColor = vec4(pseudocolor(texColor.rgb), 1.);
}
