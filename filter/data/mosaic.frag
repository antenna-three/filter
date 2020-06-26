uniform sampler2D texture;
uniform vec2 texOffset;

uniform int period;

in vec4 vertTexCoord;

out vec4 fragColor;

void main()
{
    vec2 topLeftCoord = floor(vertTexCoord.st / texOffset / float(period)) * texOffset * float(period);
    vec4 texColor;
    for (int i = 0; i < period; i++) {
        for (int j = 0; j < period; j++) {
            texColor += texture(texture, topLeftCoord + vec2(i, j) * texOffset);
        }
    }
    fragColor = texColor / float(period * period);
}
