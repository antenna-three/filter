precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;

in vec4 vertTexCoord;

out vec4 fragColor;


void main()
{
    vec3 horizontal = (
              texture(texture, vertTexCoord.st + vec2( 1, -1)*texOffset).rgb
            + texture(texture, vertTexCoord.st + vec2( 1,  0)*texOffset).rgb * 2.
            + texture(texture, vertTexCoord.st + vec2( 1,  1)*texOffset).rgb
            - texture(texture, vertTexCoord.st + vec2(-1, -1)*texOffset).rgb
            - texture(texture, vertTexCoord.st + vec2(-1,  0)*texOffset).rgb * 2.
            - texture(texture, vertTexCoord.st + vec2(-1,  1)*texOffset).rgb
    ) / 4.;
    vec3 vertical = (
              texture(texture, vertTexCoord.st + vec2( -1, 1)*texOffset).rgb
            + texture(texture, vertTexCoord.st + vec2( 0,  1)*texOffset).rgb * 2.
            + texture(texture, vertTexCoord.st + vec2( 1,  1)*texOffset).rgb
            - texture(texture, vertTexCoord.st + vec2(-1, -1)*texOffset).rgb
            - texture(texture, vertTexCoord.st + vec2(0,  -1)*texOffset).rgb * 2.
            - texture(texture, vertTexCoord.st + vec2(1,  -1)*texOffset).rgb
    ) / 4.;
    vec3 gradient = sqrt(horizontal*horizontal/2. + vertical*vertical/2.);
    fragColor = vec4(vec3(gradient * 2.), 1.);
}
