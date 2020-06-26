uniform sampler2D texture;
uniform vec2 texOffset;

uniform bool isNeighborhood4;

in vec4 vertTexCoord;

out vec4 fragColor;

const vec3 positiveColor = vec3(1, 0.3, 0.3);
const vec3 negativeColor = vec3(0, 0.3, 0.5);


void main()
{
    vec3 laplacian = vec3(0.);
    if (isNeighborhood4) {
        laplacian = (
                  texture(texture, vertTexCoord.st + vec2(-1,  0)*texOffset).rgb
                + texture(texture, vertTexCoord.st + vec2( 0, -1)*texOffset).rgb
                + texture(texture, vertTexCoord.st + vec2( 0,  0)*texOffset).rgb * -4.
                + texture(texture, vertTexCoord.st + vec2( 0,  1)*texOffset).rgb
                + texture(texture, vertTexCoord.st + vec2( 1,  0)*texOffset).rgb
        );
    } else {
        for (int i = -1; i < 2; i++) {
            for (int j = -1; j < 2; j++) {
                laplacian += texture(texture, vertTexCoord.st + vec2(i,  j)*texOffset).rgb;
            }
        }
        laplacian -= texture(texture, vertTexCoord.st).rgb * 9.;
    }
    fragColor = vec4(laplacian + 0.5, 1.);
}
