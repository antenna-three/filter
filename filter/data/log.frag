uniform sampler2D texture;
uniform vec2 texOffset;

const int radius = 8;
const int len = radius * (radius + 1) / 2;
uniform float weight[len];

in vec4 vertTexCoord;

out vec4 fragColor;

void main()
{
    vec3 outColor = vec3(0.);
    for (int x = -radius + 1; x < radius; x++) {
        for (int y = -radius + 1; y < radius; y++) {
            vec2 offset = vec2(x, y);
            vec3 texColor = texture(texture, vertTexCoord.st + offset * texOffset).rgb;
            int ax = abs(x);
            int ay = abs(y);
            int l = max(ax, ay);
            int s = min(ax, ay);
            outColor += texColor * weight[l * (l + 1) / 2 + s];
        }
    }
    outColor += 0.5;
    fragColor = vec4(outColor, 1.);
}
