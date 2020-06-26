uniform sampler2D texture;
uniform vec2 texOffset;

uniform bool horizontal;

in vec4 vertTexCoord;

out vec4 fragColor;


void main()
{
    vec3 outColor;
    if (horizontal) {
        outColor = (
              texture(texture, vertTexCoord.st + vec2( 1, -1)*texOffset).rgb
            + texture(texture, vertTexCoord.st + vec2( 1,  0)*texOffset).rgb * 2.
            + texture(texture, vertTexCoord.st + vec2( 1,  1)*texOffset).rgb
            - texture(texture, vertTexCoord.st + vec2(-1, -1)*texOffset).rgb
            - texture(texture, vertTexCoord.st + vec2(-1,  0)*texOffset).rgb * 2.
            - texture(texture, vertTexCoord.st + vec2(-1,  1)*texOffset).rgb
        ) / 4.;
    } else {
        outColor = (
              texture(texture, vertTexCoord.st + vec2(-1,  1)*texOffset).rgb
            + texture(texture, vertTexCoord.st + vec2( 0,  1)*texOffset).rgb * 2.
            + texture(texture, vertTexCoord.st + vec2( 1,  1)*texOffset).rgb
            - texture(texture, vertTexCoord.st + vec2(-1, -1)*texOffset).rgb
            - texture(texture, vertTexCoord.st + vec2( 0, -1)*texOffset).rgb * 2.
            - texture(texture, vertTexCoord.st + vec2( 1, -1)*texOffset).rgb
        ) / 4.;
    }
    outColor += 0.5;
    fragColor = vec4(outColor, 1.);
}
