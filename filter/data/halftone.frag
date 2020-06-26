uniform sampler2D texture;
uniform vec2 texOffset;

uniform float period;

in vec4 vertTexCoord;

out vec4 fragColor;

const float TWO_PI = 6.2831855;

void main()
{
    vec2 v = vertTexCoord.st / texOffset / period;
    float f = (sin(v.x * TWO_PI) * 0.5 + 0.5) + (sin(v.y * TWO_PI) * 0.5 + 0.5);
    vec4 texColor = texture(texture, vertTexCoord.st);
    fragColor = vec4(texColor.rgb * (texColor.rgb * 0.5 + f), 1.);
}
