uniform sampler2D texture;
uniform vec2 texOffset;

in vec4 vertTexCoord;

out vec4 fragColor;

const vec3 positiveColor = vec3(1, 0.3, 0.3);
const vec3 negativeColor = vec3(0, 0.5, 0.5);


void main()
{
    vec3 texColor = texture(texture, vertTexCoord.st).rgb;
    float value = texColor.r + texColor.g + texColor.b - 1.5;
    float positive = max(0., value);
    float negative = -min(0., value);
    vec3 outColor = positive * positiveColor + negative * negativeColor;
    fragColor = vec4(outColor, 1.);
}
