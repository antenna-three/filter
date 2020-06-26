uniform sampler2D texture;
uniform float freq;

in vec4 vertTexCoord;

out vec4 fragColor;

const float TWO_PI = 6.2831855;

void main()
{
    vec3 texColor = texture(texture, vertTexCoord.st).rgb;
    vec3 solarized = 1. - abs(fract(freq * texColor) * 2. - 1.);
    fragColor = vec4(solarized, 1.);
}
